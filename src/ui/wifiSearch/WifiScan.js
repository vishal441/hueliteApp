import wifi from 'react-native-android-wifi';
import {PermissionsAndroid} from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';


export const getAvailableDevice = async (cbRes) => {
    let {reScanAndLoadWifiList} = wifi;
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Wifi networks',
                'message': 'We need your permission in order to find wifi networks'
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
            .then(data => {
                reScanAndLoadWifiList((wifiStringList) => {
                    let wifiArray = JSON.parse(wifiStringList);
                    cbRes(wifiArray);
                },
                  (error)=>{
                    cbRes([])
                    console.log(error);
                });
            }).catch(err => {
                console.log("notenable");
                cbRes([]);
            });

        } else {
            cbRes([]);
            console.log("You will not able to retrieve wifi available networks list");
        }
    } catch (err) {
        return [];
        console.warn(err)
    }
};



//  Try scanning for access points:

