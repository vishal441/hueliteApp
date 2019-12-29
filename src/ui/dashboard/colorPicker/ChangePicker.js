import React,{Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import {ICON} from '../../common/constants/ImageConstant';
import ColorChooser from './ColorPicker';
import ModesPresets from './ModesPresets';
import Swiper from 'react-native-swiper';
import ViewPagerAndroid from "@react-native-community/viewpager";

class ChangePicker extends Component{
    constructor(props){
        super(props);
        this.state = { 
            showPicker: true,
            gestureName: 'none',
         }
    }
    render(){
        return(
            <View style={styles.container}>
                 {/* <Swiper scrollViewStyle = {{width:"50%"}} style = {styles.body} width={"100%"} automaticallyAdjustContentInsets={true} loop={false} showsButtons={true} showsButtons={false} horizontal={true}>
                   <View>
                        <ColorChooser {...this.props}/>
                    </View>
                    <View>
                        <ModesPresets/>
                    </View>
                </Swiper> */}

                <ViewPagerAndroid
                style={styles.pager}
                initialPage={0}>
                   <View style={styles.child}>
                        <ColorChooser {...this.props}/>
                    </View>
                    <View>
                        <ModesPresets/>
                    </View>
                </ViewPagerAndroid>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        height:'70%',
        width:"90%",
        position:"absolute",
        bottom:0,
        justifyContent:"center",
        alignSelf:"center",
        borderTopColor: "blue",
        borderTopLeftRadius:30,
        borderTopRightRadius:30
    },
    body:{
        position: "absolute",
        height:'100%',
        width:"100%",
    },
    pager:{
        width: "100%",
        alignContent: "center",
        alignSelf: "center",
        height: "100%",
        
    },
    child:{
      
    }
});

export default ChangePicker;