import React,{Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions, Image, FlatList, TouchableOpacity} from 'react-native';
import {ICON} from '../../common/constants/ImageConstant';

const SCENCE_LIST = [{name: "Rainbow", src:ICON.RAINBOW}, {name: "Peace", src:ICON.PEACE}, {name: "Breathing", src:ICON.BREATHING},{name: "Medication", src:ICON.MEDICATION}];
const MODE_LIST = [{name: "Dinner", src:ICON.DINNER},{name: "Movie", src:ICON.MOVIE},{name: "Party", src:ICON.PARTY},{name: "Study", src:ICON.STUDY}]
const SHADES_LIST = [{name: "Cloudy", src:ICON.CLOUDY},{name: "Sunny", src:ICON.SUNNY},{name: "Rainy", src:ICON.RAINY},{name: "Snowy", src:ICON.SNOWY}]


class FlatImage extends Component{
    render(){
           let {image, name} = this.props;
           return(
            <View style={styles.imageWrapper}>
                <Image style = {styles.image} source={image}/>
                <Text style = {{width: "100%",color: "grey", textAlign : "center"}}>{name}</Text>
            </View>
           )
    }
}


class VerticalImageList extends Component{
    render(){
        let {mode, list} = this.props;
        return(
            <View style={{width: "100%"}}>
                <Text style={styles.modesTxt}>{mode}</Text>
                <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={list}
                keyExtractor={(item, index) => 'key'+index}
                renderItem={({item, index})=> {
                    return(
                        <FlatImage image = {item.src} name={item.name}/>
                )}}/>
            </View>
        )
    }
}

class ModesPresets extends Component{
    render(){
        return(
            <View style={styles.container}>
            <View style={styles.body}>
                <View style={{height: "90%", alignItems:'center'}}>
                    <Text style={[styles.txt]}>Select Modes</Text>
                    <View style = {styles.underline}/>
                    <View style = {styles.modes}>
                        <ScrollView showsVerticalScrollIndicator = {false}>
                            <VerticalImageList mode = {"Scenes"} list ={SCENCE_LIST}/>
                            <VerticalImageList mode = {"Shades"} list = {SHADES_LIST}/>
                            <VerticalImageList mode = {"Modes"} list = {MODE_LIST}/>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        height:"100%"
    },
    body:{
        height: "100%"
    },
    circle:{
        height:40,
        width:40,
        borderRadius:20,
        backgroundColor:'red',
        margin:10
 
    },
    txt:{
     color:'grey',
     fontSize:20,
     fontWeight:'bold',
     marginTop:10
    },
    imageWrapper:{
        padding: 10
    },
    modesTxt:{
        color:'#000',
        fontSize:18,
        fontWeight:'bold',
        marginTop:"5%",
        paddingLeft: "5%"
    },
    modes:{
        height: "100%",
        width:"100%"
    },
    image:{
      width:100,
      height: 100,
      borderRadius: 6,
      
    },
    underline:{
        borderBottomColor: '#F2F2F2',
        width: "100%",
        borderBottomWidth: 1,
    }
 });
 

export default ModesPresets;