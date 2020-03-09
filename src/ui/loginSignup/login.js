import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Login = props => {
  GoToDashboard = () => {
    props.navigation.replace("Dashboard");
  };
  return (
    <View style={styles.container}>
      <Text>login page</Text>
      <Text>SignUP</Text>
      <Text style={styles.goToDashboard} onPress={GoToDashboard}>
        Skip to DashBoard
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  goToDashboard: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 50
  }
});
