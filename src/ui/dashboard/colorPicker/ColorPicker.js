import React,{Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import {ICON} from '../../common/constants/ImageConstant';
import { ColorWheel } from 'react-native-color-wheel';


class ColorChooser extends Component {
    constructor(props){
        super(props)
        this.state = { 
            circleArr: [],
         }
    }

    addCircle = (circleColor) => {
        let circleArray = Object.assign([], this.state.circleArr);
        circleArray.push(circleColor);
        this.setState({circleArr: circleArray});
    }

    render() {
       let {selectedColor} = this.props,
           {circleArr} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={{height:300, alignItems:'center'}}>
                        <Text style={styles.txt}>Select Color</Text>
                        <ColorWheel initialColor= {selectedColor}
                                    onColorChange={color => this.props.onColorChange(color)}
                                    style={{width: 300}}
                                    thumbSize={20}
                                    thumbStyle={{alignItems:'center'}}
                                    onColorChangeComplete= {color => this.props.onColorChangeComplete(color)}
                            />
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{width:'85%'}}>
                            <Circle circleArr={circleArr}/>
                        </View>
                        <View style={{width:'15%'}}>
                            <AddCircle addCircle={this.addCircle} bgColor={selectedColor} />
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
   container:{
    backgroundColor: '#fff',
    height:'60%'
   },
   body:{
    marginHorizontal:15,
    marginTop: -50,
    backgroundColor: '#fff',
    borderLeftWidth:1,
    borderRightWidth:1,
    borderColor: '#ddd',
    shadowColor: '#000',
    borderTopRightRadius:15,
    borderTopLeftRadius:15,
    height:'106%'
   },
   circle:{
       height:40,
       width:40,
       borderRadius:20,
       backgroundColor:'red',
       margin:10

   },
   txt:{
    color:'#000',
    fontSize:22,
    fontWeight:'bold',
    marginTop:10
   }
});

export  default ColorChooser;
