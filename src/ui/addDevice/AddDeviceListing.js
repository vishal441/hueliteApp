import React,{Component} from 'react';
import {View, Text,FlatList, StyleSheet, Image} from 'react-native';
import Slider from "../common/customComponents/SliderAnimation";
import AddDevice from "./AddDevice";


class Application extends Component {
    constructor(props){
        super(props);
        this.state = {
            deviceList : this.props.navigation.getParam('deviceList', 'NO-ID')
        }
    }
    render(){
        let {deviceList = []} = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.dashBoardContainer}>
                    <View>
                        <Text style={styles.dashboard}>Dashboard</Text>
                        <FlatList
                        style={styles.list}
                        data={deviceList}
                        keyExtractor={(item, index) => 'key'+index}
                        renderItem={({item, index})=> {
                            return(
                            <Slider index = {index} name = {item.SSID}>
                                <AddDevice name = {item.SSID}/>
                            </Slider>)}}/>
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        height:'100%'
    },
    dashBoardContainer:{
       height:"85%"     
    },
    dashboard:{
          justifyContent:'center',
          padding: 20,
          fontWeight: "700" 
    }
})


export default Application;