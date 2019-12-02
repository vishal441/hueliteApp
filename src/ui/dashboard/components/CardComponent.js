import React,{Component} from 'react';
import {ICON} from '../../common/constants/ImageConstant';
import {View, Text,FlatList, StyleSheet, Image, Button, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CustomeSlider} from '../colorPicker/Slider';
import {changeColorBrigntess} from '../colorPicker/ColorUtil';

class Card extends Component{
    constructor(props){
        super(props)
        this.state = { 
            sliderVal: 0,
            cardColor: [] 
        }
    }

    componentWillMount(){
        let cardColors = this.getCardGradentColor();
        this.setState({cardColor: cardColors});
    }

    // componentDidUpdate(prevProps, prevState){
    //     let updatedColor = this.getCardGradentColor();
    //     console.log("componentDidUpdate : 1", prevProps.data.Last_State);
    //     console.log("componentDidUpdate : 2", prevState, updatedColor)
    //     if(updatedColor !== prevState.cardColor){
    //         this.setState({cardColor: updatedColor})
    //     }
    // }

    getCardGradentColor = () => {
        let {data} = this.props,
        colorArr = [],
        color_1 = changeColorBrigntess(data.Last_State, 30),
        color_2 = changeColorBrigntess(data.Last_State, 60),
        color_3 = changeColorBrigntess(data.Last_State, 90);
        colorArr.push(color_1, color_2, color_3);
        return colorArr;
    }
    
    onSlidingComplete = (value) => {
        let sliderValue = Math.round(value*100);
        this.setState({ sliderVal: sliderValue})
    }

    openColorPicker = () => {
        let {data} = this.props;
        this.props.navigation.navigate('ColorPickerContainer', {selectedDevice: data});
    }

    render(){
        let {cardColor} = this.state;
        return(
        <TouchableOpacity onPress = {() => {this.openColorPicker()}}>
         <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 0}} colors={cardColor} style={styles.cardContainer}>
             <View style = {styles.cardHeader}>
                <Image style={styles.image1} source={ICON.HamburgerIcon}/> 
            </View>
            <View style={styles.cardBody}>
                <Image style = {styles.image2} source={ICON.BULB}/>
                <View style={{justifyContent: 'space-evenly'}}>
        <Text style={styles.textInput1}>{this.state.sliderVal + '%'}</Text>
                    <Text style={styles.textInput2}>{this.props.data.Mac}</Text>
                </View>
            </View>
                <CustomeSlider  customStyle = {styles.sliderStyle}  
                                onSlidingComplete={this.onSlidingComplete}
                                selectedColor={"#2d90e8"}
                                gradColorArr={['#2d90e8', '#3aafda', '#8ac5eb']}/>
         </LinearGradient>
        </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer:{
        backgroundColor: "#893400",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 10,
        borderRadius:20,
        justifyContent: 'space-between'
    },
    cardHeader: {
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    cardBody:{
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    textInput1:{
        fontSize: 16,
        fontWeight: "bold",
        textAlign: 'right',
        color: '#fff'
    },
    textInput2:{
        color: '#fff'
    },
    image1:{
        alignItems:'flex-end',
        width: 12,
        height: 12
    },
    image2: {
        height: 60,
        width: 60,
    }, 
   sliderStyle:{
    marginHorizontal: 10,
    marginTop: 20
   }
})

export default Card;



