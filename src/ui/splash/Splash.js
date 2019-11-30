import React,{Component} from 'react';
import {View, Text,FlatList, StyleSheet, Image, Button} from 'react-native';
import {ICON} from '../common/constants/ImageConstant';
import {getDeviceListFromDb,deleteDeviceTable, insertDevices} from '../../database/table/DeviceTable';
import {connect} from 'react-redux';
import {deviceListAction} from '../../redux/actions/DeviceListAction';
import {deviceArr} from '../../util/DummyData'

class Splash extends Component{
    constructor(props){
        super(props)
        this.state = {
            deviceList : [],
        }
    }
    componentDidMount(){
        let self = this;
        //insertDevices(deviceArr)
        getDeviceListFromDb(cb => {
            if(cb.success){
                //this.setState({deviceList: cb.data})
                this.props.deviceListAction(cb.data);
            }
        })
        setTimeout(function(){
            self.props.navigation.navigate('WifiScreen');
        },2000)
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

function mapStateToProps(state) {
    return {
        deviceList: state
    }
}

export default connect(mapStateToProps, {deviceListAction})(Splash);