import React, { Component } from "react"
import { View, TouchableOpacity, Image, StyleSheet, Text, Platform } from "react-native"
import { ICON } from "../../common/constants/ImageConstant"
import { PanelItem } from "./PanelItem"
import LinearGradient from "react-native-linear-gradient"

class MainPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    moveToColorPicker = () => {
        this.props.navigation.navigate("ColorPickerContainer")
    }
    moveToDashboard = () => {
        this.props.navigation.navigate("Dashboard")
    }
    moveToSearchWifi = () => {
        if (Platform.OS === "ios") {
            this.props.navigation.replace("PairIos1")
        } else {
            this.props.navigation.replace("WifiScreen")
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={["#40b9ed", "#0faef2", "#0980b3", "#0980b3"]}
                    style={styles.headerView}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity>
                            <Image source={ICON.BLACK_NOTIFICATION} style={styles.img} />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image source={ICON.WHITE_SETTING} style={styles.img} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.headerBottom}>
                        <Text style={styles.label}>{"Explore Your Device and Settings"}</Text>
                        <Text
                            style={[
                                styles.label,
                                { fontSize: 22, fontWeight: "500", paddingTop: 10 },
                            ]}>
                            {"My Panel"}
                        </Text>
                    </View>
                </LinearGradient>
                <View style={styles.panelRow}>
                    <PanelItem
                        panelName={"Dashboard"}
                        panelTxtStyle={{ color: "red" }}
                        icon={ICON.BULB}
                        onPanelPress={this.moveToDashboard}
                        gradColorArr={["#40b9ed", "#0faef2", "#0980b3"]}
                    />

                    <PanelItem
                        panelName={"Color Picker"}
                        panelTxtStyle={{ color: "#810699" }}
                        containerStyle={{ backgroundColor: "#fff" }}
                        icon={ICON.TWITER}
                        onPanelPress={this.moveToColorPicker}
                        gradColorArr={["#fff", "#fff"]}
                    />

                    <PanelItem
                        panelName={"Modes"}
                        panelTxtStyle={{ color: "#05b071" }}
                        icon={ICON.TWITER}
                        gradColorArr={["#fff", "#fff"]}
                    />

                    <PanelItem
                        panelName={"Add Device"}
                        panelTxtStyle={{ color: "#ff6a00" }}
                        containerStyle={{ backgroundColor: "#fff" }}
                        icon={ICON.TWITER}
                        onPanelPress={this.moveToSearchWifi}
                        gradColorArr={["#fff", "#fff"]}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: "100%",
    },
    img: {
        height: 35,
        width: 35,
    },
    headerView: {
        // backgroundColor: '#0faef2',
        height: "30%",
        paddingHorizontal: 20,
        justifyContent: "space-between",
        paddingVertical: 30,
    },
    label: {
        fontSize: 16,
        fontWeight: "400",
        color: "#fff",
    },
    headerBottom: {},
    panelRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        paddingHorizontal: 15,
    },
})

export default MainPanel
