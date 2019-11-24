import React, {Component} from 'react'
import {View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ICON} from '../../ui/common/constants/ImageConstant';
import {FONT_SIZE, FONT_COLOR} from '../common/constants/StyleConstant';
import { Dropdown } from 'react-native-material-dropdown';

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

export default class PairingForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            deviceName: '',
            wifiList: [],
            rememberPass: false
        }
    }

    componentDidMount() {
        let payload = this.props.navigation.getParam('otherParam', 'default value'),
        wifilist = payload.wifiList,
        wifiArray = [];
        if(wifilist && wifilist.length){
            let wifiName = {}
            wifilist.forEach((item) => {
                wifiName['value'] = item.SSID;
                wifiArray.push(wifiName);
            })
        }
        this.setState({deviceName: payload.name, wifiList: wifiArray})
    }

    backButton = () => {
        this.props.navigation.navigate('AddDevice');
    }

    rememberPassword = () => {
        this.setState({rememberPass : !this.state.rememberPass});
    }

    moveToNextScreen = () => {
        console.log("move to next screen");
    }

    onSkip = () => {
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
                        containerStyle = {{marginTop: -15}} />

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