import React, { Component } from "react"
import { View, TouchableOpacity, Image, StyleSheet } from "react-native"
import ColorChooser from "./ColorPicker"
import { ColorPickerHeader } from "./ColorPickerHeader"
import { CustomeSlider } from "./Slider"
import { ICON } from "../../common/constants/ImageConstant"
import LinearGradient from "react-native-linear-gradient"
import { getSelectedGradientColors, changeBrightness } from "../DashboardUtil"
import { changeColorBrigntess, hexToRgb, hsvToRgb, rgbToHex } from "../colorPicker/ColorUtil"
import { connect } from "react-redux"
import { updateDeviceList } from "../../../util/AppUtil"
import { deviceListAction } from "../../../redux/actions/DeviceListAction"
import { insertDevices } from "../../../database/table/DeviceTable"
import DeviceNavigator from "./DeviceNavigator"
import { reduxConstant } from "../../../redux/ReduxConstant"
import ColorPicker_temp from "./ColorPicker_temp"
import colorsys from "colorsys"
import { getCurrentTimeStamp } from "../../../util/DateTimeUtil"

class ColorPickerContainer extends React.Component {
    /*
        PROPS:    {selectedDevice: device, deviceList: deviceList}
    */
    constructor(props) {
        super(props)
        this.colorUpdateTimestamp = getCurrentTimeStamp() - 300
        this.state = {
            selectedColor: "rgb(0,128,255)",
            HSV: this.props.navigation.getParam("otherParam").selectedDevice.HSV,
            sliderVal: 0,
            gradColorArr: ["#668cff", "#4d79ff", "#3366ff"],
        }
    }

    componentWillMount() {
        let param = this.props.navigation.getParam("otherParam"),
            selDevice = param.selectedDevice,
            colorArr = [],
            Color = selDevice.Last_State ? selDevice.Last_State : "#00ffff",
            HSV = selDevice.HSV

        let { selectedColor1, gradColorArr } = getSelectedGradientColors(HSV)
        this.setState({
            selectedColor: selectedColor1,
            gradColorArr: gradColorArr,
        })
    }

    onColorChange = color => {
        console.log("kkkkkk" + colorsys.hsv2Hex(color.h, color.s, color.v))
        let { navigation, deviceListAction } = this.props,
            { deviceList, selectedDevice } = navigation.getParam("otherParam"),
            updateObj = [{ Last_State: color }, { HSV: color }]
        let { selectedColor, gradColorArr } = getSelectedGradientColors(color)
        this.setState({ selectedColor: selectedColor, gradColorArr: gradColorArr })

        //TODO: send ws color event to device
        if (getCurrentTimeStamp() - this.colorUpdateTimestamp >= 200) {
            console.log(
                "<><><><>------------" + (getCurrentTimeStamp() - this.colorUpdateTimestamp) / 1000,
            )
            if (selectedDevice.Web_Socket) {
                selectedDevice.Web_Socket.send(selectedColor)
                this.colorUpdateTimestamp = getCurrentTimeStamp()
                updateObj["HSV"] = color
                let newList = updateDeviceList(updateObj, selectedDevice, deviceList)
                deviceListAction(newList)
                //insertDevices(newList)
            }
        } else {
            console.log("Time gap not meet")
        }
    }

    /*  - Send the last color to the device after 150ms
        - Update the list in DB with latest timestamp
        TODO: add the delay timer to send thee last color after 100ms delay
    */
    onColorChangeComplete = color => {
        let { navigation, deviceListAction } = this.props,
            { deviceList, selectedDevice } = navigation.getParam("otherParam"),
            updateObj = [{ Last_State: color }, { HSV: color }],
            updatedColor = color
        let { selectedColor } = getSelectedGradientColors(color)
        updateObj["Last_State"] = selectedColor
        updateObj["HSV"] = color
        updatedColor = selectedColor

        //EXP_START: why this check
        if (!(selectedDevice.SSID.includes("OW") || selectedDevice.SSID.includes("S02"))) {
            if (typeof color === "object") {
            }
        }
        let newList = updateDeviceList(updateObj, selectedDevice, deviceList)
        //EXP_START: why this check (typeof selectedDevice.Web_Socket === 'object')
        //typeof selectedDevice.Web_Socket === "object" &&
        if (selectedDevice.Web_Socket) selectedDevice.Web_Socket.send(updatedColor)
        deviceListAction(newList)

        insertDevices(newList)
    }

    onSlidingComplete = value => {
        let { navigation, deviceListAction } = this.props,
            { deviceList, selectedDevice } = navigation.getParam("otherParam")
        let { selectedColor, gradColorArr } = getSelectedGradientColors(selectedDevice.HSV),
            updateObj = [{ HSV: { h: selectedDevice.HSV.h, s: selectedDevice.HSV.s, v: value } }]

        updateObj["HSV"] = { h: selectedDevice.HSV.h, s: selectedDevice.HSV.s, v: value }
        console.log(colorsys.hsv2Hex(updateObj.HSV.h, updateObj.HSV.s, updateObj.HSV.v))
        if (getCurrentTimeStamp() - this.colorUpdateTimestamp >= 200) {
            console.log(
                "<><><><>------------" + (getCurrentTimeStamp() - this.colorUpdateTimestamp) / 1000,
            )
            if (selectedDevice.Web_Socket) {
                selectedDevice.Web_Socket.send(
                    colorsys.hsv2Hex(updateObj.HSV.h, updateObj.HSV.s, updateObj.HSV.v),
                )
                this.colorUpdateTimestamp = getCurrentTimeStamp()
                let newList = updateDeviceList(updateObj, selectedDevice, deviceList)
                deviceListAction(newList)
                insertDevices(newList)
            }
        } else {
            console.log("Time gap not meet")
        }
    }

    render() {
        let { sliderVal, selectedColor, gradColorArr } = this.state
        return (
            <View style={{ height: "100%" }}>
                <View style={{ height: "40%" }}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={gradColorArr}
                        style={{ height: "100%" }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                            style={{ marginHorizontal: 15, height: "10%", marginTop: 10 }}>
                            <Image source={ICON.LEFT_ARROW} style={{ height: "100%" }} />
                        </TouchableOpacity>
                        <ColorPickerHeader sliderVal={sliderVal} deviceName={" Device Bulb-1"} />

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
                    HSV={this.state.HSV}
                    onColorChangeComplete={this.onColorChangeComplete}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    sliderStyle: {
        marginHorizontal: 20,
    },
})

const mapStateToProps = state => {
    return {
        deviceList: state,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deviceListAction: deviceList =>
            dispatch({ type: reduxConstant.DEVICE_LIST, deviceList: deviceList }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPickerContainer)
