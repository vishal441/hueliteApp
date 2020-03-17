import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Button
} from "react-native";
import { withNavigationFocus } from "react-navigation";
import DeviceSettings from "react-native-device-settings";
import { connect } from "react-redux";
import { deviceListAction } from "../../redux/actions/DeviceListAction";
import { ICON } from "../common/constants/ImageConstant";
import CardComponent from "./components/CardComponent";
import RouteHeader from "../common/customComponents/RouteHeader";
import Slider from "../common/customComponents/SliderAnimation";
import NetInfo from "@react-native-community/netinfo";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidUpdate(){
  //     let {SSID} = this.props.navigation.getParam('otherParam', 'default value');
  //     console.log("Component Did update called::: ",SSID);
  //     if(SSID){
  //         NetInfo.fetch().then(info => {
  //             /**Condition needs to implement for redirection to wifi setting or pairing form screen */
  //                 if(info.type === 'wifi' && info.details.ssid === SSID){
  //                     // this.navigateToPairingForm();
  //                 }
  //                 else{
  //                     Alert.alert(
  //                         'Alert',
  //                         `You need to connect your device from wifi '${SSID}'.`,
  //                         [
  //                             {
  //                                 text: 'Cancel',
  //                                 style: 'cancel',
  //                             },
  //                             {
  //                                 text: 'OK',
  //                                 onPress: () => DeviceSettings.wifi()
  //                             }
  //                         ],
  //
  //                       );
  //                 }
  //           });
  //     }
  // }

  componentDidMount() {
    let { SSID } = this.props.navigation.getParam(
      "otherParam",
      "default value"
    );
    console.log("Component Did Mount called:::  ", SSID);
    if (SSID) {
      NetInfo.fetch().then(info => {
        /**Condition needs to implement for redirection to wifi setting or pairing form screen */
        if (info.type === "wifi" && info.details.ssid === SSID) {
          // this.navigateToPairingForm();
        } else {
          Alert.alert(
            "Alert",
            `You need to connect your device from wifi '${SSID}'.`,
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              {
                text: "OK",
                onPress: () => DeviceSettings.wifi()
              }
            ]
          );
        }
      });
    }
  }

  render() {
    let { deviceList, deviceListAction } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("MainPanel");
            }}
          >
            <Image style={styles.image} source={ICON.HamburgerIcon} />
          </TouchableOpacity>
          <RouteHeader
            onPress={() => {
              this.props.navigation.navigate("WifiSearchScreen");
            }}
          />
        </View>
        <View style={styles.body}>
          <Text style={styles.textinput}>Dashboard</Text>
          <FlatList
            data={deviceList}
            keyExtractor={(item, index) => item.SSID + index}
            extraData={deviceList}
            renderItem={({ item, index }) => {
              return (
                <Slider index={index}>
                  <CardComponent
                    device={item}
                    deviceList={deviceList}
                    deviceListAction={deviceListAction}
                    navigation={this.props.navigation}
                  />
                </Slider>
              );
            }}
          />
        </View>
        <View style={styles.warning}>
          <Text>this is deffault text</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingRight: 0,
    paddingLeft: 0,
    height: "100%",
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingHorizontal: 20,
    flex: 1
  },
  header: {
    height: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  body: {
    flex: 1,
    padding: 20,
    height: "95%"
  },
  textinput: {
    paddingTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10
  },
  image: {
    width: 30,
    height: 30
  },
  warning: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ededed",
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30
  }
});

const mapStateToProps = state => {
  return {
    deviceList: state
  };
};

export default withNavigationFocus(
  connect(mapStateToProps, { deviceListAction })(Dashboard)
);
