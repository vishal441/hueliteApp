import React from "react"
import { StyleSheet, Text, View } from "react-native"

const Welcome = props => {
    onPress = () => {
        props.navigation.replace("Login")
    }

    return (
        <View style={styles.container}>
            <Text>Welcome Page</Text>
            <Text style={styles.next} onPress={onPress}>
                Login
            </Text>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    next: {
        position: "absolute",
        bottom: 0,
        right: 0,
        margin: 50,
    },
})
