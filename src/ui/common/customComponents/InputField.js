import React, { Component } from 'react'
import { StyleSheet} from 'react-native';
import { TextField} from 'react-native-material-textfield';
import { FONT_SIZE, FONT_COLOR } from '../../common/constants/StyleConstant';

export const InputField = (props) => {
    let { label, value, keyboardType, onSubmitEditing, secureTextEntry, containerStyle, onChangeText,
        labelTextStyle, inputContainerStyle,onFocus, onBlur} = props;
        console.log("input field : ",label, value);

    return (
        <TextField
            label={label}
            value={value ? value : 'qwerty'}
            onChangeText={(text) => onChangeText ? onChangeText(text) : {} }
            onBlur={() => onBlur ? onBlur() : {}}
            onFocus={() => onFocus ? onFocus() : {}}
            containerStyle={[styles.container,containerStyle]}
            labelTextStyle={[styles.lblTxt, labelTextStyle]}
            titleTextStyle={[styles.txt]}
            inputContainerStyle={[styles.inputStyle, inputContainerStyle]}
            keyboardType={keyboardType ? keyboardType : 'default'}
            onSubmitEditing={() => onSubmitEditing ? onSubmitEditing() : {}}
            secureTextEntry={secureTextEntry ? secureTextEntry : false}
            lineWidth={0.5}
            activeLineWidth={1}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        margin:0,
        padding:0,
    },
    lblTxt: {

    },
    inputStyle:{
      fontSize: FONT_SIZE.FONT_16
    },
    txt:{
        fontSize: FONT_SIZE.FONT_16
    }
})