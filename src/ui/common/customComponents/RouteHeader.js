import {HeaderBackButton} from 'react-navigation-stack';
import React,{Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';




class RouteHeader extends Component{
    render(){
        return(
            <TouchableOpacity  style = {this.props.customStyle} onPress = {this.props.onPress}>
                 <View style = {styles.circle}>
                     <Text style={styles.text}>O</Text>
                 </View>
            </TouchableOpacity >
        )
    }
}

const styles = StyleSheet.create({
    circle:{
        width: 25,
        height:25,
        borderRadius: 50,
        borderColor: "grey",
        borderWidth: 1,
        backgroundColor: "gray",
    },
    text:{
        color:"white",
        fontSize: 17,
        fontWeight: "bold",
        width: "100%",
        height:"100%",
        textAlign: "center"
    }
});

export default RouteHeader;