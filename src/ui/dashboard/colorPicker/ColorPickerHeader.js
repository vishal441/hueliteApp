import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import { ICON } from '../../common/constants/ImageConstant';

export const ColorPickerHeader = (props) => {
    let {sliderVal, deviceName} = props;
    return(
        <View style={{paddingHorizontal:20, height: "40%", alignItems:'center'}}> 
            <View style={{flexDirection:'row', marginTop:20,  width:'100%'}}>
                <Image source={ICON.BULB} style={{width:50, height:50}}/>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:'85%'}}>
                    <Text style={[styles.txt,{marginLeft:20}]}>{deviceName}</Text>
                    <Text style={styles.txt}>{sliderVal + "%"}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    txt:{
        color:'#fff',
        fontSize:24,
        fontWeight:'500',
        alignItems:'center'
    }
 });