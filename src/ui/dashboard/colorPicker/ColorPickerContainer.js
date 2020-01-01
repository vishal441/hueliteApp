import React,{Component} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import ColorChooser from './ColorPicker';
import {ColorPickerHeader} from './ColorPickerHeader';
import {CustomeSlider} from './Slider';
import {ICON} from '../../common/constants/ImageConstant';
import LinearGradient from 'react-native-linear-gradient';
import {getSelectedGradientColors, changeBrightness} from '../DashboardUtil';
import {changeColorBrigntess} from '../colorPicker/ColorUtil';
import {connect} from 'react-redux';
import {updateDeviceList} from '../../../util/AppUtil';
import {deviceListAction} from '../../../redux/actions/DeviceListAction';
import {insertDevices} from '../../../database/table/DeviceTable';
import ChangePicker from "./ChangePicker";
import {reduxConstant} from '../../../redux/ReduxConstant' 

class ColorPickerContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            selectedColor: 'rgb(0,128,255)',
            sliderVal: 0 ,
            gradColorArr: ["#668cff","#4d79ff","#3366ff"]
        }
    }

    componentWillMount() {
        let param = this.props.navigation.getParam('otherParam'),
        selDevice = param.selectedDevice, 
        colorArr = [],
        selectedColor = selDevice.Last_State ? selDevice.Last_State : '#ff0000',
        col_1 = changeColorBrigntess(selectedColor, 30),
        col_2 = changeColorBrigntess(selectedColor, 60),
        col_3 = changeColorBrigntess(selectedColor, 90);
        colorArr.push(col_1, col_2, col_3);
        this.setState({selectedColor: selectedColor, gradColorArr: colorArr})
    }

    onColorChange = (color) => {   
       let {selectedColor, gradColorArr} =  getSelectedGradientColors(color);
       this.setState({selectedColor: selectedColor, gradColorArr: gradColorArr});
    }
    onColorChangeComplete = (color) => {
        let {navigation, deviceListAction} = this.props,
        {deviceList, selectedDevice} = navigation.getParam('otherParam'),
        updateObj = {Last_State: color},
        updatedColor = color;
    if(!(selectedDevice.SSID.includes("OW") || selectedDevice.SSID.includes("S02"))){
        if(typeof color === "object"){
            let {selectedColor} =  getSelectedGradientColors(color);
            updateObj["Last_State"] = selectedColor;
            updatedColor = selectedColor;
        }
    }
        console.log("updatedColor--->", updatedColor);
        let newList = updateDeviceList(updateObj, selectedDevice, deviceList);
        typeof selectedDevice.Web_Socket === 'object' && selectedDevice.Web_Socket.send(updatedColor);
         deviceListAction(newList);
         /** Update the list in DB so user get the updated list when he came back */
         insertDevices(newList);
    }
    onSlidingComplete = (value) => {
        let {selectedColor} = this.state;
        let sliderValue = Math.round(value*100);
        // let color = changeColorBrigntess(selectedColor, -value*100);
        // this.onColorChangeComplete(color);
        // console.log("value--->", color);
        this.setState({ sliderVal: sliderValue})
    }
    render() {
       let {sliderVal, selectedColor, gradColorArr} = this.state;
        return (
                <View style={{height:'100%'}}>
                        <View style={{height:'40%'}}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={gradColorArr} style={{height:'100%'}}>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{marginHorizontal:15, height: "10%", marginTop:10}}>
                                    <Image source={ICON.LEFT_ARROW} style={{height:"100%"}}/>
                                </TouchableOpacity>
                                <ColorPickerHeader sliderVal={sliderVal} deviceName={" Device Bulb-1"}/>
                                <CustomeSlider customStyle = {styles.sliderStyle}   
                                            onSlidingComplete={this.onSlidingComplete}
                                            selectedColor={selectedColor}
                                            gradColorArr={gradColorArr}/>
                            </LinearGradient> 
                        </View>
                    <ChangePicker onColorChange={this.onColorChange} 
                                selectedColor={selectedColor} 
                                onColorChangeComplete = {this.onColorChangeComplete} />
                </View>
        )
    }
}


const styles = StyleSheet.create({
   sliderStyle:{
       marginHorizontal: 20
   }
});

mapStateToProps = (state) => {
    return{
        deviceList: state
    }
}

mapDispatchToProps = dispatch => {
    return{
        deviceListAction: (deviceList) => dispatch({type: reduxConstant.DEVICE_LIST, deviceList: deviceList})
    }
}

export  default connect(mapStateToProps, mapDispatchToProps)(ColorPickerContainer);
