import React,{Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ICON} from '../common/constants/ImageConstant';


class AddDevice extends Component{
    constructor(props){
        super(props);
    }

    onDeviceClick = () => {
        this.props.navigation.navigate('PairingForm', {
            otherParam: {wifiList: this.props.deviceList, name: this.props.name}
        })
    }

    render(){
        return (
            <TouchableOpacity onPress = {this.onDeviceClick}>
                <LinearGradient colors={['#2d90e8', '#3aafda', '#8ac5eb']} style={styles.wifiList}>
                    <View style = {styles.imageContainer}>
                        <Image style = {styles.image} source = {ICON.BULB}/>
                    </View>
                    <View style = {styles.textContatiner}>
                        <Text style={styles.name}>{this.props.name}</Text>
                        <Text style={styles.unpaired}>Unpaired</Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    imageContainer:{
        width: "30%",
        height: "30%",
        alignContent: "center"
    },
    image:{
        width: 60,
        height: 60
    },
    textContatiner:{
        width:"70%", 
        textAlign: "right"
    },
    wifiList:{
        borderStyle: "solid",
        borderWidth: 2,
        marginTop: 10,
        borderRadius: 10,
        padding: 20,
        textAlign: "center",
        marginLeft: 20,
        marginRight: 20, 
        marginBottom: 10,
        backgroundColor: "#2d90e8",
        borderColor: "#2d90e8",
        flexDirection: "row"
    },
    name:{
        color: "white",
        fontSize: 16,
        textAlign: "right"  
    },
    unpaired:{
        color: "#FFFFFF",
        fontSize: 12,
        textAlign: "right"     
    }
})

export default AddDevice;