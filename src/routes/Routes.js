import React from "react";
import {createAppContainer} from 'react-navigation';
import {createStackNavigator, HeaderBackButton} from 'react-navigation-stack';
import SplashScreen from '../ui/splash/Splash';
import AddDeviceListing from "../ui/addDevice/AddDeviceListing";
import WifiSearchScreen from "../ui/wifiSearch/WifiSearch";
import EmptyResultScreen from "../ui/common/customComponents/EmptyResultScreen";
import RouteHeader from "../ui/common/customComponents/RouteHeader";
import Dashboard from '../ui/dashboard/Dashboard';
import PairingForm from '../ui/pairDevice/PairingForm';
import ColorPickerContainer from '../ui/dashboard/colorPicker/ColorPickerContainer'; 
import MainPanel from '../ui/dashboard/mainPanel/MainPanel';

export const AppStackNavigator = createStackNavigator(
      { 
        Splash:{
                screen: SplashScreen,
                navigationOptions: {
                    header: null,
            }
        },
        WifiScreen:{
            screen: WifiSearchScreen,
            navigationOptions: {
                header: null
            }
        },
        AddDevice:{
            screen: AddDeviceListing,
            navigationOptions: ({navigation})=>({
                title: "Add Device",
                headerLeft:(<HeaderBackButton onPress={()=>{navigation.navigate('Dashboard')}}/>),
                headerRight:(<RouteHeader customStyle={{paddingRight: 15}} onPress={()=>{navigation.navigate('WifiScreen')}}/>),
            })
        },
        EmptySerachScreen:{
            screen: EmptyResultScreen,
            navigationOptions: {
                header: null
            }
        },
        WifiSearchScreen:{
            screen: WifiSearchScreen,
            navigationOptions: {
                header: null,
            }
        },
        Dashboard: {
            screen: Dashboard,
            navigationOptions:{
                header:null
            }
        },
        PairingForm: {
            screen: PairingForm,
            navigationOptions: {
                header: null
            }
        },
        ColorPickerContainer: {
            screen: ColorPickerContainer,
            navigationOptions: {
                header: null
            }
        },
        MainPanel: {
            screen: MainPanel,
            navigationOptions: {
                header: null
            }
        }
      },
      {
          headerMode: "screen",
          initialRouteName: "Splash"
      }
  );

 export default createAppContainer(AppStackNavigator);
