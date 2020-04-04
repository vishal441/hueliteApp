import React, { Component } from "react";
import { ICON } from "../../common/constants/ImageConstant";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { CustomeSlider } from "../colorPicker/Slider";
import EditDashboard from "./EditDashboard";
import { getSelectedGradientColors } from "../DashboardUtil";
import colorsys from "colorsys";
import { getCurrentTimeStamp } from "../../../util/DateTimeUtil";
import { updateDeviceList } from "../../../util/AppUtil";
import { insertDevices } from "../../../database/table/DeviceTable";

class Card extends Component {
  constructor(props) {
    super(props);
    this.colorUpdateTimestamp = getCurrentTimeStamp() - 300;
    this.state = {
      sliderVal: 0,
      ws: null,
      isShowEditDashoard: false
    };
  }

  getCardGradentColor = () => {
    let { device } = this.props;
    let { selectedColor1, gradColorArr } = getSelectedGradientColors(
      device.HSV
    );
    return gradColorArr;
  };

  onSlidingComplete_ = value => {
    let sliderValue = Math.round(value);
    this.setState({ sliderVal: sliderValue });
  };

  onSlidingComplete = value => {
    let debug = true;
    let { device } = this.props;
    let updateObj = [{ HSV: { h: device.HSV.h, s: device.HSV.s, v: value } }];

    updateObj["HSV"] = {
      h: device.HSV.h,
      s: device.HSV.s,
      v: value
    };
    {
      debug &&
        console.log(
          "===" +
            colorsys.hsv2Hex(updateObj.HSV.h, updateObj.HSV.s, updateObj.HSV.v)
        );
    }
    if (getCurrentTimeStamp() - this.colorUpdateTimestamp >= 200) {
      if (device.Web_Socket) {
        device.Web_Socket.send(
          colorsys.hsv2Hex(updateObj.HSV.h, updateObj.HSV.s, updateObj.HSV.v)
        );
        this.colorUpdateTimestamp = getCurrentTimeStamp();
        let newList = updateDeviceList(
          updateObj,
          device,
          this.props.deviceList
        );
        this.props.deviceListAction(newList);
        insertDevices(newList);
      }
    } else {
      console.log("Time gap not meet");
    }
  };

  openEditDahbsoard = () => {
    console.log("pressed");
    this.setState({ isShowEditDashoard: !this.state.isShowEditDashoard });
  };

  openColorPicker = () => {
    let { device, deviceList } = this.props;
    this.props.navigation.replace("ColorPickerContainer", {
      otherParam: { selectedDevice: device, deviceList: deviceList }
    });
  };

  componentDidMount() {}

  render() {
    let { isShowEditDashoard } = this.state,
      { deviceListAction, device, deviceList } = this.props,
      cardColor = this.getCardGradentColor();
    return (
      <View style={{ paddingVertical: 10 }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            this.openColorPicker();
          }}
        >
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={cardColor}
            style={[
              styles.cardContainer,
              { elevation: isShowEditDashoard ? 15 : 5 }
            ]}
          >
            <View style={styles.menuView}>
              <TouchableOpacity
                style={styles.menuIconContainer}
                onPress={() => this.openEditDahbsoard()}
              >
                <Image style={styles.menuIcon} source={ICON.HOR_MORE_INFO} />
              </TouchableOpacity>
            </View>
            <View style={[styles.cardBody, { borderWidth: 0 }]}>
              <TouchableOpacity
                onPress={() => {
                  console.log("onpress ON/OFF");
                }}
              >
                <Image style={styles.ON_OFF_icon} source={ICON.BULB} />
              </TouchableOpacity>
              <View style={{ justifyContent: "space-evenly" }}>
                <Text style={styles.textInput1}>{device.HSV.v + "%"}</Text>
                <Text style={styles.textInput2}>{device.SSID}</Text>
              </View>
            </View>
            <View style={{ borderWidth: 0, marginTop: 10 }}>
              <CustomeSlider
                value={device.HSV.v}
                customStyle={styles.sliderStyle}
                onSlidingComplete={this.onSlidingComplete}
                selectedColor={"#2d90e8"}
                gradColorArr={cardColor}
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>
        {isShowEditDashoard ? (
          <View style={{ paddingHorizontal: 7 }}>
            <EditDashboard
              selectedCard={device}
              deviceList={deviceList}
              deviceListAction={deviceListAction}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    justifyContent: "space-between"
  },

  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textInput1: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
    color: "#fff"
  },
  textInput2: {
    color: "#fff"
  },
  menuIcon: {
    alignItems: "flex-end",
    width: 25,
    height: 20
  },
  menuIconContainer: { padding: 5 },
  ON_OFF_icon: {
    height: 60,
    width: 60
  },
  menuView: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  sliderStyle: {
    marginHorizontal: 10,
    marginTop: 20
  }
});

export default Card;
