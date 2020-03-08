import React, { Component } from "react"
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native"
import { ICON } from "../../common/constants/ImageConstant"
import ColorChooser from "./ColorPicker"
import ModesPresets from "./ModesNpresets/ModesPresets"
import Swiper from "react-native-swiper"

class DeviceNavigator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showPicker: true,
            screen: "color-RGB",
            gestureName: "none",
        }
    }

    deviceNavigation = navigation => {
        this.setState({ screen: navigation })
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.screen === "color-RGB" && (
                    <ColorChooser {...this.props} deviceNavigation={this.deviceNavigation} />
                )}
                {this.state.screen === "modes" && (
                    <ModesPresets {...this.props} deviceNavigation={this.deviceNavigation} />
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: "70%",
        width: "90%",
        position: "absolute",
        bottom: 0,
        justifyContent: "center",
        alignSelf: "center",
        borderTopColor: "blue",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    body: {
        position: "absolute",
        height: "100%",
        width: "100%",
    },
    pager: {
        width: "100%",
        alignContent: "center",
        alignSelf: "center",
        height: "100%",
    },
    child: {},
})

export default DeviceNavigator
