import React,{Component} from 'react';
import {View, Text,FlatList, StyleSheet} from 'react-native';
import Pulse from "react-native-pulse";
import {getAvailableDevice} from './WifiScan';
import {ICON} from '../common/constants/ImageConstant';
import {connect} from 'react-redux';
import {deviceListAction} from '../../redux/actions/DeviceListAction';

class WifiSearchScreen extends Component {
    constructor(props){
        super(props);
        this.state={startSearching: false, deviceList: []};
        this.getWifiList = this.getWifiList.bind(this); 
        this.redirectToPage = this.redirectToPage.bind(this);
    }
    redirectToPage(screen, data){
            this.props.navigation.replace(screen, {deviceList: data});
            // this.props.navigation.navigate();
    }
    getWifiList(){
         getAvailableDevice(cbRes =>{
            let deviceList = cbRes,
                self = this,
                hueDeviceList = deviceList.length && deviceList.filter((item) => item.SSID.includes("HUE"));            
                setTimeout(function(){
                        if(hueDeviceList.length){
                            self.props.deviceListAction(hueDeviceList);
                            self.redirectToPage("AddDevice");
                        }
                        else{
                            self.redirectToPage("EmptySerachScreen", []);
                        }
                },3000);
        });
    }
     componentDidMount(){
            this.getWifiList();
    }
    
    render(){
        return(
            <View style={styles.container}>
                <View style = {styles.imageContainer}>
                    <Pulse 
                        style={styles.container1} 
                        color='white' 
                        numPulses={4} 
                        diameter={400} 
                        speed={15} 
                        duration={1000} 
                        image={{style: styles.imageStyle, source: ICON.BULB}}/>                
                </View>
                <View style = {styles.textContainer}>
                    <Text style = {styles.textContent}>Searching Bulbs...</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height:'100%',
        position: "relative",
        backgroundColor: "#3097e4"
    },
    imageContainer:{
        width: "100%",
        height: "70%",
        position: "relative"
    },
    imageStyle:{
        width: 100,
        height: 100,
        position: "absolute",
        bottom: "38%",
        left: "37.5%"
    },
    textContainer:{
        width: "100%",
        position: "absolute",
        bottom: "20%"
    },
    textContent: {
            fontSize: 25,
            color: "white",
            textAlign: "center"
    }
})

function mapStateToProps(state) {
    return{
        deviceList: state
    }
}

export default connect(mapStateToProps, {deviceListAction})(WifiSearchScreen);
