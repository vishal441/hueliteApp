import React,{Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import {ICON} from '../../common/constants/ImageConstant';
import { ColorWheel } from './ColorWheel';

class ColorChooser extends Component {
    constructor(props){
        super(props)
        this.state = { 
            circleArr: [],
            coolWhiteColor:[{color: "#A3E7FF", send: "#000000ff00"}, {color: "#C9F8FF", send: "#000000bf00"}, {color:"#CDF7FF", send: "#0000007f00"},{color:"#E9FCFF", send:"#0000004000"}],
            warmWhiteColor:[{color: "#F4F3E7", send:"#0000000040"}, {color: "#F5F3DE", send:"#000000007f"}, {color: "#F6EBCC", send:"#00000000bf"}, {color: "#F5E1A6", send:"#00000000ff"}]
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
                            <View style ={{height:"45%",width: "100%", alignItems:'center'}}>
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
                                    <Circle circleArr={coolWhiteColor} onColorChangeComplete={this.props.onColorChangeComplete}/>
                                    <Circle circleArr={warmWhiteColor} onColorChangeComplete={this.props.onColorChangeComplete}/>
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

const Circle = ({circleArr, onColorChangeComplete}) => {  
    return(
        <View style={{flexWrap:'wrap', flexDirection:'row'}}>
            {circleArr && circleArr.map(rgColor => 
            <TouchableOpacity onPress={()=>onColorChangeComplete(rgColor.send)}>
                     <View style={[styles.circle,{backgroundColor: rgColor.color}]}/>
            </TouchableOpacity>
        )}
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
