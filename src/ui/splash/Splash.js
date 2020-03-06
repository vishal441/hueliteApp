import React, { Component } from "react"
import { View, Text, FlatList, StyleSheet, Image, Button } from "react-native"
import { ICON } from "../common/constants/ImageConstant"
import {
    getDeviceListFromDb,
    deleteDeviceTable,
    insertDevices,
} from "../../database/table/DeviceTable"
import { connect } from "react-redux"
import { reduxConstant } from "../../redux/ReduxConstant"
import { deviceArr } from "../../util/DummyData"
import { heartBeatHandler } from "../../backGroundServices/Heartbeat"
import { deviceListAction } from "../../redux/actions/DeviceListAction"
import NetInfo from "./NetInfoListner"

// Connected State ::
//      #mapStateToProps::deviceList
//      #mapDispatchtoProps::deviceListAction:(deviceList)=>
class Splash extends Component {
    constructor(props) {
        super(props)
        this.ssid = null
    }
    async componentDidMount() {
        let self = this
        /**UnComment the next line for the very first time to insert dummay device in DB,
         * After first attempt please comment it for now,
         * Add few dummay data on util/DummayData file
         */
        //insertDevices(deviceArr)

        /**
         * To delete all the data from DB unComment the next line, otherwise no need for same.
         */
        //deleteDeviceTable()

        let dbRes = await getDeviceListFromDb(),
            deviceListing = dbRes.data
        this.props.deviceListAction(deviceListing)
        setTimeout(function() {
            if (deviceListing.length) self.props.navigation.navigate("Dashboard")
            else self.props.navigation.navigate("WifiScreen")
        }, 2000)
    }

    componentDidUpdate() {
        let self = this
        let { deviceList, deviceListAction } = self.props
        //EXP_START: whats happening here
        if (window._interval) {
            clearInterval(window._interval)
        }
        window._interval = setInterval(async () => {
            await heartBeatHandler(deviceList, deviceListAction, this.ssid)
        }, 3000)
        //EXP_STOP:
    }

    netFunction = info => {
        //console.log("NetInfo From Splash" + info.details.ssid)
        if (info.type == "wifi") {
            if (info.details.ssid) {
                console.log("conneccted to " + info.details.ssid)
                this.ssid = info.details.ssid
            }
        } else {
            console.log("<<<not connected>>>")
            this.ssid = null
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NetInfo onNetChange={this.netFunction} />
                <Image style={styles.image} source={ICON.LOGO} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#3097e4",
    },
    image: {
        width: 150,
        height: 50,
        position: "absolute",
        top: "35%",
        left: "30%",
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

export default connect(mapStateToProps, mapDispatchToProps)(Splash)

// const mapStateToProps = (state) => {
//     return{
//         deviceList: state
//     }
// }
//
// export default withNavigationFocus(connect(mapStateToProps, {deviceListAction})(Splash));
