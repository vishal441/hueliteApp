import React, { Component } from "react"
import { Image, Dimensions, StyleSheet, View } from "react-native"
import Animated from "react-native-reanimated"
import { ICON } from "../../common/constants/ImageConstant"
import { PanGestureHandler, TapGestureHandler } from "react-native-gesture-handler"
import colorsys from "colorsys"

const { event, Value, set, cond, add, call } = Animated
/* initialColor={selectedColor}
HSV={this.props.HSV}
onColorChange={color => this.props.onColorChange(color)}
style={{ width: 300, height: 300, marginTop: 100 }}
thumbSize={20}
thumbStyle={{ alignItems: "center" }}
onColorChangeComplete={color => this.props.onColorChangeComplete(color)} */

export class ColorWheel1 extends Component {
    constructor(props) {
        super(props)
        //this.props = props
        this.state = {
            dragX: 100,
            dragY: 100,
            width: 0,
            offset: { x: 0, y: 0 },
            currentColor: props.initialColor,
            //pan: new Animated.ValueXY(),
            radius: 1,
        }
    }

    onLayout = nativeEvent => {
        const window = Dimensions.get("window")
        this.refs.Marker.measure((x, y, width, height, pageX, pageY) => {
            console.log(x, y, width, height, pageX, pageY)
            console.log("offsetX::" + (pageX + width / 2))
            console.log("offsetY::" + (pageY + height / 2))
            const offset = {
                x: pageX + width / 2,
                y: pageY + height / 2,
            }
            const radius = Math.min(width, height) / 2
            this.setState({
                offset,
                radius,
                height,
                width,
                top: pageY,
                left: pageX,
            })
            console.log("***" + this.state.top)
            this.forceUpdate(this.props.HSV)
        })
    }

    forceUpdate = color => {
        //const { h, s, v } = colorsys.hex2Hsv(color)
        const { left, top } = this.calcCartesian(color.h, color.s / 100)

        //console.log("OOOOOO" + colorsys.hsv2Hex(color.h, color.s, color.v))
        this.setState({ currentColor: colorsys.hsv2Hex(color.h, color.s, color.v) })
        //this.props.onColorChange({ h, s, v });
        /* this.state.pan.setValue({
            x: left - this.props.thumbSize / 2,
            y: top - this.props.thumbSize / 2,
        }) */
        this.setState({
            dragX: left - 10,
            dragY: top - 10,
        })
    }

    calcCartesian(deg, radius) {
        const r = radius * this.state.radius // was normalized
        const rad = (Math.PI * deg) / 180
        const x = r * Math.cos(rad)
        const y = r * Math.sin(rad)
        console.log("ee:" + x)

        return {
            left: this.state.width / 2 + x,
            top: this.state.height / 2 - y,
        }
    }

    calcPolar(event) {
        //const { pageX, pageY, moveX, moveY } = gestureState
        const [x, y] = [event.nativeEvent.absoluteX, event.nativeEvent.absoluteY]
        console.log("X:: " + x + "   " + "Y:: " + y)
        const [dx, dy] = [x - this.state.offset.x, y - this.state.offset.y]
        return {
            deg: Math.atan2(dy, dx) * (-180 / Math.PI),
            // pitagoras r^2 = x^2 + y^2 normalized
            radius: Math.sqrt(dy * dy + dx * dx) / this.state.radius,
        }
    }

    outBounds(event) {
        const { radius } = this.calcPolar(event)
        return radius > 1
    }

    updateColor = event => {
        const { deg, radius } = this.calcPolar(event)
        const hsv = { h: deg, s: 100 * radius, v: 100 }
        const currentColor = colorsys.hsv2Hex(hsv)
        console.log(currentColor)

        this.setState({ hsv, currentColor })
        this.props.onColorChange(hsv)
    }

    onGestureEvent = event => {
        //console.log(event.nativeEvent.absoluteX)
        if (this.outBounds(event)) {
            return
        } else {
            this.updateColor(event)
            this.setState({
                dragX: event.nativeEvent.absoluteX - this.state.left - 10,
                dragY: event.nativeEvent.absoluteY - this.state.top - 10,
            })
        }
        //if (!(event.nativeEvent.absoluteX - this.state.left - 10 > 200)) {
        if (true) {
        }
    }

    render() {
        return (
            <TapGestureHandler onHandlerStateChange={this.onGestureEvent}>
                <PanGestureHandler
                    maxPointers={1}
                    onGestureEvent={this.onGestureEvent}
                    onHandlerStateChange={this.onGestureEvent}>
                    <View
                        style={{
                            borderWidth: 0,
                            borderColor: "#EE0",
                            marginTop: 100,
                        }}>
                        <View style={styles.view} ref="Marker" onLayout={this.onLayout}>
                            <Image
                                style={[
                                    styles.img,
                                    {
                                        height: 300,
                                        width: 300,
                                    },
                                ]}
                                source={ICON.COLOR_WHEEL}
                            />
                            <Animated.View
                                style={[
                                    styles.circle,
                                    {
                                        left: this.state.dragX,
                                        top: this.state.dragY,
                                    },
                                ]}></Animated.View>
                        </View>
                    </View>
                </PanGestureHandler>
            </TapGestureHandler>
        )
    }
}

const styles = StyleSheet.create({
    coverResponder: {
        alignItems: "center",
        justifyContent: "center",
    },
    view: {
        /* borderWidth: 3,
        borderColor: "#a00", */
    },
    img: {
        alignSelf: "center",
    },
    circle: {
        width: 20,
        height: 20,
        position: "absolute",
        backgroundColor: "transparent",
        borderWidth: 3,
        borderColor: "#EEEEEE",
        elevation: 3,
        shadowColor: "rgb(46, 48, 58)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius: 10,
    },
})
