import React,{Component} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import ColorChooser from './ColorPicker';
import {ColorPickerHeader} from './ColorPickerHeader';
import {CustomeSlider} from './Slider';
import {ICON} from '../../common/constants/ImageConstant';
import LinearGradient from 'react-native-linear-gradient';
import {getSelectedGradientColors} from '../DashboardUtil';
import {changeColorBrigntess} from '../colorPicker/ColorUtil';
import {connect} from 'react-redux';
import {updateDeviceList} from '../../../util/AppUtil';
import {deviceListAction} from '../../../redux/actions/DeviceListAction';

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

    onSlidingComplete = (value) => {
        let sliderValue = Math.round(value*100);
        this.setState({ sliderVal: sliderValue})
    }

    onColorChangeComplete = (color) => {
        let {selectedColor} =  getSelectedGradientColors(color),
            {navigation, deviceListAction} = this.props,
            {deviceList, selectedDevice} = navigation.getParam('otherParam'),
            updateObj = {
                Last_State: selectedColor
            };
            let newList = updateDeviceList(updateObj, selectedDevice, deviceList);
            deviceListAction(newList);
    }

    render() {
       let {sliderVal, selectedColor, gradColorArr} = this.state;
        return (
            <View style={{backgroundColor: selectedColor, height:'100%'}}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={gradColorArr} style={styles.linearGradient}>
                    <View style={{height:'40%'}}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{marginHorizontal:15, marginTop:10}}>
                            <Image source={ICON.LEFT_ARROW} style={{height:35, width:35}}/>
                        </TouchableOpacity>
                        <ColorPickerHeader sliderVal={sliderVal} deviceName={" Device Bulb-1"}/>
                        <CustomeSlider customStyle = {styles.sliderStyle}   
                                    onSlidingComplete={this.onSlidingComplete}
                                    selectedColor={selectedColor}
                                    gradColorArr={gradColorArr}/>
                
                    </View>
                </LinearGradient>
                <ColorChooser onColorChange={this.onColorChange} 
                              selectedColor={selectedColor} 
                              onColorChangeComplete = {this.onColorChangeComplete} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
   sliderStyle:{
       marginHorizontal: 20,
       marginTop: 80
   },

});

export  default connect(null, {deviceListAction})(ColorPickerContainer);
