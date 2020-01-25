import React, {Component} from 'react';
import {View, Text,FlatList, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import DeviceSettings from 'react-native-device-settings';
import {connect} from 'react-redux';
import {deviceListAction} from '../../redux/actions/DeviceListAction';
import {ICON} from '../common/constants/ImageConstant';
import CardComponent from './components/CardComponent';
import RouteHeader from "../common/customComponents/RouteHeader";
import Slider from '../common/customComponents/SliderAnimation';
import NetInfo from "@react-native-community/netinfo";


class Dashboard extends Component{
    constructor(props){
        super(props);
    }

    // componentDidUpdate(){
    //     let {SSID} = this.props.navigation.getParam('otherParam', 'default value');
    //     console.log("Component Did update called::: ",SSID);
    //     if(SSID){
    //         NetInfo.fetch().then(info => {
    //             /**Condition needs to implement for redirection to wifi setting or pairing form screen */
    //                 if(info.type === 'wifi' && info.details.ssid === SSID){
    //                     // this.navigateToPairingForm();
    //                 }
    //                 else{
    //                     Alert.alert(
    //                         'Alert',
    //                         `You need to connect your device from wifi '${SSID}'.`,
    //                         [
    //                             {
    //                                 text: 'Cancel',
    //                                 style: 'cancel',
    //                             },
    //                             {
    //                                 text: 'OK',
    //                                 onPress: () => DeviceSettings.wifi()
    //                             }
    //                         ],
    //
    //                       );
    //                 }
    //           });
    //     }
    // }

    componentDidMount(){
        let {SSID} = this.props.navigation.getParam('otherParam', 'default value');
        console.log("Component Did Mount called:::  ",SSID);
        if(SSID){
            NetInfo.fetch().then(info => {
                /**Condition needs to implement for redirection to wifi setting or pairing form screen */
                    if(info.type === 'wifi' && info.details.ssid === SSID){
                        // this.navigateToPairingForm();
                    }
                    else{
                        Alert.alert(
                            'Alert',
                            `You need to connect your device from wifi '${SSID}'.`,
                            [
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
                    }
              });
        }
    }

    render(){
        let {deviceList, deviceListAction} = this.props;
        return(
         <View style={styles.container}>
             <View style={styles.header}>
                 <TouchableOpacity onPress={() => { this.props.navigation.navigate("MainPanel")}}>
                    <Image style={styles.image} source={ICON.HamburgerIcon}/>
                 </TouchableOpacity>
                 <RouteHeader onPress={()=>{this.props.navigation.navigate('WifiSearchScreen')}}/>
             </View>
             <View style={styles.body}>
                <Text style={styles.textinput}>Dashboard</Text>
                <FlatList data={deviceList} keyExtractor={(item, index) => item.SSID+index}
                        extraData={deviceList}
                    renderItem={({item, index})=> {
                        return(
                        <Slider index = {index}>
                            <CardComponent data = {item}
                                deviceList = {deviceList}
                                deviceListAction = {deviceListAction}
                                navigation = {this.props.navigation}/>
                        </Slider>)}}/>
             </View>
         </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        paddingTop: 30,
        paddingHorizontal: 20
    },
    header:{
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    body: {
        padding: 10,
        height: '95%'
    },
    textinput:{
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 10
    },
    image:{
        width: 30,
        height: 30
    }
})

const mapStateToProps = (state) => {
    return{
        deviceList: state
    }
}

export default withNavigationFocus(connect(mapStateToProps, {deviceListAction})(Dashboard));



