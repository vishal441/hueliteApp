import React, { Component } from 'react'
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ICON } from '../../ui/common/constants/ImageConstant';
import { FONT_SIZE, FONT_COLOR } from '../common/constants/StyleConstant';
import { Dropdown } from 'react-native-material-dropdown';
import { InputField } from '../common/customComponents/InputField';



export default class PairingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceName: '',
            password: "",
            cnfPass: "",
            wifiList: [],
            rememberPass: false
        }
    }

    componentDidMount() {
        this.getWifiList();
    }

    getWifiList = () => {
        let payload = this.props.navigation.getParam('otherParam', 'default value'),
            wifilist = payload.wifiList,
            wifiArray = [];
        if (wifilist && wifilist.length) {
            wifilist.forEach((item) => {
                let wifiName = {};
                wifiName['value'] = item.SSID;
                wifiArray.push(wifiName);
            })
        }
        this.setState({ deviceName: payload.name, wifiList: wifiArray })
    }

    backButton = () => {
        this.props.navigation.navigate('AddDevice');
    }

    rememberPassword = () => {
        this.setState({ rememberPass: !this.state.rememberPass });
    }

    moveToNextScreen = () => {
        console.log("move to next screen");
    }

    onSkip = () => {
        this.props.navigation.navigate('AddDevice')
    }

    onTextChange = (name, text) => {
        this.setState({[name]: text});
    }

    render() {
        let { deviceName, wifiList, rememberPass, password,  cnfPass} = this.state;
        return (
            <View>
                <LinearGradient colors={['#2d90e8', '#3aafda', '#8ac5eb']} style={{ height: '30%' }}>
                    <TouchableOpacity onPress={() => this.backButton()} style={{ width: 70 }}>
                        <Image source={ICON.LEFT_ARROW} style={styles.backButton} />
                    </TouchableOpacity>
                    <View style={styles.headerImg}>
                        <Image style={styles.image} source={ICON.BULB} />
                    </View>
                </LinearGradient>
                <ScrollView style={{ height: '70%' }}>
                    <View style={styles.form}>
                        <InputField
                            placeholder={'Device Name'}
                            name={"deviceName"}
                            value={deviceName}
                            onChangeText={(text) => this.onTextChange("deviceName", text)} />

                        <View style={{flexDirection:'row', marginTop: 10, alignItems:'center'}}>
                            <View style={{width:'90%'}}>
                                <Dropdown
                                    label='Select Wi-fi Network'
                                    labelFontSize={FONT_SIZE.FONT_16}
                                    data={wifiList}
                                    value={wifiList && wifiList.length ? wifiList[0].value : ''}
                                    />
                            </View>
                            <TouchableOpacity onPress={() => {this.getWifiList()}}
                                style={{width:'10%', alignItems:'flex-end', paddingTop:25}}>
                                <Image source={ICON.SYNC} style={{height:25, width:25, opacity:0.5}}/>
                            </TouchableOpacity>
                        </View>

                        <InputField
                            placeholder={'Password'}
                            name={'password'}
                            value={password}
                            secureTextEntry={true}
                            onChangeText={(text) => this.onTextChange("password", text)} />

                        <InputField
                            placeholder={'Re-type Password'}
                            name={'cnfPass'}
                            value={cnfPass}
                            secureTextEntry={true}
                            onChangeText={(text) => this.onTextChange("cnfPass", text)}/>

                        <View style={styles.rememberPassView}>
                            <TouchableOpacity onPress={() => this.rememberPassword()}>
                                <View style={[styles.rememberPassButton]}>
                                    {rememberPass ?
                                        <View style={[styles.rememberPassButton, { borderWidth: 0, }]}>
                                            <Image source={ICON.WHITE_CHECK} style={{ height: 20, width: 20 }} />
                                        </View> :
                                        <View style={[styles.rememberPassButton, { backgroundColor: '#fff' }]} />}
                                </View>
                            </TouchableOpacity>
                            <Text style={[styles.displayTxt, { paddingLeft: 15 }]}>Remember Password</Text>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity onPress={() => this.onSkip()}>
                            <Text style={[styles.displayTxt, { fontSize: FONT_SIZE.FONT_16 }]}>Skip</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.moveToNextScreen}>
                            <View style={[styles.nextButton]}>
                                <Image source={ICON.RIGHT_ARROW} style={{ height: 25, width: 25 }} />
                            </View>
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
        marginTop: 10,
        // backgroundColor:'red'
    },
    displayTxt: {
        fontSize: FONT_SIZE.FONT_16,
        fontWeight: '400',
        color: FONT_COLOR.GREY,
    },
    inputTxt: {
        fontSize: FONT_SIZE.FONT_16,
        fontWeight: '400',
        color: FONT_COLOR.GREY,
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey',
        /// paddingTop: 5
    },
    rememberPassView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
    },
    rememberPassButton: {
        height: 23,
        width: 23,
        borderWidth: 0.5,
        borderRadius: 20,
        backgroundColor: '#2d90e8',
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center'

    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
    },
    nextButton: {
        height: 40,
        width: 40,
        borderRadius: 25,
        backgroundColor: '#2d90e8',
        alignItems: 'center',
        justifyContent: 'center'
    }
}) 