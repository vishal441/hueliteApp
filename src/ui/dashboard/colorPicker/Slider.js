import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Slider from "react-native-slider";
import LinearGradient from "react-native-linear-gradient";

export const CustomeSlider = props => {
  let { onSlidingComplete, selectedColor, gradColorArr } = props;
  return (
    <View style={[props.customStyle, styles.container]}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[gradColorArr[1], "#f2f2f205", "#ffffff00"]}
        style={styles.linearGradient}
      >
        <Slider
          value={props.value ? props.value : 0}
          minimumValue={0}
          maximumValue={100}
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
          minimumTrackTintColor="transparent"
          style={styles.slider}
          onValueChange={value => onSlidingComplete(Math.round(value))}
        ></Slider>
      </LinearGradient>
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flexDirection: "row",
    borderRadius: 15
  },
  track: {
    backgroundColor: "transparent",
    height: 25,
    borderRadius: 15
  },
  thumb: {
    width: 40,
    height: 40,
    backgroundColor: "#ffffff",
    opacity: 0.8,
    borderColor: "#fff",
    borderWidth: 3,
    borderRadius: 18
  },
  linearGradient: {
    borderRadius: 15,
    height: 30,
    justifyContent: "center",
    width: "100%",
    opacity: 1
    /* overflow: "visible" */
  }
});
