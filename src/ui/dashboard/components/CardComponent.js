import React,{Component} from 'react';
import {ICON} from '../../common/constants/ImageConstant';
import {View, Text,FlatList, StyleSheet, Image, Button} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CustomeSlider} from '../colorPicker/Slider';
import {connectToDevice} from '../../../backGroundServices/Connector';
import {getWebSocket} from "../../../backGroundServices/webSocketProcess/webSocket";
import {authoriseApi,getStatusApi} from '../../../backGroundServices/webApi/WebApi';

hero = null;

class Card extends Component{
    constructor(props){
        super(props)
        this.state = { 
            sliderVal: 0,
            ws: null
        }
    }
    
    onSlidingComplete = (value) => {
        let sliderValue = Math.round(value*100);
        this.setState({ sliderVal: sliderValue})
    }

    handleWebSocket = (wsVal)=>{
        this.setState({ws: wsVal})
    }

    async componentDidMount(){
        // // if(this.props.data.IP_Address === "192.168.1.70"){
        //     var x = await connectToDevice(this.props.data.IP_Address);
        //     console.log("XXXXXXXXXXX::  ",x);
        // // }
        hero = await connectToDevice('', this.handleWebSocket);
        console.log("XXXXXXXXXXX::  ",hero);
        // let STATURESULT = await getStatusApi();
        // console.log("STATUSURL: ",STATURESULT);
    }

    render(){
        return(
         <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 0}} colors={['#2d90e8', '#3aafda', '#8ac5eb']} style={styles.cardContainer}>
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
            <View>
            <Button title = "Green" onPress = {()=>{hero.send("STATUS")}}></Button>
            <Button title = "Red" onPress = {()=>{hero.send("Red")}}></Button>
            <Button title = "Blue" onPress = {()=>{hero.send("Blue")}}></Button></View>
         </LinearGradient>

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



