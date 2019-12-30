import React, { Component } from 'react'
import { StyleSheet,  TextInput} from 'react-native';
import { FONT_SIZE, FONT_COLOR } from '../../common/constants/StyleConstant';

export const InputField = (props) => {
    let {  value, keyboardType, onSubmitEditing, secureTextEntry, containerStyle, onChangeText,
        labelTextStyle, inputContainerStyle,onFocus, onBlur, placeholder, name} = props

    return (
        <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={(text) => onChangeText ? onChangeText(text) : {} }
            onBlur={() => onBlur ? onBlur() : {}}
            onFocus={() => onFocus ? onFocus() : {}}
            style={[styles.container,containerStyle]}
            keyboardType={keyboardType ? keyboardType : 'default'}
            onSubmitEditing={() => onSubmitEditing ? onSubmitEditing() : {}}
            secureTextEntry={secureTextEntry ? secureTextEntry : false}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop:10,
        paddingVertical:10,
        borderBottomWidth:1,
        borderColor:'#eee'
    },
    lblTxt: {

    },
    inputStyle:{
      fontSize: FONT_SIZE.FONT_16,
      color:'#000'
    },
    txt:{
        fontSize: FONT_SIZE.FONT_16,
        color:'#000'
    }
})