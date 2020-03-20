import React from "react"
import { StyleSheet, Text, View, Image } from "react-native"
import { ICON } from "../common/constants/ImageConstant"
import { Button } from "native-base"

const Welcome = props => {
    onPress = () => {
        props.navigation.replace("Login")
    }

    return (
        <View style={styles.container}>
            <View style={styles.view1}>
                <Image style={styles.logo} source={ICON.LOGO_W} />
            </View>
            <View style={styles.textView}>
                <View
                    style={{
                        flex: 6,
                        justifyContent: "center",
                        alignSelf: "center",
                    }}>
                    <Text style={styles.text1}>LET'S START WITH SIGHING UP</Text>
                    <Text style={styles.text2}>
                        Login/Signup Allows us to link your devices with other Services Like{" "}
                        <Text style={{ fontWeight: "bold" }}>Alexa</Text> ,{" "}
                        <Text style={{ fontWeight: "bold" }}>Google Assistant</Text>, also allows
                        the user's to control their devices from Anywhere
                    </Text>
                </View>
                <View style={{ flex: 1 }}></View>
                <Button style={styles.nextButton} onPress={onPress}>
                    <Text
                        style={{
                            alignSelf: "center",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: 20,
                        }}>
                        Lets's Go
                    </Text>
                </Button>
                <View style={{ flex: 1 }}></View>
            </View>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    view1: { width: "100%", backgroundColor: "#aaa", flex: 1.7, justifyContent: "center" },
    textView: {
        width: "100%",
        backgroundColor: "#fff",
        flex: 1,
        flexDirection: "column",
    },
    text1: { alignSelf: "center", fontWeight: "bold", color: "#999", fontSize: 15 },
    text2: {
        alignSelf: "center",
        color: "#aaa",
        paddingLeft: "15%",
        paddingRight: "15%",
        paddingTop: 10,
        textAlign: "center",
    },
    nextButton: {
        width: "30%",
        justifyContent: "center",
        color: "#aaa",
        borderRadius: 10,
        backgroundColor: "#aaa",
        alignSelf: "center",
    },
    logo: { alignSelf: "center" },
})
