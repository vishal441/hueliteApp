import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  BackHandler
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { ICON } from "../../ui/common/constants/ImageConstant";
import { FONT_SIZE, FONT_COLOR } from "../common/constants/StyleConstant";
import { Dropdown } from "react-native-material-dropdown";
import { connectToDevice } from "../../backGroundServices/Connector";
import {
  pairDeviceApi,
  saveWifiConfigApi
} from "../../backGroundServices/webApi/WebApi";
import {
  createNewDevice,
  parseStringToObject,
  isEmptyFields
} from "../../util/AppUtil";
import {
  insertDevices,
  getDeviceListFromDb
} from "../../database/table/DeviceTable";
import { connect } from "react-redux";
//import { deviceListAction } from "../../redux/actions/DeviceListAction"
import { InputField } from "../common/customComponents/InputField";
import { Loader } from "../common/customComponents/Loader";
import { reduxConstant } from "../../redux/ReduxConstant";
import { SOCKET_ERROR_TYPES } from "../common/constants/StringConstant";
import NetInfo from "@react-native-community/netinfo";
import { getAvailableDevice } from "../wifiSearch/WifiScanAndroid";
import { getWiFiList } from "../../backGroundServices/webApi/WebApi";

class PairingForm extends Component {
  socket = null;
  constructor(props) {
    super(props);
    let {
      currDeviceStatus: { MAC_ADD }
    } = this.props.navigation.getParam("otherParam", "default value");
    this.ws;
    this.state = {
      deviceName: "Device 1",
      password: "",
      cnfPass: "",
      wifiList: [],
      selectedWifi: "",
      rememberPass: false,
      deviceMAC: MAC_ADD,
      isDialogVisible: false,
      showBtn: false,
      message: "",
      anyEmptyFld: false,
      passwordMatched: true,
      socketConnected: false
    };
  }

  componentDidMount() {
    this.getWifiList();
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide
    );
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentDidUpdate() {}

  async componentWillUnmount() {
    this.setState({ isDialogVisible: false, showBtn: false, message: "" });
    this.keyboardDidHideListener.remove();
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  /*refreshWiFiList() {
        getAvailableDevice(cbRes => {
            let deviceList = cbRes,
                self = this
            if (cbRes == "false") {
                console.log("No Permission-----------------------")
                self.redirectToPage("EmptySerachScreen", [])
            } else {
                console.log("Refreshing Wifi List")
                hueDeviceList =
                    deviceList.length && deviceList.filter(item => !item.SSID.includes("HUE"))
                hueDeviceList.map(item => console.log(item.SSID))
                let wifiArray = []
                if (deviceList && deviceList.length) {
                    deviceList.forEach(item => {
                        let wifiName = {}
                        wifiName["value"] = item.SSID
                        wifiArray.push(wifiName)
                    })
                }
                this.setState({ wifiList: wifiArray })
            }
        })
    }*/

  refreshWiFiList = () => {
    statusInterval = setInterval(() => {
      getWiFiList(cbRes => {
        let wifiArray = [{ value: "Wait for a while" }];

        if (cbRes) {
          if (cbRes.Status > 0 && cbRes.Networks.length) {
            console.log(">><<" + cbRes.Status);
            wifiArray = [];
            cbRes.Networks.forEach((item, i) => {
              let wifiName = {};
              wifiName["value"] = item.ssid;
              wifiArray.push(wifiName);
            });
            clearInterval(statusInterval);
            this.setState({ wifiList: wifiArray });
            console.log(wifiArray);
          }
        }
      });
    }, 3000);
  };

  getWifiList = async () => {
    let {
      wifiList,
      selectedDevice: { SSID, BSSID }
    } = this.props.navigation.getParam("otherParam", "default value");
    wifiArray = [];
    if (wifiList && wifiList.length) {
      wifiList.forEach(item => {
        let wifiName = {};
        wifiName["value"] = item.SSID;
        wifiArray.push(wifiName);
      });
    }
    this.setState({
      wifiList: wifiArray
      ///TODO:selectedWifi: wifiArray[0].SSID
    });
    this.socket = await connectToDevice(
      "192.168.4.1",
      wsHandler => {
        console.log("FROM PAIRING" + wsHandler);
      },
      async (message, ws) => {
        this.ws = ws;
        let self = this;
        if (message.data) {
          console.log("from pairing form Socket Listner" + message.data);
          let { data = "" } = message;
          if (data.includes("Attempting CONN")) {
            !this.state.isDialogVisible &&
              this.setState({ isDialogVisible: true });
          } else {
            let { IP, resCode, wifiSSID } = parseStringToObject(message.data);
            if (IP && IP.length) {
              let saveWifiRes = await saveWifiConfigApi();
              if (saveWifiRes === "RES-551") {
                let newDevice = [
                  createNewDevice({
                    BSSID: BSSID.toUpperCase(),
                    SSID,
                    IP,
                    Mac: deviceMAC
                  })
                ];
                insertDevices(newDevice);
                let dbRes = await getDeviceListFromDb(),
                  newDeviceList = dbRes.data;
                if (newDeviceList.length) {
                  console.log("devicelist length::" + newDeviceList.length);
                  let newList = newDeviceList.map(item => {
                    if (item.IP_Address == IP) {
                      console.log("Updating WS resource");
                      item.Web_Socket = ws;
                    }
                    return item;
                  });
                  console.log("Sending WS Action");
                  this.props.deviceListAction(newList);
                  setTimeout(() => {
                    self.setState({
                      isDialogVisible: false,
                      showBtn: false,
                      message: ""
                    });
                    self.props.navigation.replace("Dashboard", {
                      otherParam: { SSID: wifiSSID }
                    });
                  }, 500);
                }
              } else {
                this.setState({
                  message: SOCKET_ERROR_TYPES["ERR-048"],
                  showBtn: true
                });
              }
            } else if (resCode && SOCKET_ERROR_TYPES.hasOwnProperty(resCode)) {
              this.setState({
                message: SOCKET_ERROR_TYPES[resCode],
                showBtn: true
              });
            }
          }
        }
      }
    );
  };

  checkEmptyFields = async () => {
    let { deviceName, password, cnfPass } = this.state,
      isEmpty = isEmptyFields(deviceName, password, cnfPass);
    this.setState({ anyEmptyFld: isEmpty });
  };

  backButton = () => {
    this.props.navigation.navigate("AddDevice");
  };

  selectWifiConn = (value, index) => {
    this.setState({ selectedWifi: value });
  };

  rememberPassword = () => {
    this.setState({ rememberPass: !this.state.rememberPass });
  };

  moveToNextScreen = async () => {
    await this.checkEmptyFields();
    let { selectedWifi, password, cnfPass, anyEmptyFld } = this.state,
      self = this;
    if (!anyEmptyFld && password === cnfPass) {
      this.setState({
        isDialogVisible: true,
        message: "Connecting...",
        showBtn: false
      });
      await pairDeviceApi(selectedWifi, password);
      setTimeout(() => {
        if (self.state.isDialogVisible) {
          this.setState({ showBtn: true, message: "Time out..!!" });
        }
      }, 20000);
    } else {
      this.setState({ passwordMatched: false });
    }
  };

  onSkip = async () => {
    let { deviceMAC, deviceName } = this.state,
      deviceArr = [],
      newDevice = createNewDevice({
        SSID: deviceName,
        Mac: deviceMAC,
        IP: "192.168.4.1"
      }),
      self = this;
    console.log("---" + deviceMAC);

    deviceArr.push(newDevice);
    insertDevices(deviceArr);
    let dbRes = await getDeviceListFromDb(),
      newDeviceList = dbRes.data;
    if (newDeviceList.length) {
      console.log("devicelist length::" + newDeviceList.length);
      let newList = newDeviceList.map(item => {
        if (item.IP_Address == newDevice.IP) {
          console.log("Updating WS resource");
          item.Web_Socket = ws;
        }
        return item;
      });
      console.log("Sending WS Action");
      this.props.deviceListAction(newList);
      setTimeout(() => {
        self.setState({
          isDialogVisible: false,
          showBtn: false,
          message: ""
        });
        self.props.navigation.replace("Dashboard");
      }, 500);
    }
  };

  onTextChange = (name, text) => {
    if (name === "password" || name === "cnfPass") {
      this.setState({ passwordMatched: true });
    }
    this.setState({ [name]: text });
  };

  onBtnPress = () => {
    this.setState({ isDialogVisible: false }, () => {
      //this.props.navigation.navigate('AddDevice');
    });
  };

  keyboardDidHide() {
    Keyboard.dismiss();
  }

  handleBackButton = () => {
    console.log("BACK button");
    if (this.state.isDialogVisible) {
      return true;
    } else return false;
  };

  render() {
    let {
      deviceName,
      wifiList,
      rememberPass,
      password,
      cnfPass,
      anyEmptyFld,
      passwordMatched
    } = this.state;
    return (
      <View>
        <LinearGradient
          colors={["#2d90e8", "#3aafda", "#8ac5eb"]}
          style={{ height: "30%" }}
        >
          <TouchableOpacity
            onPress={() => this.backButton()}
            style={{ width: 70 }}
          >
            <Image source={ICON.LEFT_ARROW} style={styles.backButton} />
          </TouchableOpacity>
          <View style={styles.headerImg}>
            <Image style={styles.image} source={ICON.BULB} />
          </View>
        </LinearGradient>
        <ScrollView style={{ height: "70%" }}>
          <View style={styles.form}>
            <InputField
              placeholder={deviceName}
              value={""}
              onChangeText={text => this.onTextChange("deviceName", text)}
            />
            {!deviceName.length ? (
              <Text style={{ color: "red" }}>Please enter device name</Text>
            ) : null}

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center"
              }}
            >
              <View style={{ width: "90%" }}>
                <Dropdown
                  label="Select Wi-fi Network"
                  labelFontSize={FONT_SIZE.FONT_16}
                  data={wifiList}
                  value={wifiList && wifiList.length ? wifiList[0].value : ""}
                  onChangeText={(value, index) =>
                    this.selectWifiConn(value, index)
                  }
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.refreshWiFiList();
                }}
                style={{ width: "10%", alignItems: "flex-end", paddingTop: 25 }}
              >
                <Image
                  source={ICON.SYNC}
                  style={{ height: 25, width: 25, opacity: 0.5 }}
                />
              </TouchableOpacity>
            </View>

            <InputField
              placeholder={"Password"}
              name={"password"}
              value={password}
              secureTextEntry={true}
              onChangeText={text => this.onTextChange("password", text)}
            />
            {anyEmptyFld && !password.length ? (
              <Text style={{ color: "red" }}>Please enter password</Text>
            ) : null}

            <InputField
              placeholder={"Confirm Password"}
              name={"cnfPass"}
              value={cnfPass}
              // secureTextEntry={true}
              onChangeText={text => this.onTextChange("cnfPass", text)}
            />
            {anyEmptyFld && !cnfPass.length ? (
              <Text style={{ color: "red" }}>
                Please enter confirm password
              </Text>
            ) : null}
            {!anyEmptyFld && !passwordMatched ? (
              <Text style={{ color: "red" }}>Password did not matched</Text>
            ) : null}

            <View style={styles.rememberPassView}>
              <TouchableOpacity onPress={() => this.rememberPassword()}>
                <View style={[styles.rememberPassButton]}>
                  {rememberPass ? (
                    <View
                      style={[styles.rememberPassButton, { borderWidth: 0 }]}
                    >
                      <Image
                        source={ICON.WHITE_CHECK}
                        style={{ height: 20, width: 20 }}
                      />
                    </View>
                  ) : (
                    <View
                      style={[
                        styles.rememberPassButton,
                        { backgroundColor: "#fff" }
                      ]}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <Text style={[styles.displayTxt, { paddingLeft: 15 }]}>
                Remember Password
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity onPress={this.onSkip}>
              <Text
                style={[styles.displayTxt, { fontSize: FONT_SIZE.FONT_16 }]}
              >
                Skip
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.moveToNextScreen}>
              <View style={[styles.nextButton]}>
                <Image
                  source={ICON.RIGHT_ARROW}
                  style={{ height: 25, width: 25 }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Loader
            isDialogVisile={this.state.isDialogVisible}
            showBtn={this.state.showBtn}
            message={this.state.message}
            onBtnPress={this.onBtnPress}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerImg: {
    height: "80%",
    justifyContent: "center",
    alignItems: "center"
  },
  backButton: {
    marginTop: 10,
    marginLeft: 10,
    height: 20,
    width: 30
  },
  image: {
    height: 60,
    width: 60
  },
  form: {
    margin: 10
  },
  textInputField: {
    marginTop: 10
    // backgroundColor:'red'
  },
  displayTxt: {
    fontSize: FONT_SIZE.FONT_16,
    fontWeight: "400",
    color: FONT_COLOR.GREY
  },
  inputTxt: {
    fontSize: FONT_SIZE.FONT_16,
    fontWeight: "400",
    color: FONT_COLOR.GREY,
    borderBottomWidth: 0.5,
    borderBottomColor: "grey"
    /// paddingTop: 5
  },
  rememberPassView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20
  },
  rememberPassButton: {
    height: 23,
    width: 23,
    borderWidth: 0.5,
    borderRadius: 20,
    backgroundColor: "#2d90e8",
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10
  },
  nextButton: {
    height: 40,
    width: 40,
    borderRadius: 25,
    backgroundColor: "#2d90e8",
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  return {
    deviceList: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deviceListAction: deviceList =>
      dispatch({ type: reduxConstant.DEVICE_LIST, deviceList: deviceList })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PairingForm);
