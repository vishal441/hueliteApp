import React, { Component } from 'react';
import { ICON } from '../../common/constants/ImageConstant';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import Dialog, { DialogContent, DialogFooter, DialogTitle } from 'react-native-popup-dialog';
import LinearGradient from 'react-native-linear-gradient';

export const RenameDialog = (props) => {
    let { dialogTitle, btnName, textTitle, isDialogVisile, value, hasTitleBar } = props,
        dlgTitle = (
            <DialogTitle title={dialogTitle}
                hasTitleBar={hasTitleBar ? hasTitleBar : false}
                textStyle={styles.dlgTitleStyle} />
        );

    return (
        <Dialog visible={isDialogVisile} dialogStyle={styles.dialogStyle}
            dialogTitle={dlgTitle}>
            <DialogContent style={{ height: 70 }}>
                <Text style={[styles.label, props.labelStyle]}>{textTitle}</Text>
                <TextInput value={value}
                    style={[styles.txtInput, props.textInputStyle]}
                    autoFocus={true}
                    onChangeText={text => props.onChangeText(text)} />

            </DialogContent>

            <DialogFooter style={styles.dialogFooter} bordered={false}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#86abf0","#3d9df2","#035afc"]} style={{width: 140, borderRadius:30}}>
                    <Button title={btnName}
                        titleStyle={[styles.btnTxt, props.btnTxtStyle]}
                        containerStyle={[styles.btnContainer, props.btnContainerStyle]}
                        buttonStyle={[styles.btn, props.btnStyle]}
                        disabled={props.disabled}
                        onPress={props.btnPress} />
                </LinearGradient>
            </DialogFooter>

        </Dialog>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
    },
    modal: {
        backgroundColor: "green",
        // height:300
    },
    img: {
        height: 20,
        width: 20,
    },
    dialogStyle: {
        height: 250,
        width: '90%'
    },
    dialogFooter: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    btn: {
        width: 140,
        backgroundColor: 'transparent',
        borderRadius: 30,
        paddingVertical: 15
    },
    txtInput: {
        borderBottomWidth: 1,
        borderColor: '#035afc',
        fontSize: 18,
        color: '#000',
    },
    label: {
        fontSize: 18,
        fontWeight: '400',
        color: '#035afc'
    },
    dlgTitleStyle: {
        fontSize: 22,
        fontWeight: '500',
        color: '#000'
    },
    btnTxt: {
        fontSize: 20,
        fontWeight: '500',
    },
    btnContainer:{

    }
})

