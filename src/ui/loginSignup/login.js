import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, Image, Platform } from "react-native"
import { insertUserInfo, deleteUserInfoTable } from "../../database/table/UserInfoTable"
import { createNewUser } from "../../util/AppUtil"
import { Form, Item, Input, Label } from "native-base"
import { loginAPI, signUpAPI } from "../../backGroundServices/webApi/WebApi"
import { Button } from "native-base"
import { ICON } from "../common/constants/ImageConstant"
import { TouchableOpacity } from "react-native-gesture-handler"

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

    onBack = () => {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.")
        props.navigation.replace("Welcome")
    }

    return (
        <View style={styles.container}>
            <View
                style={{
                    flex: 1.7,
                    width: "100%",
                    backgroundColor: "#aaa",
                    justifyContent: "center",
                }}>
                <TouchableOpacity onPress={onBack}>
                    <Image style={styles.logo} source={ICON.LOGO_W} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, width: "100%" }}>
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
                    <View style={styles.ButtonView}>
                        {login && (
                            <Button
                                style={[styles.LoginButton, styles.Button, {}]}
                                nPress={onLogin}>
                                <Text style={{ fontWeight: "bold", color: "#aaa" }}>Login</Text>
                            </Button>
                        )}
                        {login && (
                            <Button
                                style={[styles.SignupButton, styles.Button]}
                                onPress={() => {
                                    setLogin(false)
                                }}>
                                <Text style={{ fontWeight: "bold", color: "#aaa" }}>SignUp</Text>
                            </Button>
                        )}
                        {!login && (
                            <Button style={[styles.LoginButton, styles.Button]} onPress={onSignup}>
                                <Text style={{ fontWeight: "bold", color: "#aaa" }}>SignUp</Text>
                            </Button>
                        )}
                        {!login && (
                            <Button
                                style={[styles.SignupButton, styles.Button]}
                                onPress={() => {
                                    setLogin(true)
                                }}>
                                <Text style={{ fontWeight: "bold", color: "#aaa" }}>Login</Text>
                            </Button>
                        )}
                    </View>
                </Form>

                <View style={{ display: "none" }}>
                    <Text style={styles.goToDashboard} onPress={GoToDashboard}>
                        Skip to DashBoard
                    </Text>
                    <Text style={styles.pairDevice} onPress={GoToPairing}>
                        Pair New Device
                    </Text>
                </View>
                <View style={{ borderWidth: 0, alignItems: "center", paddingTop: 20 }}>
                    <Text style={{ fontWeight: "bold", color: "#aaa" }} onPress={GoToPairing}>
                        Skip
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    Button: {
        backgroundColor: "transparent",
        elevation: 0,
        justifyContent: "center",
    },
    container: {
        flex: 1,
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: { alignSelf: "center" },
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
        width: 80,
    },
    SignupButton: {
        width: 80,
    },
    ButtonView: {
        flexDirection: "row",
        width: "100%",
        marginTop: 10,
        paddingLeft: 40,
        paddingRight: 40,
        justifyContent: "space-between",
        /* borderWidth: 3, */
    },
})
