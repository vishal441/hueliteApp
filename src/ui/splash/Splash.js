import React, { Component } from "react";
import { View, StyleSheet, Image, Text, Platform } from "react-native";
import { ICON } from "../common/constants/ImageConstant";
import LinearGradient from "react-native-linear-gradient";
import { getDeviceListFromDb } from "../../database/table/DeviceTable";
import { getUserInfoFromDb } from "../../database/table/UserInfoTable";
import { connect } from "react-redux";
import { reduxConstant } from "../../redux/ReduxConstant";
import NetInfo from "./NetInfoListner";
import Zeroconf from "react-native-zeroconf";
import Icon from "react-native-vector-icons/Ionicons";

const zeroconf = new Zeroconf();

class Splash extends Component {
  constructor(props) {
    super(props);
    this.netInfo = null;
    this.state = {
      _mDNS: false
    };
  }

  async componentDidMount() {
    let debug = true;
    {
      debug && console.log("--------------*********-----------------");
    }
    let self = this;
    Icon.loadFont();
    if (!this.state._mDNS) {
      zeroconf.scan("http", "tcp", "local.");
      zeroconf.on("start", () => {
        //this.setState({ isScanning: true })
        {
          debug && console.log("zeroconf started...");
        }
      });
      zeroconf.on("stop", () => {
        //this.setState({ isScanning: false })
        {
          debug && console.log("zeroconf started");
        }
      });
      zeroconf.on("resolved", service => {
        {
          debug &&
            console.log("[zeroconf Resolve]", JSON.stringify(service, null, 2));
        }
      });
      zeroconf.on("error", err => {
        //this.setState({ isScanning: false })
        {
          debug && console.log("[zeroconf Error]", err);
        }
      });
    }
    this.setState({ _mDNS: true });

    //NOTE: -->insert dummy device data in DB
    ///insertDevices(deviceArr);

    //NOTE: -->delete device data from DB
    ///deleteDeviceTable();

    //insertUserInfo(userInfo)
    //deleteUserInfoTable()

    let dbRes = await getDeviceListFromDb(),
      deviceListing = dbRes.data;
    this.props.deviceListAction(deviceListing);

    let userRes = await getUserInfoFromDb();

    if (userRes) {
      {
        debug && console.log("name : ", userRes.User_Id);
      }
    } else {
      {
        debug && console.log("No userfound");
      }
    }
    //self.props.navigation.navigate("PairIos1")
    setTimeout(function() {
      ///self.props.navigation.replace("PairIos1")
      if (!userRes && !deviceListing.length)
        self.props.navigation.replace("Welcome");
      else if (deviceListing.length) self.props.navigation.replace("Dashboard");
      else {
        if (Platform.OS === "ios") {
          self.props.navigation.replace("PairIos1");
        } else {
          self.props.navigation.replace("WifiScreen");
        }
      }
    }, 1000);
  }

  componentDidUpdate() {}

  netFunction = info => {
    this.netInfo = info;
  };

  componentWillUnmount() {
    console.log("Splash Unmount");
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          style={styles.logoView}
          start={{ x: 0.5, y: 1.5 }}
          end={{ x: 1.5, y: 0.5 }}
          colors={["#aaa", "#fff"]}
        >
          <View>
            {Platform.OS === "android" && (
              <NetInfo onNetChange={this.netFunction} />
            )}
            <Image style={styles.image} source={ICON.LOGO} />
            <Text style={styles.text}>HUElite</Text>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column"
  },
  logoView: {
    flex: 1,
    justifyContent: "center"
  },
  content: {
    width: "100%",
    height: "30%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    alignSelf: "center"
  },
  text: {
    alignSelf: "center",
    color: "#aaa",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20
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

export default connect(mapStateToProps, mapDispatchToProps)(Splash);

// const mapStateToProps = (state) => {
//     return{
//         deviceList: state
//     }
// }
//
// export default withNavigationFocus(connect(mapStateToProps, {deviceListAction})(Splash));
