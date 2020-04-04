import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, Image, Platform } from "react-native"
import { getUserInfoFromDb } from "../../database/table/UserInfoTable"
import { insertUserInfo } from "../../database/table/UserInfoTable"
import { createNewUser } from "../../util/AppUtil"
import { Form, Item, Input, Label } from "native-base"
import { loginAPI, signUpAPI } from "../../backGroundServices/webApi/WebApi"
import { Button } from "native-base"
import { ICON } from "../common/constants/ImageConstant"
import { TouchableOpacity } from "react-native-gesture-handler"

///import { useNetInfo } from "@react-native-community/netinfo"

//TODO: create temp userID upon skip and save to DB
//TODO: Google login
//TODO: FB login

const Login = props => {
    const [usernameStyle, setUsernameStyle] = useState({ color: "#aaa" })
    const [passStyle, setPassStyle] = useState({ color: "#aaa" })
    const [login, setLogin] = useState(true)
    const [_username, setUsername] = useState()
    const [_pass, setPass] = useState()
    const [_RePass, setRePass] = useState()

    /*-------------------------------------------------------------------------------
     * Lifecycle Functions
     *-------------------------------------------------------------------------------*/
    useEffect(() => {
        return () => {}
    })

    /*-------------------------------------------------------------------------------
     * Navigation Functions
     *-------------------------------------------------------------------------------*/
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

    onBack = () => {
        //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.")
        //props.navigation.replace("Welcome")
    }

    /*-------------------------------------------------------------------------------
     * Helper Functions
     *-------------------------------------------------------------------------------*/
    onLogin = async () => {
        let debug = false
        if (_username != "" && _pass != "") {
            await loginAPI(_username, _pass)
                .then(async response => {
                    {
                        debug && console.log(response.data)
                    }
                    setPassStyle({ color: "#0f0" })
                    setUsernameStyle({ color: "#0f0" })
                    processLogin(response.data)
                })
                .catch(err => {
                    {
                        debug && console.log(err)
                    }
                    if (err == "Invalid Username") {
                        setPassStyle({ color: "#aaa" })
                        setUsernameStyle({ color: "red" })
                    } else if (err == "Wrong Password") {
                        setUsernameStyle({ color: "#aaa" })
                        setPassStyle({ color: "red" })
                    }
                })
        } else {
            {
                debug && console.log("enter username and pass")
            }
        }
    }

    processLogin = _props => {
        console.log("<Login.processLogin::>" + JSON.stringify(_props))
        //TODO: fetch previous devices data from server
        //TODO: ask user to restore devices data if any
        setTimeout(async () => {
            GoToPairing()
        }, 500)
    }

    onSignup = async () => {
        let debug = true
        if (_username != "" && _pass != "") {
            if (_pass == _RePass) {
                setPassStyle({ color: "#0f0" })
                setUsernameStyle({ color: "#0f0" })
                await signUpAPI(_username, _pass)
                    .then(async response => {
                        {
                            debug && console.log("<onSignup.then.MSG::>" + response.data.message)
                        }
                        addNewUser(response.data.message)
                    })
                    .catch(err => {
                        {
                            debug && console.log("<onSignup.catch.ERR::>" + err)
                        }
                        if (err == "Username Required") {
                            {
                                debug &&
                                    console.log("<onSignup.catch.ERR::>" + "-->Username Required")
                            }
                        } else if (err == "Username Required") {
                            {
                                debug &&
                                    console.log("<onSignup.catch.ERR::>" + "-->Password Required")
                            }
                        } else if (err == "Username taken") {
                            {
                                debug && console.log("<onSignup.catch.ERR::>" + "-->Username taken")
                            }
                            setUsernameStyle({ color: "#f00" })
                        }
                    })
            } else {
                setPassStyle({ color: "#f00" })
            }
        }
    }

    addNewUser = async _props => {
        let debug = true
        {
            debug && console.log("<addNewUser>" + _props)
        }
        //-->create user dataset
        const userInfo = [
            {
                User_Id: _username,
                Email_Id: "email1",
                Phone_Version: "",
                Device_Id: "",
            },
        ]
        //-->save user data to local DB
        insertUserInfo(userInfo)
        //-->navigate to pairing after timeout
        setTimeout(async () => {
            let userRes = await getUserInfoFromDb()
            if (userRes) {
                //-->data saved successfully
                console.log("User : ", userRes)
                GoToPairing()
            } else {
                //-->data not saved
                console.log("No User")
            }
        }, 500)
    }

    return (
        <View style={styles.container}>
            <View
                style={{
                    flex: 1.5,
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
                            /* autoFocus={true} */
                            style={usernameStyle}
                            onChangeText={text => {
                                setUsername(text)
                            }}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                            style={passStyle}
                            onChangeText={text => {
                                setPass(text)
                            }}
                        />
                    </Item>
                    {!login && (
                        <Item floatingLabel>
                            <Label>Re-Type Password</Label>
                            <Input
                                style={passStyle}
                                onChangeText={text => {
                                    setRePass(text)
                                }}
                            />
                        </Item>
                    )}
                    <View style={[styles.ButtonView]}>
                        {login && (
                            <Button
                                style={[styles.LoginButton, styles.Button, {}]}
                                onPress={onLogin}>
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
                    <Button
                        style={[styles.Button, { /* borderWidth: 1, */ width: "30%" }]}
                        onPress={GoToPairing}>
                        <Text style={{ fontWeight: "bold", color: "#aaa" }}>Skip</Text>
                    </Button>
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
