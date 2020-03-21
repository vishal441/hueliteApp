import React, { useState, useEffect, Component } from "react"
import { StyleSheet, Text, View, Image } from "react-native"
import NetInfo from "@react-native-community/netinfo"
import NetInfo1 from "../splash/NetInfoListner"
import DeviceSettings from "react-native-device-settings"
import axios from "axios"
import { Spinner } from "native-base"
import { ICON } from "../common/constants/ImageConstant"
import { SafeAreaView } from "react-navigation"

PairIos1 = props => {
    const [Show, setShow] = useState(false)
    const [wifiList, setWifiList] = useState([])
    const [selectedWiFi, setSelectedWiFi] = useState("New Device")

    useEffect(() => {
        console.log("PairIOS1 USE EFFECT")
        var count = 0
        statusInterval = setInterval(async () => {
            await axios
                .get("http://192.168.4.1/status", { timeout: 500 })
                .then(function(response) {
                    // handle success
                    count = count + 1
                    console.log("--" + count)
                    setShow(true)
                })
                .catch(function(error) {
                    // handle error
                    console.log(error)
                    setShow(false)
                })
                .finally(function() {
                    // always executed
                })
        }, 3000)
        return () => {
            console.log("PairIOS1 USE EFFECT_Cleanup")
            clearInterval(statusInterval)
        }
    })

    onSettings = () => {
        DeviceSettings.wifi()
        ///props.navigation.navigate("PairIos2")
    }

    Next = () => {
        let wifiName = {}
        wifiName["SSID"] = selectedWiFi
        wifiName["BSSID"] = selectedWiFi
        props.navigation.replace("PairingForm", {
            otherParam: { wifiList: wifiList, selectedDevice: wifiName },
        })
    }

    netFunction = info => {
        if (info.type == "wifi") {
            console.log("--PAIRIOS1::conneccted with ip " + info.details.ipAddress)
            if (info.details.ipAddress == "192.168.4.3") {
                console.log("FOUND 192.168.4.1 Proceed with pairing")
                if (!this.state.startPairing) this.setState({ startPairing: true })
            }
        } else {
            console.log("<<<not connected to wifi>>>")
            if (this.state.startPairing) this.setState({ startPairing: false })
        }
    }

    /* render() { */
    return (
        <View style={styles.container}>
            {/* <NetInfo1 onNetChange={this.netFunction} /> */}
            <SafeAreaView>
                <Image style={styles.logo} source={ICON.LOGO} />
            </SafeAreaView>
            <View
                style={{
                    flex: 5,
                    borderWidth: 3,
                    width: "100%",
                    borderColor: "#fff",
                    paddingTop: 40,
                }}>
                <View style={{ alignSelf: "center" }}>
                    <Text
                        style={{
                            color: "#aaa",
                            paddingRight: "10%",
                            paddingLeft: "10%",
                            textAlign: "center",
                        }}>
                        Start by pairing your phone WiFi with HUElite Device
                        <Text onPress={this.onSettings} style={{ fontWeight: "bold" }}>
                            {" "}
                            WiFi-Settings
                        </Text>
                    </Text>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            paddingTop: 20,
                            paddingLeft: 10,
                            paddingRight: 10,
                            borderWidth: 0,
                        }}>
                        <Bold style={{ color: "#aaa" }}>
                            {"  "}
                            1.<Light> GoTo WiFi Settings</Light>
                        </Bold>
                        <Bold
                            style={{
                                color: "#aaa",
                                textAlign: "center",
                                paddingTop: 10,
                            }}>
                            {" "}
                            2.
                            <Light>
                                {" "}
                                Connect to a HUElite Device WiFi "<Bold>HUE_CLXX_XX:XX</Bold>" with
                                password <Bold>12345678</Bold>
                            </Light>
                        </Bold>
                        <Bold style={{ color: "#aaa", textAlign: "center", paddingTop: 10 }}>
                            3.
                            <Light>
                                {" "}
                                Come back to <Bold>HUElite APP</Bold> after connecting to device
                            </Light>
                        </Bold>
                    </View>
                </View>
            </View>
            <View
                style={{
                    flex: 1,
                    borderWidth: 3,
                    width: "100%",
                    borderColor: "#fff",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                }}>
                {Show ? (
                    <View style={styles.spinnerView}>
                        <Text onPress={this.Next}>Pair</Text>
                    </View>
                ) : (
                    <View style={styles.spinnerView}>
                        <Spinner color="#aaa" style={{ height: 10, width: 10 }} />
                    </View>
                )}
            </View>
        </View>
    )
    //}
}

export default PairIos1

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    settings: {
        color: "#aaa",
    },
    spinnerView: {
        alignSelf: "center",
        paddingRight: 50,
    },
    logo: {
        alignSelf: "center",
    },
})

const Bold = props => {
    return <Text style={[props.style, { fontWeight: "bold" }]}>{props.children}</Text>
}

const Light = props => {
    return <Text style={[props.style, { fontWeight: "400" }]}>{props.children}</Text>
}
