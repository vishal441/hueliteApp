import React from 'react';
import {View,StyleSheet,Text} from 'react-native';
import Slider from 'react-native-slider';
import LinearGradient from 'react-native-linear-gradient';

export const CustomeSlider = (props) => {
    let {onSlidingComplete,selectedColor, gradColorArr} = props;
    return(
        <View style={styles.container}>
          <View style={styles.textView}>
                  <Text>OFF</Text>
            </View>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[gradColorArr[1], "#f2f2f2", "#fff"]} style={styles.linearGradient}>
                <Slider
                    trackStyle={styles.track}
                    thumbStyle={styles.thumb}
                    minimumTrackTintColor='transparent'
                     style={styles.slider}
                    onSlidingComplete ={(value) => onSlidingComplete(value)}>
                </Slider>
            </LinearGradient>
            
        </View>
    )
}

var styles = StyleSheet.create({
    container: {
      marginHorizontal:20,
      alignItems: 'stretch',
      marginTop:40,
      flexDirection:'row'
    },
    track: {
        backgroundColor: 'transparent',
        height:25,
        borderRadius:15,
      },
      thumb: {
        width: 32,
        height: 32,
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 3,
        borderRadius: 18,
      },
      linearGradient: {
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        height:30,
        justifyContent:'center',
        width:'85%',
        opacity:0.5
      },
      textView:{
        paddingHorizontal:15,
        paddingVertical:5,
        backgroundColor:'#fff',
        borderRadius:15,
        alignItems:'center',
        width:55
      },
  });