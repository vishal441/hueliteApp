import React, { useEffect, useState } from "react"
import { View, Text } from "react-native"
import { Form, Item, Input, Label, Picker, Icon } from "native-base"
import { getWiFiList } from "../../backGroundServices/webApi/WebApi"
import { cond } from "react-native-reanimated"

export default PairIos2 = props => {
    let _wifiSSID = "*",
        _pass = "*"

    const [wifiList, setWifiList] = useState([])
    const [selectedWiFi, setSelectedWiFi] = useState("")

    useEffect(() => {
        //console.log("PairIOS2 USE EFFECT")
        return () => {
            //console.log("PairIOS2 USE EFFECT_Cleanup")
        }
    })

    goToPairingForm = () => {
        let wifiName = {}
        wifiName["SSID"] = selectedWiFi
        wifiName["BSSID"] = selectedWiFi
        props.navigation.replace("PairingForm", {
            otherParam: { wifiList: wifiList, selectedDevice: wifiName },
        })
    }

    return (
        <View>
            <Text style={{ marginTop: "20%" }}>Hello</Text>
            <Form style={{ width: "100%" }}>
                <Item picker>
                    <Picker
                        iosHeader="Available WiFi List"
                        mode="dropdown"
                        selectedValue={selectedWiFi}
                        placeholder="Select a WiFi Network to Pair with"
                        iosIcon={<Icon name="arrow-down" />}
                        placeholderStyle={{ color: "#bfc6ea", width: "100%" }}
                        placeholderIconColor="#007aff"
                        onValueChange={item => {
                            console.log(item)
                            setSelectedWiFi(item)
                        }}>
                        {wifiList &&
                            wifiList.map((item, i) => (
                                <Item label={item.value} value={item.value}></Item>
                            ))}
                    </Picker>
                </Item>
                <Item floatingLabel>
                    <Label>Enter Wi-Fi SSID</Label>
                    <Input
                        onChangeText={text => {
                            console.log(text)
                            _wifiSSID = text
                        }}
                    />
                </Item>
                <Item floatingLabel>
                    <Label>Enter Wi-Fi Password</Label>
                    <Input
                        onChangeText={text => {
                            console.log(text)
                            _pass = text
                        }}
                    />
                </Item>
            </Form>
            <Text onPress={goToPairingForm}>Pairing Form</Text>
        </View>
    )
}
