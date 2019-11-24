import React,{Component} from 'react';
import {ICON} from '../../common/constants/ImageConstant';
import {View, Text,FlatList, StyleSheet, Image, Button} from 'react-native';

class Card extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        let self = this;
    }
    render(){
        return(
         <View style={styles.cardContainer}>
             <View style = {styles.cardHeader}>
                <Image style={styles.image1} source={ICON.HamburgerIcon}/> 
            </View>
            <View style={styles.cardBody}>
                <Image style = {styles.image2} source={ICON.LOGO}/>
                <View style={{justifyContent: 'space-evenly'}}>
                    <Text style={styles.textInput1}>25%</Text>
                    <Text style={styles.textInput2}>Device Bulb-01</Text>
                </View>
            </View>
         </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer:{
        backgroundColor: "#ff0000",
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
        fontWeight: "bold",
        textAlign: 'right',
        color: '#fff'
    },
    textInput2:{
        color: '#fff'
    },
    image1:{
        alignItems:'flex-end',
        width: 20,
        height: 20,
        margin: 5
    },
    image2: {
        height: 50,
        width: 50,
    }
})

export default Card;



