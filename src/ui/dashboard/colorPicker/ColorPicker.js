import React, { Component } from "react"
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native"
import { ICON } from "../../common/constants/ImageConstant"
import { ColorWheel } from "./ColorWheel"

class ColorChooser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            circleArr: [],
            coolWhiteColor: [
                { color: "#A3E7FF", send: "#000000ff00" },
                { color: "#C9F8FF", send: "#000000bf00" },
                { color: "#CDF7FF", send: "#0000007f00" },
                { color: "#E9FCFF", send: "#0000004000" },
            ],
            warmWhiteColor: [
                { color: "#F4F3E7", send: "#0000000040" },
                { color: "#F5F3DE", send: "#000000007f" },
                { color: "#F6EBCC", send: "#00000000bf" },
                { color: "#F5E1A6", send: "#00000000ff" },
            ],
        }
        console.log("Selected color is :: " + props.selectedColor)
    }

    addCircle = circleColor => {
        let circleArray = Object.assign([], this.state.circleArr)
        circleArray.push(circleColor)
        this.setState({ circleArr: circleArray })
    }

    render() {
        let { selectedColor } = this.props,
            { circleArr, warmWhiteColor, coolWhiteColor } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.txt}>Select Color</Text>
                        <View style={styles.underline} />
                    </View>
                    <ColorWheel
                        initialColor={selectedColor}
                        HSV={this.props.HSV}
                        onColorChange={color => this.props.onColorChange(color)}
                        style={{ width: 300, height: 300, marginTop: 100 }}
                        thumbSize={20}
                        thumbStyle={{ alignItems: "center" }}
                        onColorChangeComplete={color => this.props.onColorChangeComplete(color)}
                    />
                </View>
                <View
                    style={{
                        //backgroundColor: "#ff0",
                        flex: 1,
                        width: "100%",
                    }}>
                    <TouchableOpacity
                        style={{ position: "absolute", bottom: 60, right: 30 }}
                        onPress={() => this.props.deviceNavigation("modes")}>
                        <Image
                            style={{
                                height: 60,
                                width: 60,
                            }}
                            source={ICON.MODES_BUTTON}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const Circle = ({ circleArr, onColorChangeComplete }) => {
    return (
        <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
            {circleArr &&
                circleArr.map(rgColor => (
                    <TouchableOpacity onPress={() => onColorChangeComplete(rgColor.send)}>
                        <View style={[styles.circle, { backgroundColor: rgColor.color }]} />
                    </TouchableOpacity>
                ))}
        </View>
    )
}

const AddCircle = ({ bgColor, addCircle }) => {
    return (
        <TouchableOpacity
            style={[styles.circle, { backgroundColor: bgColor }]}
            onPress={() => {
                addCircle(bgColor)
            }}>
            <Image source={ICON.ADD} style={{ height: 40, width: 40 }} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
    },
    circle: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: "red",
        margin: 10,
    },
    txt: {
        color: "grey",
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 10,
        width: "100%",
        textAlign: "center",
    },
    underline: {
        borderBottomColor: "#F2F2F2",
        width: "100%",
        borderBottomWidth: 1,
    },
})

export default ColorChooser
