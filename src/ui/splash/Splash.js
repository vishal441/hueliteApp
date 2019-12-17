import React,{Component} from 'react';
import {View, Text,FlatList, StyleSheet, Image, Button} from 'react-native';
import {ICON} from '../common/constants/ImageConstant';
import {getDeviceListFromDb,deleteDeviceTable, insertDevices} from '../../database/table/DeviceTable';
import {connect} from 'react-redux';
import {reduxConstant} from '../../redux/ReduxConstant';
import {deviceArr} from '../../util/DummyData'
import {deviceListAction} from '../../redux/actions/DeviceListAction';

class Splash extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let self = this;
        /**UnComment the next line for the very first time to insert dummay device in DB,
         * After first attempt please comment it for now,
         * Add few dummay data on util/DummayData file
         */
        //insertDevices(deviceArr)

        /**
         * To delete all the data from DB unComment the next line, otherwise no need for same.
         */
        //deleteDeviceTable();

        getDeviceListFromDb(deviceList => {
            console.log("deviceList : ", deviceList);
                //this.setState({deviceList: cb.data})
                this.props.deviceListAction(deviceList);
        })
        setTimeout(function(){
            self.props.navigation.navigate('WifiScreen');
        },0)
    }
    render(){
        return(
         <View style={styles.container}>
            <Image style = {styles.image} source={ICON.LOGO}/>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: "100%",
        backgroundColor: "#3097e4"
    },
    image:{
        width:150,
        height: 50,
        position: "absolute",
        top: "35%",
        left : "30%"
    }
})

mapStateToProps = (state) => {
    return {
        deviceList: state
    }
}

mapDispatchToProps = dispatch => {
    return{
        deviceListAction: (deviceList) => dispatch({type: reduxConstant.DEVICE_LIST, deviceList: deviceList})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);