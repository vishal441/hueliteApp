import React, { useState } from "react";
import { Text, Button, StyleSheet, Dimensions } from "react-native";
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogTitle
} from "react-native-popup-dialog";
import { View } from "native-base";
import { UnpairAPI } from "../../../backGroundServices/webApi/WebApi";
import { getQuery } from "../../../database/DbAction";
import { DeviceSchema } from "../../../database/Schema";
import {
  deleteDevice,
  getDeviceListFromDb
} from "../../../database/table/DeviceTable";

export const DeleteDialog = props => {
  onDelete = () => {
    let debug = true;
    {
      debug && console.log("onDeleteCallback");
    }
    let IPAddress = "192.168.4.1";
    UnpairAPI(IPAddress)
      .then(response => {
        {
          debug && console.log(response);
        }
      })
      .catch(err => {
        {
          debug && console.log(err);
        }
        if (err.includes("not possible")) {
          {
            debug && console.log("Delete not possible");
          }
          setDeletemsg(deletemsg2);
          setDeleteHeading(deleteHeading2);
          setDeleteButton(true);
        }
      });
  };
  onCancel = () => {
    setDeletemsg(deletemsg1);
    setDeleteHeading(deleteHeading1);
    setDeleteButton(false);
    props.onCancelCallback();
  };
  performDelete = async () => {
    ///TODO: remove this comment
    setDeletemsg(deletemsg1);
    setDeleteHeading(deleteHeading1);
    setDeleteButton(false);
    let dbRes = await getDeviceListFromDb(),
      deviceListing = dbRes.data;
    console.log("<<<<" + JSON.stringify(deviceListing));
    deleteDevice((filter = 'Mac == "' + props.device.Mac + '"'), callback => {
      console.log("device deleted");
    });
    let dbRes1 = await getDeviceListFromDb(),
      deviceListing1 = dbRes1.data;
    console.log(">>>>" + JSON.stringify(deviceListing1));
    props.onDeleteCallback(deviceListing1);
  };
  let dialogTitle = (
      <DialogTitle
        title="Delete Device"
        style={{ backgroundColor: "#eeeeee00" }}
      />
    ),
    deleteButton1 = <Button title={"Delete"} onPress={onDelete} />,
    deleteButton2 = <Button title={"Okay.."} onPress={performDelete} />,
    deletemsg1 =
      "This Will Unpair the device from the Network and reset it to factory settings",
    deletemsg2 =
      "However You can still delete the device. Other users will still be able to interact with the device. You can Still Reset/Unpair the device Manully. Follow the steps from Troubleshoot guide...",
    deleteHeading1 = "Are you sure you want to delete the device",
    deleteHeading2 =
      "Unpairing is only possible when you r connected to Home Network",
    deleteButtonText1 = "Delete",
    deleteButtonText2 = "Okay..";

  const [deletemsg, setDeletemsg] = useState(deletemsg1);
  const [deleteHeading, setDeleteHeading] = useState(deleteHeading1);
  const [deleteButton, setDeleteButton] = useState(false);

  return (
    <Dialog
      visible={props.isDialogVisile}
      dialogStyle={styles.dialogStyle}
      dialogTitle={dialogTitle}
    >
      <DialogContent style={{ flex: 1 }}>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flex: 1
          }}
        >
          <Text
            style={{
              color: "#aaa",
              fontWeight: "bold",
              fontSize: 14,
              textAlign: "center"
            }}
          >
            {deleteHeading}
          </Text>
          <Text
            style={{
              color: "#aaa",
              fontSize: 14,
              textAlign: "center",
              marginTop: 20
            }}
          >
            {deletemsg}
          </Text>
        </View>
      </DialogContent>

      <DialogFooter style={styles.dialogFooter} bordered={false}>
        <View
          style={{
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: 30
          }}
        >
          <Button title={"Cancel"} onPress={onCancel} />
          {!deleteButton && deleteButton1}
          {deleteButton && deleteButton2}
        </View>
      </DialogFooter>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  dialogStyle: {
    height: 250,
    width: "90%",
    flexDirection: "column"
  },
  dialogFooter: {
    justifyContent: "center",
    position: "relative",
    bottom: 10
  }
});
