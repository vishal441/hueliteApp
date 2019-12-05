import React,{Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ICON} from '../common/constants/ImageConstant';
import NetInfo from "@react-native-community/netinfo";
import DeviceSettings from 'react-native-device-settings';

class AddDevice extends Component{
    constructor(props){
        super(props);
        this.state = {
            deviceHotspot: '', 
            password: '12345678'
        }
    }

    onDeviceClick = () => {
        NetInfo.fetch().then(info => {
            console.log("connection state: ", info);
            this.setState({deviceHotspot: info.details.ssid});
            if(info.type === 'wifi'){
                /**Condition needs to implement for redirection to wifi setting or pairing form screen */
                    //this.navigateToPairingForm();
                    this.showPopup();
            }
            else{
                this.showPopup();
            }
          });
    }

    navigateToPairingForm = () => {
        this.props.navigation.navigate('PairingForm', {
            otherParam: {wifiList: this.props.deviceList, name: this.props.name}
        })
    };

    showPopup = () => {
        let {deviceHotspot, password} = this.state;
        Alert.alert(
            'Alert',
            `You need to connect your device from wifi '${deviceHotspot}' with password ${password}.`,
            [
                {
                    text: 'Pairing Form',
                    onPress: () => this.navigateToPairingForm()
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK', 
                    onPress: () => DeviceSettings.wifi()
                }
            ],
            
          );
    };

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