import React, { Component } from "react"
import { View } from "react-native"
import NetInfo from "@react-native-community/netinfo"

export default class NetInfoListner extends Component {
    componentWillMount() {
        NetInfo.addEventListener(info => {
            console.log("<<Net Info Listner>>")
            if (info.isConnected && info.type === "wifi") {
                this.setState({ currentWifi: info.details.ssid })
            }
        })
    }
    render() {
        return null
    }
}
