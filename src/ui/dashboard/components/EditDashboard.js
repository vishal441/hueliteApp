import React, { Component } from "react";
import { ICON } from "../../common/constants/ImageConstant";
import { Icon, List, ListItem } from "native-base";
import ToggleSwitch from "toggle-switch-react-native";
import { View, StyleSheet, Text, BackHandler, TextInput } from "react-native";
import { RenameDialog } from "../../common/customComponents/RenameDialog";
import _ from "underscore";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DeleteDialog } from "../../common/customComponents/DeleteDialog";
import {
  ConfigAPI,
  UnpairAPI
} from "../../../backGroundServices/webApi/WebApi";
import { ShareDeviceDialog } from "../../common/customComponents/ShareDeviceDialog";

class EditDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteDialog: false,
      showShareDialog: false,
      deviceName: "",
      isRenameDlg: false
    };
  }

  componentDidMount() {
    let {
      selectedCard: { SSID }
    } = this.props;
    this.setState({ deviceName: SSID });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  onRenamingDevice = text => {
    this.setState({ deviceName: text });
  };

  onRenamePress = () => {
    let { deviceList, deviceListAction, selectedCard } = this.props,
      { deviceName } = this.state;
    let newList = deviceList.map(item => {
      let clonedItem = _.clone(item);
      if (item.Mac === selectedCard.Mac) {
        clonedItem.SSID = deviceName;
      }
      return clonedItem;
    });
    this.renameDlgHadler();
    setTimeout(function() {
      deviceListAction(newList);
    });
  };

  renameDlgHadler = () => {
    this.setState({ isRenameDlg: !this.state.isRenameDlg });
  };

  handleBackButton = () => {
    if (this.state.isRenameDlg) {
      this.renameDlgHadler();
      return true;
    } else return false;
  };

  onDelete = () => {
    console.log("onDelete");
    this.setState({ showDeleteDialog: true });
  };

  onDeleteDialogDeleteCallback = deviceListing1 => {
    let debug = true;
    {
      debug && console.log("onDeleteCallback");
    }
    this.setState({ showDeleteDialog: false });
    this.props.deviceListAction(deviceListing1);
  };

  onDeleteDialogCancelCallback = () => {
    console.log("onCancelCallback");
    this.setState({ showDeleteDialog: false });
  };

  onShareDevice = () => {
    console.log("share device");
    this.setState({ showShareDialog: true });
  };

  onShareDialogDoneCallback = () => {
    console.log("share done dialog");
    this.setState({ showShareDialog: false });
  };

  render() {
    let { deviceName, isRenameDlg } = this.state,
      { deviceListAction } = this.props;
    return (
      <View style={styles.container}>
        <List>
          <ListItem>
            <View style={{ width: "100%" }}>
              <TouchableOpacity
                onPress={() => {
                  console.log("text-1");
                }}
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row"
                  }}
                >
                  <TextInput
                    value="value"
                    style={{
                      flex: 1,
                      color: "#aaa",
                      fontSize: 18,
                      fontWeight: "bold"
                    }}
                    autoFocus={false}
                  />
                  <Icon
                    name="edit"
                    style={{
                      paddingVertical: 0,
                      color: "#aaa",
                      paddingRight: 10
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </ListItem>
          <ListItem>
            <View style={{ width: "100%" }}>
              <TouchableOpacity
                onPress={async () => {
                  console.log("save last state");
                  await ConfigAPI()
                    .then(response => {
                      console.log("then");
                    })
                    .catch(err => {
                      console.log("catch");
                    });
                }}
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row"
                  }}
                >
                  <Text style={{ color: "#aaa", flex: 1 }}>
                    Save Last State
                  </Text>

                  <ToggleSwitch
                    isOn={false}
                    onColor="green"
                    offColor="#aaa"
                    labelStyle={{ color: "black", fontWeight: "900" }}
                    size="small"
                    onToggle={isOn => console.log("changed to : ", isOn)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </ListItem>
          <ListItem>
            <View style={{ width: "100%" }}>
              <TouchableOpacity onPress={this.onShareDevice}>
                <Text style={{ color: "#aaa", fontWeight: "bold" }}>
                  Share Device
                </Text>
              </TouchableOpacity>
            </View>
          </ListItem>
          <ListItem>
            <View style={{ width: "100%" }}>
              <TouchableOpacity onPress={this.onDelete}>
                <Text
                  value="value"
                  style={{
                    color: "#f00",
                    flex: 1
                  }}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </ListItem>
        </List>
        <DeleteDialog
          isDialogVisile={this.state.showDeleteDialog}
          onDeleteCallback={this.onDeleteDialogDeleteCallback}
          onCancelCallback={this.onDeleteDialogCancelCallback}
          device={this.props.selectedCard}
          deviceListAction={deviceListAction}
        ></DeleteDialog>
        <ShareDeviceDialog
          isDialogVisile={this.state.showShareDialog}
          onDoneCallback={this.onShareDialogDoneCallback}
        ></ShareDeviceDialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderColor: "#eee",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    shadowColor: "#aaa",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5
  },
  img: {
    height: 20,
    width: 20
  }
});

export default EditDashboard;

{
  /* <RenameDialog
    isDialogVisile={isRenameDlg}
    dialogTitle={"Rename Device"}
    btnName={"Rename"}
    textTitle={"Enter Name"}
    value={deviceName}
    onChangeText={text => {
        this.onRenamingDevice(text)
    }}
    btnPress={this.onRenamePress}
/> */
}
