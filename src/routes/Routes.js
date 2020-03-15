import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";
import SplashScreen from "../ui/splash/Splash";
import AddDeviceListing from "../ui/addDevice/AddDeviceListing";
import WifiSearchScreen from "../ui/wifiSearch/WifiSearchAndroid";
import EmptyResultScreen from "../ui/common/customComponents/EmptyResultScreen";
import RouteHeader from "../ui/common/customComponents/RouteHeader";
import Dashboard from "../ui/dashboard/Dashboard";
import PairingForm from "../ui/pairDevice/PairingForm";
import ColorPickerContainer from "../ui/dashboard/colorPicker/ColorPickerContainer";
import MainPanel from "../ui/dashboard/mainPanel/MainPanel";
import { ICON } from "../ui/common/constants/ImageConstant";
import ColorPicker_temp from "../ui/dashboard/colorPicker/ColorPicker_temp";
import Welcome from "../ui/welcomeScreens/Welcome";
import Login from "../ui/loginSignup/login";
import PairIos1 from "../ui/pairDevice/PairIos1";
import PairIos2 from "../ui/pairDevice/PairIos2";

export const AppStackNavigator = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        header: null
      }
    },
    WifiScreen: {
      screen: WifiSearchScreen,
      navigationOptions: {
        header: null
      }
    },
    AddDevice: {
      screen: AddDeviceListing,
      navigationOptions: ({ navigation }) => ({
        title: "Add Device",
        headerLeft: (
          <HeaderBackButton
            onPress={() => {
              navigation.navigate("Dashboard");
            }}
          />
        ),
        headerRight: (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("WifiScreen");
            }}
            style={{ width: "20%", alignItems: "flex-end" }}
          >
            <Image
              source={ICON.SYNC}
              style={{ height: 25, width: 25, opacity: 0.8 }}
            />
          </TouchableOpacity>
        )
      })
    },
    EmptySerachScreen: {
      screen: EmptyResultScreen,
      navigationOptions: {
        header: null
      }
    },
    WifiSearchScreen: {
      screen: WifiSearchScreen,
      navigationOptions: {
        header: null
      }
    },
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        header: null
      }
    },
    PairingForm: {
      screen: PairingForm,
      navigationOptions: {
        header: null
      }
    },
    PairIos1: {
      screen: PairIos1,
      navigationOptions: {
        header: null
      }
    },
    PairIos2: {
      screen: PairIos2,
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
    },
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        header: null
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    ColorPicker_temp: {
      screen: ColorPicker_temp,
      navigationOptions: ({ navigation }) => ({
        title: "ColorPicker_temp",
        headerLeft: (
          <HeaderBackButton
            onPress={() => {
              navigation.navigate("Dashboard");
            }}
          />
        )
      })
    }
  },
  {
    headerMode: "screen",
    initialRouteName: "Splash"
  }
);

export default createAppContainer(AppStackNavigator);
