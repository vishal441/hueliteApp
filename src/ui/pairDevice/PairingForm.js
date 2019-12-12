import React, {Component} from 'react'
import {View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ICON} from '../../ui/common/constants/ImageConstant';
import {FONT_SIZE, FONT_COLOR} from '../common/constants/StyleConstant';
import { Dropdown } from 'react-native-material-dropdown';
import {connectToDevice} from '../../backGroundServices/Connector';
import {pairDeviceApi} from '../../backGroundServices/webApi/WebApi';
import {createNewDevice} from '../../util/AppUtil';
import {insertDevices} from '../../database/table/DeviceTable';
import {connect} from 'react-redux';
import {deviceListAction} from '../../redux/actions/DeviceListAction';

const TextInputField = (props) => {
    let {name, value, isPassword} = props;
    return(
    <View style = {styles.textInputField}>
        <Text style = {styles.displayTxt}>{name}</Text>
        {name !== 'Select Wi-fi Network' ? 
            <TextInput 
                style = {styles.inputTxt}
                secureTextEntry={isPassword ? true : false}>
                {value}
            </TextInput> : 
        null}
    </View>
    )
}

class PairingForm extends Component{
    socket = null;
    constructor(props){
        super(props);
        this.state = {
            deviceName: '',
            wifiList: [],
            selectedWifi: '',
            password: '8512019785',
            rePassword: '',
            rememberPass: false,
            deviceMAC: ''
        }
    }

    async componentDidMount() {
        let payload = this.props.navigation.getParam('otherParam', 'default value'),
        wifilist = payload.wifiList,
        selectedDevice = payload.selectedDevice,
        wifiArray = [],
        {deviceList, deviceListAction} = this.props;
        console.log("Selected device : ", selectedDevice, deviceList);
        if(wifilist && wifilist.length){
            wifilist.forEach((item) => {
                let wifiName = {};
                wifiName['value'] = item.SSID;
                wifiArray.push(wifiName);
            })
        }
        this.setState({deviceName: selectedDevice.SSID, wifiList: wifiArray, selectedWifi: wifilist[0].SSID, deviceMAC: selectedDevice.BSSID})
        console.log("device list: ",  deviceList);
        this.socket = await connectToDevice('', selectedDevice, deviceList, deviceListAction);
    }

    async componentWillUnmount(){
        this.socket.close();
    }

    backButton = () => {
        this.props.navigation.navigate('AddDevice');
    }

    selectWifiConn = (value, index, list) => {
        this.setState({selectedWifi: value});
    }

    changePassword = (value) => {
        this.setState({password: value})
    }

    rememberPassword = () => {
        this.setState({rememberPass : !this.state.rememberPass});
    }

    moveToNextScreen = async () => {
        let {selectedWifi, password} = this.state,
            pair = await pairDeviceApi(selectedWifi, password);
        console.log("moveToNextScreen pair res: ", pair);
        
        //let newDevice = createNewDevice();
    }

    onSkip = () => {
        let {deviceMAC, deviceName} = this.state,
            deviceArr = [],
            newDevice = createNewDevice('', deviceMAC, '', deviceName, '192.168.4.1');
            deviceArr.push(newDevice);
        console.log("onSkip : ", deviceArr);
        insertDevices(deviceArr);

        this.props.navigation.navigate('AddDevice')
    }

    render(){
        let {deviceName, wifiList, rememberPass} = this.state;
        return(
            <View>
                <LinearGradient colors={['#2d90e8', '#3aafda', '#8ac5eb']} style = {{height: '30%'}}>
                    <TouchableOpacity onPress = {() => this.backButton()} style = {{width: 70}}>
                        <Image source = {ICON.LEFT_ARROW} style = {styles.backButton} />
                    </TouchableOpacity>
                    <View style = {styles.headerImg}>
                        <Image style = {styles.image} source = {ICON.BULB} />
                    </View>
                </LinearGradient>
                <ScrollView style = {{height: '70%'}}>
                <View style = {styles.form}>
                    <TextInputField 
                        name = {'Device Name'} 
                        value = {deviceName} />

                    <TextInputField 
                        name = {'Select Wi-fi Network'} 
                        value = '' />

                    <Dropdown 
                        data = {wifiList}
                        value = {wifiList && wifiList.length ? wifiList[0].value : ''}
                        containerStyle = {{marginTop: -15}} 
                        onChangeText = {(value, index) => this.selectWifiConn(value, index)}/>

                    <TextInputField 
                        name = {'Password'} 
                        value = '' 
                        isPassword = {true} />

                    <TextInputField 
                        name = {'Re-type Password'} 
                        value = ''
                        isPassword = {true} />

                    <View style = {styles.rememberPassView}>
                        <TouchableOpacity onPress = {() => this.rememberPassword()}>
                            <View style = {[styles.rememberPassButton]}>
                                {rememberPass ?
                                <LinearGradient 
                                    colors = {['#2d90e8', '#3aafda', '#8ac5eb']}
                                    style = {styles.rememberPassButton}></LinearGradient>: 
                                    null}
                            </View>
                        </TouchableOpacity>
                        <Text style = {[styles.displayTxt, {paddingLeft: 15}]}>Remember Password</Text>
                    </View>
                </View>

                <View style = {styles.footer}>
                    <TouchableOpacity onPress = {() => this.onSkip()}>
                        <Text style = {[styles.displayTxt, {fontSize: FONT_SIZE.FONT_24}]}>Skip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {this.moveToNextScreen}>
                        <LinearGradient 
                            colors = {['#2d90e8', '#3aafda', '#8ac5eb']}
                            style = {styles.nextButton}>
                                <Text style = {{paddingHorizontal: 8, paddingVertical: 14}}>Next</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerImg: {
        height: '80%',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    backButton: {
        marginTop: 10, 
        marginLeft: 10, 
        height: 20, 
        width: 30
    },
    image: {
        height: 60,
        width: 60
    },
    form: {
        margin: 10
    },
    textInputField: {
        paddingTop: 15
    },
    displayTxt: {
        fontSize: FONT_SIZE.FONT_20,
        fontWeight: '700',
        color: FONT_COLOR.GREY,
    },
    inputTxt: {
        fontSize: FONT_SIZE.FONT_22,
        fontWeight: '700',
        color: FONT_COLOR.GREY,
        borderBottomWidth: 2,
        borderBottomColor: 'grey',
        paddingTop: 5
    },
    rememberPassView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 30,
        marginBottom: 25
    },
    rememberPassButton: {
        height: 30,
        width: 30,
        borderWidth: 1,
        borderRadius: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10
    },
    nextButton: {
        height: 50,
        width: 50,
        borderWidth: 1,
        borderRadius: 25,
        marginRight: 20
    }
}) 

mapStateToProps = (state) => {
    return{
        deviceList: state
    }
}

export default connect(mapStateToProps, {deviceListAction})(PairingForm)