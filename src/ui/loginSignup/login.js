import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, Platform } from "react-native"
import { insertUserInfo, deleteUserInfoTable } from "../../database/table/UserInfoTable"
import { createNewUser } from "../../util/AppUtil"
import { Form, Item, Input, Label } from "native-base"
import { loginAPI, signUpAPI } from "../../backGroundServices/webApi/WebApi"

///import { useNetInfo } from "@react-native-community/netinfo"

const Login = props => {
    ///const netInfo = useNetInfo()
    const [usernameStyle, setUsernameStyle] = useState({ color: "#aaa" })
    const [passStyle, setPassStyle] = useState({ color: "#aaa" })
    const [login, setLogin] = useState(true)
    let _username = ""
    let _pass = ""

    //NOTE: -->Navigate to Dashboard by replacing the current Stack Position
    GoToDashboard = () => {
        props.navigation.replace("Dashboard")
    }

    GoToPairing = () => {
        /*  if (Platform.OS === "ios") { 
            props.navigation.replace("PairIos1")
        } else {
            props.navigation.replace("WifiScreen")
        } */
        props.navigation.replace("PairIos1")
    }

    useEffect(() => {
        let User_Id = "12345678"
        let userInfo = [
            createNewUser({
                User_Id,
            }),
        ]

        return () => {
            //console.log("Inserting User Data")
            //insertUserInfo(userInfo)
            //deleteUserInfoTable()
        }
    })

    onLogin = async () => {
        await loginAPI(_username, _pass)
            .then(response => {
                console.log(response.data)
                setPassStyle({ color: "#0f0" })
                setUsernameStyle({ color: "#0f0" })
            })
            .catch(err => {
                let { message } = err
                console.log(err.message)
                if (message == "Invalid Username") {
                    setPassStyle({ color: "#aaa" })
                    setUsernameStyle({ color: "red" })
                } else if (message == "Wrong Password") {
                    console.log("<><><>")
                    setUsernameStyle({ color: "#aaa" })
                    setPassStyle({ color: "red" })
                }
            })
    }

    onSignup = async () => {
        console.log("Signup")
        await signUpAPI(_username, _pass)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                let { message } = err
                console.log(err.message)
                if (message == "Username Required") {
                    console.log("Username Required")
                } else if (message == "Username Required") {
                    console.log("Password Required")
                }
            })
    }

    return (
        <View style={styles.container}>
            {/* {netInfo.type === "wifi" && <Text>{netInfo.details.ipAddress}</Text>} */}
            <Form style={{ width: "100%" }}>
                <Item floatingLabel>
                    <Label>Username</Label>
                    <Input
                        style={usernameStyle}
                        onChangeText={text => {
                            console.log(text)
                            _username = text
                        }}
                    />
                </Item>
                <Item floatingLabel>
                    <Label>Password</Label>
                    <Input
                        style={passStyle}
                        onChangeText={text => {
                            console.log(text)
                            _pass = text
                        }}
                    />
                </Item>
            </Form>
            <View style={styles.ButtonView}>
                {login && (
                    <View style={styles.LoginButton} nPress={onLogin}>
                        <Text>Login</Text>
                    </View>
                )}
                {login && (
                    <View
                        style={styles.SignupButton}
                        onPress={() => {
                            setLogin(false)
                        }}>
                        <Text>SignUp</Text>
                    </View>
                )}
                {!login && (
                    <View style={styles.LoginButton} onPress={onSignup}>
                        <Text>SignUp</Text>
                    </View>
                )}
                {!login && (
                    <View
                        style={styles.SignupButton}
                        onPress={() => {
                            setLogin(true)
                        }}>
                        <Text>Login</Text>
                    </View>
                )}
            </View>
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
    LoginButton: {
        alignSelf: "flex-start",
        height: 40,
        justifyContent: "center",
        width: 80,
    },
    SignupButton: {
        position: "absolute",
        alignSelf: "flex-end",
        paddingRight: 40,
        paddingLeft: 40,
        height: 40,
        justifyContent: "center",
    },
    ButtonView: {
        flexDirection: "column",
        width: "100%",
        marginTop: 50,
        paddingLeft: 40,
        paddingRight: 40,
    },
})
