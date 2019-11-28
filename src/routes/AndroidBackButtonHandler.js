import React, { Component } from "react";
import {BackHandler} from 'react-native';

/**
 * 
 * @param {*route name for navigation to spefic screen} route 
 * @param {*navigation object required for navigation} navigation 
 */
const handleAndroidBackButton = (route, navigation) => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      console.log("handleAndroidBackButton : ", route)
      if(route === 'ExitApp'){
        BackHandler.exitApp();
      }
      else{
        navigation.navigate(route);
        return true;
      }
    });
};

/**
 * Removes the event listener in order not to add a new one
 * every time the view component re-mounts
 */
const removeAndroidBackButtonHandler = () => {
  BackHandler.removeEventListener('hardwareBackPress', () => {});
}
export {handleAndroidBackButton, removeAndroidBackButtonHandler};