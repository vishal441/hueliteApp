import React, { Component } from 'react';
import Dialog, { DialogContent, DialogFooter, DialogTitle } from 'react-native-popup-dialog';
import { View, Text, TextInput, Image, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

export const Loader =({isDialogVisile, showBtn = false, message = "Connecting....", onBtnPress})=>{
    return(
        <Dialog visible={isDialogVisile} dialogStyle={styles.dialogStyle}>
             <DialogContent style={styles.contentStyle}>
                 <View style = {[styles.textContainer, {height: showBtn ? "80%" : "100%"}]}>
                     <Text style ={styles.label}>{message}</Text>  
                 </View>
                 {showBtn && 
                 <View style = {styles.btnContainer}>
                      <Button title={"Try again"} titleStyle={[styles.btnTxt]} buttonStyle={[styles.btn]} onPress={onBtnPress}/>
                 </View>}
             </DialogContent>
        </Dialog>
    );
}


const styles = StyleSheet.create({
    dialogStyle: {
        height: '20%',
        width: '80%'
    },
    contentStyle:{
        width:'100%',
        height: '100%',
        flexDirection: 'column',
    },
    textContainer:{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    btnContainer:{
        width: "100%",
        height: "20%",
        justifyContent: "center",
        alignItems: "center"    
    },
    label: {
        fontSize: 16,
        fontWeight: '400',
        width: "100%",
        flexDirection: 'row',
        textAlign: "center",
        justifyContent: 'center',
        alignItems: 'center'
    },
    dialogFooter: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    btn: {
        width: 140,
        borderRadius: 10
    },
})