import React, { Component } from "react";
import { Image, Dimensions, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { ICON } from "../../common/constants/ImageConstant";
import {
  State,
  PanGestureHandler,
  TapGestureHandler
} from "react-native-gesture-handler";
import colorsys from "colorsys";

const { event, Value, set, cond, add, call } = Animated;
/* initialColor={selectedColor}
HSV={this.props.HSV}
onColorChange={color => this.props.onColorChange(color)}
style={{ width: 300, height: 300, marginTop: 100 }}
thumbSize={20}
thumbStyle={{ alignItems: "center" }}
onColorChangeComplete={color => this.props.onColorChangeComplete(color)} */

export class ColorWheel1 extends Component {
  constructor(props) {
    super(props);
    //this.props = props
    this.initials = {
      screeHeight: 0,
      screeWidth: 0,
      pageX: 0,
      pageY: 0,
      radius: 0,
      center: { x: 0, y: 0 },
      touchPoint: { x1: 0, y1: 0 }
    };
    this.state = {
      dragX: 100,
      dragY: 100,
      width: 0,
      offset: { x: 0, y: 0 },
      currentColor: props.initialColor,
      //pan: new Animated.ValueXY(),
      radius: 1
    };
  }

  onLayout = nativeEvent => {
    const window = Dimensions.get("window");
    this.refs.Marker.measure((x, y, width, height, pageX, pageY) => {
      this.initials.screeHeight = window.height;
      this.initials.screeWidth = window.width;
      this.initials.center.x = pageX + width / 2;
      this.initials.center.y = pageY + width / 2;
      this.initials.pageX = pageX;
      this.initials.pageY = pageY;
      this.initials.radius = width / 2;
      console.log(this.initials);
      const offset = {
        x: pageX + width / 2,
        y: pageY + height / 2
      };
      const radius = Math.min(width, height) / 2;
      this.setState({
        offset,
        radius,
        height,
        width,
        top: pageY,
        left: pageX
      });
      this.forceUpdate(this.props.HSV);
    });
  };

  forceUpdate = color => {
    //const { h, s, v } = colorsys.hex2Hsv(color)
    const { left, top } = this.calcCartesian(color.h, color.s / 100);

    //console.log("OOOOOO" + colorsys.hsv2Hex(color.h, color.s, color.v))
    this.setState({
      currentColor: colorsys.hsv2Hex(color.h, color.s, color.v)
    });
    //this.props.onColorChange({ h, s, v });
    /* this.state.pan.setValue({
            x: left - this.props.thumbSize / 2,
            y: top - this.props.thumbSize / 2,
        }) */
    this.setState({
      dragX: left - 10,
      dragY: top - 10
    });
  };

  calcCartesian(deg, radius) {
    const r = radius * this.state.radius; // was normalized
    const rad = (Math.PI * deg) / 180;
    const x = r * Math.cos(rad);
    const y = r * Math.sin(rad);

    return {
      left: this.state.width / 2 + x,
      top: this.state.height / 2 - y
    };
  }

  outBounds(event) {
    const { radius } = this.calcPolar(event);
    return radius > 1;
  }

  calcPolar(event) {
    const [x, y] = [event.nativeEvent.absoluteX, event.nativeEvent.absoluteY];
    console.log("<<--X>" + x + "--Y>" + y + "-->>");
    const [dx, dy] = [x - this.state.offset.x, y - this.state.offset.y];
    return {
      deg: Math.atan2(dy, dx) * (-180 / Math.PI),
      // pitagoras r^2 = x^2 + y^2 normalized
      radius: Math.sqrt(dy * dy + dx * dx) / this.state.radius
    };
  }

  /**Send *_state* true to send onChangeComplete Callback  */
  updateColor = obj => {
    const { deg, radius } = this.calcPolar(obj.event);
    const hsv = { h: deg, s: 100 * radius, v: 100 };
    const currentColor = colorsys.hsv2Hex(hsv);
    this.setState({ hsv, currentColor });
    if (!obj._state) this.props.onColorChange(hsv);
    else if (obj._state) this.props.onColorChangeComplete(hsv);
  };

  onGestureEvent = event => {
    let debug = true;
    /* console.log(
      "absoluteX>>" +
        event.nativeEvent.absoluteX +
        "absoluteY>>" +
        event.nativeEvent.absoluteY
    ); */
    if (event.nativeEvent.state === State.END) {
      console.log("motion END");
      if (this.outBounds(event)) {
        //this.updateColor({ event, _state: true })
        return;
      } else {
        this.setState({
          dragX: event.nativeEvent.absoluteX - this.state.left - 10,
          dragY: event.nativeEvent.absoluteY - this.state.top - 10
        });
        console.log("onColorUpdateEnd");
        //this.updateColor({ event, _state: true });
      }
    } else if (event.nativeEvent.state === State.ACTIVE) {
      if (this.outBounds(event)) {
        //NOTE: circle outbounds intersection calculation
        let m =
          (event.nativeEvent.absoluteY - this.initials.center.y) /
          (event.nativeEvent.absoluteX - this.initials.center.x);
        let dt = this.initials.radius,
          d = Math.sqrt(
            Math.pow(event.nativeEvent.absoluteX - this.initials.center.x, 2) +
              Math.pow(event.nativeEvent.absoluteY - this.initials.center.y, 2)
          ),
          t = dt / d;
        let newX =
          (1 - t) * this.initials.center.x + t * event.nativeEvent.absoluteX;
        let newY =
          (1 - t) * this.initials.center.y + t * event.nativeEvent.absoluteY;
        this.setState({
          dragX: newX - this.state.left - 10,
          dragY: newY - this.state.top - 10
        });
        let event1 = {
          nativeEvent: {
            absoluteX: this.state.dragX.toFixed(1) + 10 + this.initials.pageX,
            absoluteY: this.state.dragY.toFixed(1) + 10 + this.initials.pageY
          }
        };
        console.log(
          "--newY>>" +
            event1.nativeEvent.absoluteY +
            "--newX>>" +
            event1.nativeEvent.absoluteX
        );

        this.updateColor({ event: event1, _state: false });
      } else {
        this.setState({
          dragX: event.nativeEvent.absoluteX - this.state.left - 10,
          dragY: event.nativeEvent.absoluteY - this.state.top - 10
        });
        console.log(
          "---------------------------" +
            "--newY>>" +
            this.state.dragY +
            "--newX>>" +
            this.state.dragX
        );

        this.updateColor({ event, _state: false });
      }
    }

    //if (!(event.nativeEvent.absoluteX - this.state.left - 10 > 200)) {
  };

  onHandlerStateChange = e => {};

  render() {
    return (
      <TapGestureHandler onHandlerStateChange={this.onGestureEvent}>
        <View>
          <PanGestureHandler
            maxPointers={1}
            onGestureEvent={this.onGestureEvent}
            onHandlerStateChange={this.onGestureEvent}
          >
            <View
              style={{
                borderWidth: 0,
                borderColor: "#EE0",
                marginTop: 100
              }}
            >
              <View style={styles.view} ref="Marker" onLayout={this.onLayout}>
                <Image
                  style={[
                    styles.img,
                    {
                      height: 300,
                      width: 300
                    }
                  ]}
                  source={ICON.COLOR_WHEEL}
                />
                <Animated.View
                  style={[
                    styles.circle,
                    {
                      left: this.state.dragX,
                      top: this.state.dragY
                    }
                  ]}
                  ref={ref => {
                    this.Marker = ref;
                  }}
                  onLayout={event => {
                    /* const layout = event.nativeEvent.layout;
                    console.log("offsetX::" + this.state.offset.x);
                    console.log("x::", layout.x);
                    console.log("y::", layout.y); */
                  }}
                ></Animated.View>
              </View>
            </View>
          </PanGestureHandler>
        </View>
      </TapGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  coverResponder: {
    alignItems: "center",
    justifyContent: "center"
  },
  view: {
    /* borderWidth: 3,
        borderColor: "#a00", */
  },
  img: {
    alignSelf: "center"
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
    borderRadius: 10
  }
});
