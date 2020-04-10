import React from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default Timers => {
  let list = [{ Timer: true }, { Timer: true }, { Timer: false }];
  return (
    <View style={{ width: "100%", flexDirection: "row" }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={list}
        keyExtractor={(item, index) => "key" + index}
        renderItem={({ item, index }) => {
          if (item.Timer) return <Timer />;
          else return <AddTimer />;
        }}
      />
    </View>
  );
};

const AddTimer = props => {
  return (
    <View
      style={{
        width: 200,
        height: 120,
        margin: 10,
        backgroundColor: "#aaa",
        borderRadius: 10
      }}
    ></View>
  );
};

const Timer = props => {
  return (
    <View>
      <TouchableOpacity>
        <View
          style={{
            width: 200,
            height: 120,
            margin: 10
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1.5, y: 0 }}
            colors={["#0ff", "#f0f"]}
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 10,
              justifyContent: "center"
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 25,
                  marginBottom: 20
                }}
              >
                8:00 AM
              </Text>
              <Days></Days>
            </View>
          </LinearGradient>
        </View>
        <Text style={{ width: "100%", color: "grey", textAlign: "center" }}>
          timer
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Days = props => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Day day="M" active={true}></Day>
      <Day day="T"></Day>
      <Day day="W" active={true}></Day>
      <Day day="T"></Day>
      <Day day="F" active={true}></Day>
      <Day day="S" active={true}></Day>
      <Day day="S" active={true}></Day>
    </View>
  );
};

const Day = props => {
  return (
    <View
      style={{
        width: 22,
        height: 22,
        backgroundColor: props.active ? "#33FF7A" : "#FF6100",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        marginHorizontal: 3
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
        {props.day}
      </Text>
    </View>
  );
};
