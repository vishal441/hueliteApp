import React from "react";
import { Text, Button, StyleSheet, Dimensions } from "react-native";
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogTitle
} from "react-native-popup-dialog";
import { View } from "native-base";

export const ShareDeviceDialog = props => {
  let dialogTitle = (
    <DialogTitle
      title="Share Device"
      style={{ backgroundColor: "#eeeeee00" }}
    />
  );

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
            Share the code with other party for completing sharing process, ask
            the user to enter the code in ---- section
          </Text>
          <Text
            style={{
              color: "#aaa",
              fontSize: 30,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 20
            }}
          >
            784576
          </Text>
        </View>
      </DialogContent>

      <DialogFooter style={styles.dialogFooter} bordered={false}>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            flexDirection: "row",
            paddingHorizontal: 30
          }}
        >
          <Button title={"Done"} onPress={props.onDoneCallback} />
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
