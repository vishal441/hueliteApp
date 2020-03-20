import React, { Component } from "react"
import { View, StyleSheet, Image, Text, Platform } from "react-native"
import { ICON } from "../common/constants/ImageConstant"
import { getUserInfoFromDb } from "../../database/table/UserInfoTable"
import LinearGradient from "react-native-linear-gradient"
import {
    getDeviceListFromDb,
    deleteDeviceTable,
    insertDevices,
} from "../../database/table/DeviceTable"
import { insertUserInfo, deleteUserInfoTable } from "../../database/table/UserInfoTable"
import { connect, useSelector } from "react-redux"
import { reduxConstant } from "../../redux/ReduxConstant"
import { deviceArr } from "../../util/DummyData"
import { deviceListAction } from "../../redux/actions/DeviceListAction"
import NetInfo from "./NetInfoListner"
import Zeroconf from "react-native-zeroconf"
import Icon from "react-native-vector-icons/Ionicons"

const zeroconf = new Zeroconf()

// Connected State ::
//      #mapStateToProps::deviceList
//      #mapDispatchtoProps::deviceListAction:(deviceList)=>
class Splash extends Component {
    constructor(props) {
        super(props)
        this.netInfo = null
        this.state = {
            _mDNS: false,
        }
    }

    async componentDidMount() {
        console.log("--------------*********-----------------")
        let self = this
        Icon.loadFont()
        if (!this.state._mDNS) {
            zeroconf.scan("http", "tcp", "local.")
            zeroconf.on("start", () => {
                //this.setState({ isScanning: true })
                console.log("[[[[[[[[[[[[[[[[Start]")
            })
            zeroconf.on("stop", () => {
                //this.setState({ isScanning: false })
                console.log("[Stop]")
            })
            zeroconf.on("resolved", service => {
                console.log("[Resolve]", JSON.stringify(service, null, 2))
            })
            zeroconf.on("error", err => {
                //this.setState({ isScanning: false })
                console.log("[Error]", err)
            })
        }
        this.setState({ _mDNS: true })

        //NOTE: -->insert dummy device data in DB
        ///insertDevices(deviceArr)

        //NOTE: -->delete device data from DB
        ///deleteDeviceTable()

        //insertUserInfo(userInfo)
        //deleteUserInfoTable()

        let dbRes = await getDeviceListFromDb(),
            deviceListing = dbRes.data
        this.props.deviceListAction(deviceListing)

        let userRes = await getUserInfoFromDb()

        if (userRes) console.log("name : ", userRes.User_Id)
        setTimeout(function() {
            ///self.props.navigation.replace("PairIos1")
            if (!userRes && !deviceListing.length) self.props.navigation.replace("Welcome")
            else if (deviceListing.length) self.props.navigation.replace("Dashboard")
            else {
                if (Platform.OS === "ios") {
                    self.props.navigation.replace("PairIos1")
                } else {
                    self.props.navigation.replace("WifiScreen")
                }
            }
        }, 1000)
    }

    componentDidUpdate() {}

    netFunction = info => {
        this.netInfo = info
    }

    componentWillUnmount() {
        console.log("Splash Unmount")
    }

    render() {
        return (
            <LinearGradient
                start={{ x: 0.5, y: 1.5 }}
                end={{ x: 1.5, y: 0.5 }}
                colors={["#aaa", "#fff"]}
                /* style={[styles.cardContainer, { elevation: isShowEditDashoard ? 15 : 5 }]} */
            >
                <View style={styles.container}>
                    {Platform.OS === "android" && <NetInfo onNetChange={this.netFunction} />}
                    <Image style={styles.image} source={ICON.LOGO} />
                    <Text style={styles.text}>HUElite</Text>
                </View>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        flexDirection: "column",
    },
    image: {
        alignSelf: "center",
    },
    text: {
        alignSelf: "center",
        color: "#aaa",
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 20,
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
