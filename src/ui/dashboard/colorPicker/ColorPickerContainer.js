import React, { Component } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import ColorChooser from "./ColorPicker";
import { ColorPickerHeader } from "./ColorPickerHeader";
import { CustomeSlider } from "./Slider";
import { ICON } from "../../common/constants/ImageConstant";
import LinearGradient from "react-native-linear-gradient";
import { getSelectedGradientColors, changeBrightness } from "../DashboardUtil";
import { changeColorBrigntess, hexToRgb } from "../colorPicker/ColorUtil";
import { connect } from "react-redux";
import { updateDeviceList } from "../../../util/AppUtil";
import { deviceListAction } from "../../../redux/actions/DeviceListAction";
import { insertDevices } from "../../../database/table/DeviceTable";
import DeviceNavigator from "./DeviceNavigator";
import { reduxConstant } from "../../../redux/ReduxConstant";
import ColorPicker_temp from "./ColorPicker_temp";

class ColorPickerContainer extends React.Component {
  /*
        PROPS:    {selectedDevice: device, deviceList: deviceList}
    */
  constructor(props) {
    super(props);
    this.state = {
      selectedColor: "rgb(0,128,255)",
      sliderVal: 0,
      gradColorArr: ["#668cff", "#4d79ff", "#3366ff"]
    };
  }

  componentWillMount() {
    let param = this.props.navigation.getParam("otherParam"),
      selDevice = param.selectedDevice,
      colorArr = [],
      Color = selDevice.Last_State ? selDevice.Last_State : "#00ffff";

    let { selectedColor1, gradColorArr } = getSelectedGradientColors(
      hexToRgb(Color)
    );
    this.setState({
      selectedColor: selectedColor1,
      gradColorArr: gradColorArr
    });
  }

  onColorChange = color => {
    console.log("Color Update" + color);
    let { selectedColor, gradColorArr } = getSelectedGradientColors(color);
    this.setState({ selectedColor: selectedColor, gradColorArr: gradColorArr });
  };

  onColorChangeComplete = color => {
    let { navigation, deviceListAction } = this.props,
      { deviceList, selectedDevice } = navigation.getParam("otherParam"),
      updateObj = { Last_State: color },
      updatedColor = color;
    if (
      !(
        selectedDevice.SSID.includes("OW") ||
        selectedDevice.SSID.includes("S02")
      )
    ) {
      if (typeof color === "object") {
        let { selectedColor } = getSelectedGradientColors(color);
        updateObj["Last_State"] = selectedColor;
        updatedColor = selectedColor;
      }
    }
    console.log("updatedColor--->", updatedColor);
    let newList = updateDeviceList(updateObj, selectedDevice, deviceList);
    //EXP_START: why this check (typeof selectedDevice.Web_Socket === 'object')
    //typeof selectedDevice.Web_Socket === "object" &&
    if (selectedDevice.Web_Socket) selectedDevice.Web_Socket.send(updatedColor);
    deviceListAction(newList);
    /** Update the list in DB so user get the updated list when he came back */
    insertDevices(newList);
  };

  onSlidingComplete = value => {
    let { selectedColor } = this.state;
    let sliderValue = Math.round(value * 100);
    // let color = changeColorBrigntess(selectedColor, -value*100);
    // this.onColorChangeComplete(color);
    // console.log("value--->", color);
    this.setState({ sliderVal: sliderValue });
  };

  render() {
    let { sliderVal, selectedColor, gradColorArr } = this.state;
    return (
      <View style={{ height: "100%" }}>
        <View style={{ height: "40%" }}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={gradColorArr}
            style={{ height: "100%" }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{ marginHorizontal: 15, height: "10%", marginTop: 10 }}
            >
              <Image source={ICON.LEFT_ARROW} style={{ height: "100%" }} />
            </TouchableOpacity>
            <ColorPickerHeader
              sliderVal={sliderVal}
              deviceName={" Device Bulb-1"}
            />

            <CustomeSlider
              customStyle={styles.sliderStyle}
              onSlidingComplete={this.onSlidingComplete}
              selectedColor={selectedColor}
              gradColorArr={gradColorArr}
            />
          </LinearGradient>
        </View>
        {/* <ColorPicker_temp /> */}
        <DeviceNavigator
          onColorChange={this.onColorChange}
          selectedColor={selectedColor}
          onColorChangeComplete={this.onColorChangeComplete}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sliderStyle: {
    marginHorizontal: 20
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorPickerContainer);
