import React,{Component} from 'react';
import {ICON} from '../common/constants/ImageConstant';
import CardComponent from './components/CardComponent';
import {View, Text,FlatList, StyleSheet, Image, Button, ScrollView} from 'react-native';
import RouteHeader from "../common/customComponents/RouteHeader";
import Slider from '../common/customComponents/SliderAnimation';

const dummyData = [
    {
        Type : "Device",
        Mac : "DC:4F:22:5F:65:76",
        Host_Name : "",
        SSID : "Homelink1",
        IP_Address : "192.168.1.70",
        Last_WS_Msg_Sent_Time_Stamp : 0,
        Last_WS_Msg_Received_Time_Stam : 0,
        Last_Heart_Time_Stamp : 0,
        Connected : false,
        Last_State : "",
        Dashoard_Type : "",
    },
    {
        Type : "Device",
        Mac : "2C:F4:32:57:74:00",
        Host_Name : "",
        SSID : "Homelink1",
        IP_Address : "192.168.1.71",
        Last_WS_Msg_Sent_Time_Stamp : 0,
        Last_WS_Msg_Received_Time_Stam : 0,
        Last_Heart_Time_Stamp : 0,
        Connected : false,
        Last_State : "",
        Dashoard_Type : "",
    },
    {
        Type : "Device",
        Mac : "DC:4F:22:5F:63:EC",
        Host_Name : "",
        SSID : "Homelink1",
        IP_Address : "192.168.1.72",
        Last_WS_Msg_Sent_Time_Stamp : 0,
        Last_WS_Msg_Received_Time_Stam : 0,
        Last_Heart_Time_Stamp : 0,
        Connected : false,
        Last_State : "",
        Dashoard_Type : "",
    }
]

class Dashboard extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        let self = this;
    }
    render(){
        return(
         <View style={styles.container}>
             <View style={styles.header}>
                 <Image style={styles.image} source={ICON.HamburgerIcon}/>
                 <RouteHeader onPress={()=>{this.props.navigation.navigate('ColorPickerContainer')}}/>
             </View>
             <View style={styles.body}>
                <Text style={styles.textinput}>Dashboard</Text>
                <FlatList data={dummyData} keyExtractor={(item, index) => item.SSID+index}
                    renderItem={({item, index})=> {
                        return(
                        <Slider index = {index} name = {item.SSID}>
                            <CardComponent data = {item}/>
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

export default Dashboard;



