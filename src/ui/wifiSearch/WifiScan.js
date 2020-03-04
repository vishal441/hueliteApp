import wifi from 'react-native-android-wifi'
import {PermissionsAndroid} from 'react-native'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler'

export const getAvailableDevice = async cbRes => {
  console.log('getAvailableDevice::' + 'PARENT')
  let {reScanAndLoadWifiList} = wifi
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
      title: 'Wifi networks',
      message: 'We need your permission in order to find wifi networks',
      //buttonNeutral: 'Ask Me Later',
      //buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    })
    console.log(granted)
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Permission Granted')
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      })
        .then(() => {
          reScanAndLoadWifiList(
            wifiStringList => {
              let wifiArray = JSON.parse(wifiStringList)
              console.log('getAvailableDevice::' + 'PARENT>' + 'returning array')
              cbRes(wifiArray)
            },
            error => {
              cbRes('false')
              console.log(error)
            }
          )
        })
        .catch(err => {
          console.log('notenable')
          cbRes([])
        })
    } else {
      cbRes('false')
      console.log('Permission NOT Granted')
      console.log('You will not able to retrieve wifi available networks list')
    }
  } catch (err) {
    return []
    console.warn(err)
  }
}

//  Try scanning for access points:
