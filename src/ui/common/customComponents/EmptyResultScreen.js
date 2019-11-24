import React,{Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

class EmptyResult extends Component{
    constructor(props){
        super(props);
        this.onTextPress = this.onTextPress.bind(this);
    }
    onTextPress(){
       this.props.navigation.navigate("WifiScreen");
    }
    render(){
        return(
         <View style={styles.container}>
            <Text style = {styles.text}>No Result Found <Text style = {styles.link} onPress={this.onTextPress} >Try Again</Text></Text>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: "100%",
       justifyContent: "center"
    },
    text:{
        width: "100%",
        textAlign: "center",
        fontSize: 20
    },
    link:{
        color: "blue",
        textDecorationLine:"underline"
    }
})

export default EmptyResult;



  