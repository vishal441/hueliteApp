import React, { useEffect } from "react"
import { StyleSheet, Text, View, Platform } from "react-native"
import { insertUserInfo, deleteUserInfoTable } from "../../database/table/UserInfoTable"
import { createNewUser } from "../../util/AppUtil"
import { Form, Item, Input, Label } from "native-base"

///import { useNetInfo } from "@react-native-community/netinfo"

const Login = props => {
    ///const netInfo = useNetInfo()
    let _username = "*"
    let _pass = "*"

    //NOTE: -->Navigate to Dashboard by replacing the current Stack Position
    GoToDashboard = () => {
        props.navigation.replace("Dashboard")
    }

    GoToPairing = () => {
        if (Platform.OS === "ios") {
            props.navigation.replace("PairIos1")
        } else {
            props.navigation.replace("WifiScreen")
        }
    }

    useEffect(() => {
        let User_Id = "12345678"
        let userInfo = [
            createNewUser({
                User_Id,
            }),
        ]

        return () => {
            console.log("Inserting User Data")
            insertUserInfo(userInfo)
            //deleteUserInfoTable()
        }
    })

    onLogin = () => {
        console.log("----" + _username)
    }

    return (
        <View style={styles.container}>
            {/* {netInfo.type === "wifi" && <Text>{netInfo.details.ipAddress}</Text>} */}
            <Form style={{ width: "100%" }}>
                <Item floatingLabel>
                    <Label>Username</Label>
                    <Input
                        onChangeText={text => {
                            console.log(text)
                            _username = text
                        }}
                    />
                </Item>
                <Item floatingLabel>
                    <Label>Password</Label>
                    <Input
                        onChangeText={text => {
                            console.log(text)
                            _pass = text
                        }}
                    />
                </Item>
            </Form>
            <Text onPress={onLogin}>Login</Text>
            <Text style={styles.goToDashboard} onPress={GoToDashboard}>
                Skip to DashBoard
            </Text>
            <Text style={styles.pairDevice} onPress={GoToPairing}>
                Pair New Device
            </Text>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    goToDashboard: {
        position: "absolute",
        bottom: 0,
        right: 0,
        margin: 50,
    },
    pairDevice: {
        position: "absolute",
        bottom: 0,
        left: 0,
        margin: 50,
    },
})
