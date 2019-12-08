import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Image, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const PanelItem = (props) => {
    let { panelName, panelTxtStyle, containerStyle, icon, imgStyle, gradColorArr, onPanelPress } = props;
    return (
        <TouchableWithoutFeedback onPress={() => onPanelPress ? onPanelPress() : {} }>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={gradColorArr}
                style={[styles.panelContainer, containerStyle]}>
                <Image source={icon} style={[styles.img, imgStyle]} />
                <Text style={[styles.txt, panelTxtStyle]}>{panelName}</Text>
            </LinearGradient>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    panelContainer: {
        // backgroundColor: "#fff",
        width: '45%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 4,
        marginVertical: 15,
       // marginHorizontal: 12
    },
    img: {
        height: 25,
        width: 25
    },
    txt: {
        fontSize: 22,
        fontWeight: '500',
        color: '#000',
        marginTop: 25
    }
})