import React,{Component} from 'react';
import {ICON} from '../common/constants/ImageConstant';
import CardComponent from './components/CardComponent';
import {View, Text,FlatList, StyleSheet, Image, Button, ScrollView} from 'react-native';
import RouteHeader from "../common/customComponents/RouteHeader";
import {handleAndroidBackButton, removeAndroidBackButtonHandler} from '../../routes/AndroidBackButtonHandler';

class Dashboard extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        let self = this;
        handleAndroidBackButton('ExitApp');
    }

    componentWillUnmount(){
        removeAndroidBackButtonHandler();
    }
    render(){
        return(
         <View style={styles.container}>
             <View style={styles.header}>
                 <Image style={styles.image} source={ICON.HamburgerIcon}/>
                 <RouteHeader onPress={()=>{this.props.navigation.navigate('WifiScreen')}}/>
             </View>
             <View style={styles.body}>
                <Text style={styles.textinput}>Dashboard</Text>
                <ScrollView>
                    <CardComponent></CardComponent>
                    <CardComponent></CardComponent>
                    <CardComponent></CardComponent>
                    <CardComponent></CardComponent>
                    <CardComponent></CardComponent>
                    <CardComponent></CardComponent>
                    <CardComponent></CardComponent>
                    <CardComponent></CardComponent>
                    <CardComponent></CardComponent>
                    <CardComponent></CardComponent> 
                </ScrollView>
             </View>
         </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        paddingTop: 30,
        paddingHorizontal: 20
    },
    header:{
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    body: {
        padding: 10
    },
    textinput:{
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 10
    },
    image:{
        width: 30,
        height: 30
    }
})

export default Dashboard;



