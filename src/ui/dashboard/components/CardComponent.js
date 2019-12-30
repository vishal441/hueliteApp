import React, { Component } from 'react';
import { ICON } from '../../common/constants/ImageConstant';
import { View, Text, FlatList, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CustomeSlider } from '../colorPicker/Slider';
import { connectToDevice } from '../../../backGroundServices/Connector';
import { changeColorBrigntess } from '../colorPicker/ColorUtil';
import EditDashboard from './EditDashboard';

hero = null;

class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sliderVal: 0,
            ws: null,
            isShowEditDashoard: false,
        }
    }

    getCardGradentColor = () => {
        let { data } = this.props,
            colorArr = [],
            color_1 = changeColorBrigntess(data.Last_State, 30),
            color_2 = changeColorBrigntess(data.Last_State, 60),
            color_3 = changeColorBrigntess(data.Last_State, 90);
        colorArr.push(color_1, color_2, color_3);
        return colorArr;
    }

    onSlidingComplete = (value) => {
        let sliderValue = Math.round(value * 100);
        this.setState({ sliderVal: sliderValue })
    }

    openEditDahbsoard = () => {
        this.setState({ isShowEditDashoard: !this.state.isShowEditDashoard });
    }

    openColorPicker = () => {
        let { data, deviceList } = this.props;
        this.props.navigation.navigate('ColorPickerContainer', { otherParam: { selectedDevice: data, deviceList: deviceList } });
    }

    handleWebSocket = (wsVal) => {
        let {deviceListAction, data, deviceList } = this.props,
            newList = deviceList.map(item => {
            if(item.Mac === data.Mac){
                item.Web_Socket = wsVal;
            }
            return item;
        });
        deviceListAction(newList);
        this.setState({ ws: wsVal });
    }

    // componentWillReceiveProps(){
    //     console.log("componentWillReceiveProps: ",this.props.deviceList.length);
    // }

    async componentDidMount() {
        console.log("devixxe ====>.", this.props.deviceList);
        await connectToDevice(this.props.data.IP_Address, this.handleWebSocket, () =>{});
    }

    render() {
        let { isShowEditDashoard, } = this.state,
            { deviceListAction, data, deviceList } = this.props,
            cardColor = this.getCardGradentColor();
        return (
            <View style={{ paddingVertical: 10 }}>
                <TouchableOpacity activeOpacity = {0.9} onPress = {() => {this.openColorPicker()}}>
                    <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 0}} 
                        colors={cardColor} 
                        style={[styles.cardContainer, { elevation: isShowEditDashoard ? 15 : 5 }]}>
                        <TouchableOpacity style={styles.cardHeader} onPress={() => this.openEditDahbsoard()}>
                            <Image style={styles.image1} source={ICON.HOR_MORE_INFO} />
                        </TouchableOpacity>
                        <View style={styles.cardBody}>
                            <Image style={styles.image2} source={ICON.BULB} />
                            <View style={{ justifyContent: 'space-evenly' }}>
                                <Text style={styles.textInput1}>{this.state.sliderVal + '%'}</Text>
                                <Text style={styles.textInput2}>{data.SSID}</Text>
                            </View>
                        </View>
                        <CustomeSlider customStyle={styles.sliderStyle}
                            onSlidingComplete={this.onSlidingComplete}
                            selectedColor={"#2d90e8"}
                            gradColorArr={['#2d90e8', '#3aafda', '#8ac5eb']} />
                    </LinearGradient>
                </TouchableOpacity>
                {isShowEditDashoard ?
                    <View style={{ paddingHorizontal: 7 }}>
                        <EditDashboard selectedCard={data}
                            deviceList={deviceList}
                            deviceListAction={deviceListAction} />
                    </View> : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#893400",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    cardBody: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textInput1: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: 'right',
        color: '#fff'
    },
    textInput2: {
        color: '#fff'
    },
    image1: {
        alignItems: 'flex-end',
        width: 20,
        height: 20
    },
    image2: {
        height: 60,
        width: 60,
    },
    sliderStyle: {
        marginHorizontal: 10,
        marginTop: 20
    }
})

export default Card;



