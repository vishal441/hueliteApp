import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { ICON } from "../../../common/constants/ImageConstant";
import { modesApi } from "../../../../backGroundServices/webApi/WebApi";
import Timers from "./Timers";

const SCENCE_LIST = [
  { name: "Rainbow", src: ICON.RAINBOW },
  { name: "Peace", src: ICON.PEACE },
  { name: "Breathing", src: ICON.BREATHING },
  { name: "Medication", src: ICON.MEDICATION }
];
const MODE_LIST = [
  { name: "Dinner", src: ICON.DINNER },
  { name: "Movie", src: ICON.MOVIE },
  { name: "Party", src: ICON.PARTY },
  { name: "Study", src: ICON.STUDY }
];
const SHADES_LIST = [
  { name: "Cloudy", src: ICON.CLOUDY },
  { name: "Sunny", src: ICON.SUNNY },
  { name: "Rainy", src: ICON.RAINY },
  { name: "Snowy", src: ICON.SNOWY }
];

class FlatImage extends Component {
  startmode = () => {
    let IP = "192.168.4.1",
      msg =
        '{"mode":"rainbow","count":6,"color":["#ff0000","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"],"duration":[2000,2000,2000,2000,2000,2000]}';
    modesApi(IP, msg, cbRes => {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>" + cbRes);
    });
  };

  render() {
    let { image, name } = this.props;
    return (
      <View>
        {this.props.row === "row-1" && (
          <TouchableOpacity onPress={this.startmode}>
            <View style={styles.imageWrapper}>
              <Image
                style={[styles.image, { width: 150, height: 110 }]}
                source={image}
              />
              <Text
                style={{ width: "100%", color: "grey", textAlign: "center" }}
              >
                {name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {this.props.row === "row-2" && (
          <TouchableOpacity>
            <View style={styles.imageWrapper}>
              <Image
                style={[styles.image, { width: 120, height: 80 }]}
                source={image}
              />
              <Text
                style={{ width: "100%", color: "grey", textAlign: "center" }}
              >
                {name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {this.props.row === "row-3" && (
          <TouchableOpacity>
            <View style={styles.imageWrapper}>
              <Image style={styles.image} source={image} />
              <Text
                style={{ width: "100%", color: "grey", textAlign: "center" }}
              >
                {name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

class VerticalImageList extends Component {
  render() {
    let { mode, list } = this.props;
    return (
      <View style={{ width: "100%" }}>
        <Text style={styles.modesTxt}>{mode}</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={list}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item, index }) => {
            return (
              <FlatImage
                row={this.props.row}
                image={item.src}
                name={item.name}
              />
            );
          }}
        />
      </View>
    );
  }
}

class ModesPresets extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={{ height: "90%", alignItems: "center" }}>
            <View
              style={{
                //backgroundColor: "#0ff",
                width: "100%",
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                style={{
                  //backgroundColor: "#f00",
                  marginLeft: 10,
                  alignSelf: "center",
                  position: "absolute",
                  left: 10,
                  height: 40,
                  width: 100,
                  justifyContent: "center"
                }}
                onPress={() => this.props.deviceNavigation("color-RGB")}
              >
                <Text>{"<< Go Back"}</Text>
              </TouchableOpacity>
              <Text style={styles.txt}>Select Modes</Text>
            </View>
            {/* <View style={styles.underline} /> */}
            <View style={styles.modes}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <VerticalImageList
                  row="row-1"
                  mode={"Scenes"}
                  list={SCENCE_LIST}
                />
                <Timers></Timers>
                <VerticalImageList
                  row="row-3"
                  mode={"Modes"}
                  list={MODE_LIST}
                />
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    //backgroundColor: "#9DD6EB",
  },
  body: {
    height: "100%"
  },
  circle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "red",
    margin: 10
  },
  txt: {
    color: "grey",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  imageWrapper: {
    padding: 10
  },
  modesTxt: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "5%",
    paddingLeft: "5%"
  },
  modes: {
    height: "100%",
    width: "100%"
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 6
  },
  underline: {
    borderBottomColor: "#F2F2F2",
    width: "100%",
    borderBottomWidth: 1
  }
});

export default ModesPresets;
