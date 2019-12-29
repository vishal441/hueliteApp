import React,{Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import {ICON} from '../../common/constants/ImageConstant';
import { ColorWheel } from './ColorWheel';

class ColorChooser extends Component {
    constructor(props){
        super(props)
        this.state = { 
            circleArr: [],
            warmWhiteColor:["#E9967A", "#FA8072", "#FFA07A"],
            coolWhiteColor:["#800080", "#FF00FF", "#000080"]
         }
    }

    addCircle = (circleColor) => {
        let circleArray = Object.assign([], this.state.circleArr);
        circleArray.push(circleColor);
        this.setState({circleArr: circleArray});
    }

    render() {
       let {selectedColor} = this.props,
           {circleArr, warmWhiteColor, coolWhiteColor} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={{alignItems: "center"}}>
                        <Text style={styles.txt}>Select Color</Text>
                        <View style={styles.underline}/>
                    </View>
                    <View style={{height: "100%", width: "100%"}}>
                            <View style ={{height:"50%",width: "100%", alignItems:'center'}}>
                                <ColorWheel initialColor= {selectedColor}
                                            onColorChange={color => this.props.onColorChange(color)}
                                            style={{width: "100%", height: "100%"}}
                                            thumbSize={20}
                                            thumbStyle={{alignItems:'center'}}
                                            onColorChangeComplete= {color => this.props.onColorChangeComplete(color)}
                                    />
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={{width:'100%', alignItems:"center"}}>
                                    <Circle circleArr={warmWhiteColor}/>
                                    <Circle circleArr={coolWhiteColor}/>
                                </View>
                                {/* <View style={{width:'15%'}}>
                                    <AddCircle addCircle={this.addCircle} bgColor={selectedColor} />
                                </View> */}
                            </View>  
                    </View>
                </View>
            </View>
        )
    }
}

const Circle = ({circleArr}) => {
    
    return(
        <View style={{flexWrap:'wrap', flexDirection:'row'}}>
            {circleArr && circleArr.map(rgColor => <View style={[styles.circle,{backgroundColor: rgColor}]}/>) }
        </View>
    )
}

const AddCircle = ({bgColor, addCircle}) => {
    return(
        <TouchableOpacity style={[styles.circle, {backgroundColor: bgColor}]} onPress={() => {addCircle(bgColor)}}>
            <Image source={ICON.ADD} style={{height:40, width:40}}/>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
   circle:{
       height:40,
       width:40,
       borderRadius:20,
       backgroundColor:'red',
       margin:10

   },
   txt:{
    color:'grey',
    fontSize:22,
    fontWeight:'bold',
    marginTop:10,
    width: "100%",
    textAlign: "center"
   },
   underline:{
    borderBottomColor: '#F2F2F2',
    width: "100%",
    borderBottomWidth: 1,
   }
});

export  default ColorChooser;
