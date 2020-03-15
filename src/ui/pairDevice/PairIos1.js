import React, { useState, useEffect, Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import NetInfo1 from "../splash/NetInfoListner";
import DeviceSettings from "react-native-device-settings";
import axios from "axios";
import { Spinner } from "native-base";

PairIos1 = props => {
  const [Show, setShow] = useState(true);
  const [wifiList, setWifiList] = useState([]);
  const [selectedWiFi, setSelectedWiFi] = useState("New Device");

  useEffect(() => {
    console.log("PairIOS1 USE EFFECT");
    var count = 0;
    statusInterval = setInterval(async () => {
      await axios
        .get("http://192.168.4.1/status", { timeout: 500 })
        .then(function(response) {
          // handle success
          count = count + 1;
          console.log("--" + count);
          //setShow(true)
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          //setShow(false)
        })
        .finally(function() {
          // always executed
        });
    }, 3000);
    return () => {
      console.log("PairIOS1 USE EFFECT_Cleanup");
      clearInterval(statusInterval);
    };
  });

  onSettings = () => {
    DeviceSettings.wifi();
    ///props.navigation.navigate("PairIos2")
  };

  Next = () => {
    let wifiName = {};
    wifiName["SSID"] = selectedWiFi;
    wifiName["BSSID"] = selectedWiFi;
    props.navigation.replace("PairingForm", {
      otherParam: { wifiList: wifiList, selectedDevice: wifiName }
    });
  };

  netFunction = info => {
    if (info.type == "wifi") {
      console.log("--PAIRIOS1::conneccted with ip " + info.details.ipAddress);
      if (info.details.ipAddress == "192.168.4.3") {
        console.log("FOUND 192.168.4.1 Proceed with pairing");
        if (!this.state.startPairing) this.setState({ startPairing: true });
      }
    } else {
      console.log("<<<not connected to wifi>>>");
      if (this.state.startPairing) this.setState({ startPairing: false });
    }
  };

  /* render() { */
  return (
    <View style={styles.container}>
      {/* <NetInfo1 onNetChange={this.netFunction} /> */}
      <Text>Ios pair screen</Text>

      <Text style={styles.next} onPress={this.onSettings}>
        WiFi-Settings
      </Text>

      {Show ? (
        <View style={styles.spinnerView}>
          <Text onPress={this.Next}>Pair</Text>
        </View>
      ) : (
        <View style={styles.spinnerView}>
          <Spinner color="red" style={{ height: 10, width: 10 }} />
        </View>
      )}
    </View>
  );
  //}
};

export default PairIos1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  next: {
    position: "absolute",
    bottom: 0,
    left: 0,
    margin: 50
  },
  pair: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 50
  },
  spinnerView: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 50
  }
});
