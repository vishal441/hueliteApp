import React, { Component } from "react"
import { View, Text, StyleSheet, Animated, PanResponder } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { Dimensions } from "react-native"
import styled from "styled-components"

export default class ColorPicker_temp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gesture_start: 0,
            currX: 0,
            dx_val: 0,
            width: 0,
            highlighterColor: "#f00",
            dimensions: undefined,
            scrollX: undefined,
        }

        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: Animated.event(
                [
                    null,
                    {
                        //x0: this.scrollX.x,
                        /* x0: this.scrollX.x */
                    },
                ],
                {
                    listener: (evt, gestureState) => {
                        this.setState({
                            scrollX: evt.nativeEvent.locationX,
                            highlighterColor: this.getColor(evt.nativeEvent.locationX),
                        })

                        // The gesture has started. Show visual feedback so the user knows
                        // what is happening!
                        // gestureState.d{x,y} will be set to zero now
                    },
                },
            ), // ),
            onPanResponderMove: Animated.event(
                [
                    null,
                    {
                        //moveX: this.scrollX.x,
                        /* moveX: this.scrollX.x, */
                    },
                ],
                {
                    listener: (evt, gestureState) => {
                        let { width } = this.state.dimensions
                        let x = 20
                        /* if( evt.nativeEvent.locationX < x){

                        } */
                        if (evt.nativeEvent.locationX /* < width - 20 */) {
                            this.setState({
                                scrollX: evt.nativeEvent.locationX,
                                // scrollX: evt.nativeEvent.locationX,
                            })
                            console.log(
                                "locX::" +
                                    evt.nativeEvent.locationX +
                                    "pageX::" +
                                    evt.nativeEvent.pageX,
                            )
                        } else {
                            console.log("not updating")
                        }
                    },
                },
            ), // Optional async listener),
            onPanResponderTerminationRequest: (evt, gestureState) => true,

            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
            },

            onPanResponderTerminate: (evt, gestureState) => {
                // Another component has become the responder, so this gesture
                // should be cancelled
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                return true
            },
        })
    }

    getColor = dx => {
        //console.log(dx)
        let R,
            G,
            B,
            regions = 5
        let { width } = this.state.dimensions
        let cover = dx % (width / regions)
        if (dx <= width / regions) {
            R = 255 //constant throught region
            G = 255 * (cover / (width / regions))
            B = 0 //constant throught region
            //console.log("RGB:: " + R + "-" + G + "-" + B)
        } else if (dx <= (width / regions) * 2) {
            /* console.log(
                "this is region 2:: " + "Width:: " + width + "cover is :: " + cover + "dx :: " + dx,
            ) */
            R = 255 - 255 * (cover / (width / regions))
            G = 255 //constant throught region
            B = 0 //constant throught region
            //console.log("RGB:: " + R + "-" + G + "-" + B)
        } else if (dx <= (width / regions) * 3) {
            R = 0 //constant throught region
            G = 255 //constant throught region
            B = 255 * (cover / (width / regions))
            //console.log("RGB:: " + R + "-" + G + "-" + B)
        } else if (dx <= (width / regions) * 4) {
            R = 0 //constant throught region
            G = 255 - 255 * (cover / (width / regions))
            B = 255 //constant throught region //constant throught region
            //console.log("RGB:: " + R + "-" + G + "-" + B)
        } else if (dx <= (width / regions) * 5) {
            R = 255 * (cover / (width / regions))
            G = 0 //constant throught region //constant throught region
            B = 255 //constant throught region
            //console.log("RGB:: " + R + "-" + G + "-" + B)
        }
        console.log(
            "#" +
                this.rgbToHex(Math.round(R)) +
                this.rgbToHex(Math.round(G)) +
                this.rgbToHex(Math.round(B)),
        )
        return (
            "#" +
            this.rgbToHex(Math.round(R)) +
            this.rgbToHex(Math.round(G)) +
            this.rgbToHex(Math.round(B))
        )
    }

    rgbToHex = function(rgb) {
        var hex = Number(rgb).toString(16)
        if (hex.length < 2) {
            hex = "0" + hex
        }
        return hex
    }

    colorPickerOnLayout = event => {
        if (this.state.dimensions) return // layout was already called
        let { width, height } = event.nativeEvent.layout
        this.setState({ dimensions: { width, height } })
        console.log("width is of color picker Component ::" + width)
    }

    highlighterOnLayout = event => {
        const layout = event.nativeEvent.layout
        //console.log("height:", layout.height)
        //console.log("width:", layout.width)
        //console.log("x:", layout.x)
        //console.log("y:", layout.y)
        if (this.state.dimensions) this.setState({ highlighterColor: this.getColor(layout.x) })
    }

    render() {
        const animatedStyle = {
            // transform: this.scrollX.getTranslateTransform(),
        }
        let { width, gesture_start, dx_val, currX, highlighterColor } = this.state
        return (
            <View style={styles.container}>
                <View
                    style={styles.colorpicker}
                    {...this._panResponder.panHandlers}
                    onLayout={this.colorPickerOnLayout}>
                    <LinearGradient
                        colors={["#f00", "#ff0", "#0f0", "#0ff", "#00f", "#f0f"]}
                        //locations={[0.01, 0.19, 0.3, 0.51, 0.73, 1]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.bar}></LinearGradient>
                    <Animated.View
                        style={[
                            styles.highlighter,
                            animatedStyle,
                            { backgroundColor: highlighterColor },
                            { left: this.state.scrollX },
                        ]}
                        onLayout={this.highlighterOnLayout}></Animated.View>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 20 }}>TOTAL WIDTH::</Text>
                    <Text style={{ fontSize: 20, position: "absolute", right: 0 }}>{width}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 20 }}>GESTURE STARTS AT::</Text>
                    <Text style={{ fontSize: 20, position: "absolute", right: 0 }}>
                        {gesture_start}
                    </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 20 }}>TOTAL MOVE X::</Text>
                    <Text style={{ fontSize: 20, position: "absolute", right: 0 }}>{dx_val}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 20 }}>CURRENT X VALUE::</Text>
                    <Text style={{ fontSize: 20, position: "absolute", right: 0 }}>{currX}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#e7e7e7",
        flex: 1,
        flexDirection: "column",
        padding: 20,
    },

    bar: {
        height: 40,
        width: "auto",
        //margin: 20,
        borderRadius: 10,
        flexDirection: "row",
    },
    highlighter: {
        zIndex: -1,
        position: "absolute",
        width: 20,
        height: 55,
        borderWidth: 0,
        borderRadius: 5,
        top: -7.5,
        shadowColor: "#000",
        shadowOpacity: 1,
        justifyContent: "center",
    },
    colorpicker: {
        //marginLeft: 20,
        //marginRight: 20,
    },
})

/* onPanResponderMove: (evt, gestureState) => {
    ;[
        {
            nativeEvent: {
                contentOffset: {
                    x: scrollX,
                },
            },
        },
    ]
    //Animated.event([{ x: this.point.x }])({ x: gestureState.moveX })
    console.log(this.point.x)
    // The most recent move distance is gestureState.move{X,Y}
    // The accumulated gesture distance since becoming responder is
    // gestureState.d{x,y}
}, */
