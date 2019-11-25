import React,{Component} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import ColorChooser from './ColorPicker';
import {ColorPickerHeader} from './ColorPickerHeader';
import {CustomeSlider} from './Slider';
import {hsvToRgb, changeColorBrigntess, hexToRgb, rgbToHex} from './ColorUtil';
import {ICON} from '../../common/constants/ImageConstant';
import LinearGradient from 'react-native-linear-gradient';


class ColorPickerContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            selectedColor: 'rgb(0,128,255)',
            sliderVal: 0 ,
            gradColorArr: ["#668cff","#4d79ff","#3366ff"]
        }
    }

    onColorChange = (color) => {
        let {h,s,v} = color, gradientColorArr = [];
        if(h < 0){
             h = 360 + h;   
        }
        let rgb = hsvToRgb(h,s,v),
            rgbColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
        let gradColor_1 = this.changeBrightness(30, rgb),
            gradColor_2 = this.changeBrightness(50, rgb),
            gradColor_3 = this.changeBrightness(70, rgb);
        gradientColorArr.push(gradColor_3);
        gradientColorArr.push(gradColor_2);
        gradientColorArr.push(gradColor_1);
        gradientColorArr.push(rgbColor);    
       this.setState({selectedColor: rgbColor, gradColorArr: gradientColorArr});
    }

    changeBrightness = (value, rgb)=>{
        let hexColoor = rgbToHex(rgb),
         brightenColor = changeColorBrigntess(hexColoor, value),
         rgbColor = hexToRgb(brightenColor);
        return `rgb(${rgbColor.r},${rgbColor.g},${rgbColor.b})`;
    }

    onSlidingComplete = (value) => {
        let sliderValue = value.toFixed(2);
        sliderValue = sliderValue * 100;
        this.setState({ sliderVal: sliderValue})
    }

    render() {
       let {color,sliderVal, selectedColor, gradColorArr} = this.state;
        return (
            <View style={{backgroundColor: selectedColor, height:'100%'}}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={gradColorArr} style={styles.linearGradient}>
                    <View style={{height:'40%'}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('DashboardScreen')} style={{marginHorizontal:15, marginTop:10}}>
                            <Image source={ICON.LEFT_ARROW} style={{height:35, width:35}}/>
                        </TouchableOpacity>
                        <ColorPickerHeader sliderVal={sliderVal} deviceName={" Device Bulb-1"}/>
                        <CustomeSlider onSlidingComplete={this.onSlidingComplete}
                                    selectedColor={selectedColor}
                                    gradColorArr={gradColorArr}/>
                
                    </View>
                </LinearGradient>
                <ColorChooser onColorChange={this.onColorChange} 
                              selectedColor={selectedColor}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
   container:{

   },

});

export  default ColorPickerContainer;
