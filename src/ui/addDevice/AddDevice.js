import React, { Component } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, AppState } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { ICON } from "../common/constants/ImageConstant"
import NetInfo from "@react-native-community/netinfo"
import DeviceSettings from "react-native-device-settings"

class AddDevice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deviceHotspot: "",
            password: "12345678",
            currentWifi: "",
            selDeviceName: "",
        }
    }

    componentDidMount() {
        NetInfo.addEventListener(info => {
            console.log("<<WiFi listner 1>>")
            if (info.isConnected && info.type === "wifi") {
                this.setState({ currentWifi: info.details.ssid })
            }
        })
        AppState.addEventListener("change", this.handleAppStateChange)
    }

    handleAppStateChange = nextAppState => {
        let { currentWifi, selDeviceName } = this.state,
            self = this
        if (nextAppState === "active" && currentWifi === selDeviceName) {
            this.setState({ selDeviceName: "" })
            setTimeout(() => {
                self.navigateToPairingForm()
            }, 1000)
        } else {
            //this.setState({appState: 'inactive'})
        }
    }

    onDeviceClick = () => {
        let {
                deviceInfo: { SSID },
            } = this.props,
            { currentWifi } = this.state
        this.setState({ deviceHotspot: SSID })
        if (currentWifi === SSID) {
            this.navigateToPairingForm()
        } else {
            this.showPopup()
        }
    }

    navigateToPairingForm = () => {
        let { deviceInfo, wifiList } = this.props
        this.props.navigation.navigate("PairingForm", {
            otherParam: { wifiList: wifiList, selectedDevice: deviceInfo },
        })
    }

    redirectToWifi = () => {
        let {
            deviceInfo: { SSID },
        } = this.props
        this.setState({ selDeviceName: SSID })
        DeviceSettings.wifi()
    }

    showPopup = () => {
        let { deviceHotspot, password } = this.state
        Alert.alert(
            "Alert",
            `You need to connect your device from wifi '${deviceHotspot}' with password ${password}.`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => this.redirectToWifi(),
                },
            ],
        )
    }

    componentWillUnmount() {
        // NetInfo.removeEventListener('change', this.rg)
        AppState.removeEventListener("change", this._handleAppStateChange)
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={0.6} onPress={this.onDeviceClick}>
                <LinearGradient colors={["#2d90e8", "#3aafda", "#8ac5eb"]} style={styles.wifiList}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={ICON.BULB} />
                    </View>
                    <View style={styles.textContatiner}>
                        <Text style={styles.name}>{this.props.name}</Text>
                        <Text style={styles.unpaired}>Unpaired</Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        width: "30%",
        height: "30%",
        alignContent: "center",
    },
    image: {
        width: 60,
        height: 60,
    },
    textContatiner: {
        width: "70%",
        textAlign: "right",
    },
    wifiList: {
        marginTop: 10,
        borderRadius: 10,
        padding: 20,
        textAlign: "center",
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        flexDirection: "row",
    },
    name: {
        color: "white",
        fontSize: 16,
        textAlign: "right",
    },
    unpaired: {
        color: "#FFFFFF",
        fontSize: 12,
        textAlign: "right",
    },
})

export default AddDevice
