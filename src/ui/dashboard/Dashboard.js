import React,{Component} from 'react';
import {ICON} from '../common/constants/ImageConstant';
import CardComponent from './components/CardComponent';
import {View, Text,FlatList, StyleSheet, Image, Button, ScrollView, TouchableOpacity} from 'react-native';
import RouteHeader from "../common/customComponents/RouteHeader";
import Slider from '../common/customComponents/SliderAnimation';
import {connect} from 'react-redux';
import {deviceListAction} from '../../redux/actions/DeviceListAction';


class Dashboard extends Component{
    constructor(props){
        super(props);
    }
   
    render(){
        let {deviceList, deviceListAction} = this.props;
        console.log("")
        console.log("DEVICE LIST: ",deviceList);
        console.log("");
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

mapStateToProps = (state) => {
    console.log("mapStateToProps : ",state);
    return{
        deviceList: state
    }
}

export default connect(mapStateToProps, {deviceListAction})(Dashboard);



