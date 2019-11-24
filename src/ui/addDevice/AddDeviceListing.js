import React,{Component} from 'react';
import {View, Text,FlatList, StyleSheet, Image} from 'react-native';
import Slider from "../common/customComponents/SliderAnimation";
import AddDevice from "./AddDevice";
import {connect} from 'react-redux';

class Application extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let {deviceList = []} = this.props;
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
                                <AddDevice 
                                    name = {item.SSID}
                                    navigation = {this.props.navigation}
                                    deviceList = {deviceList}/>
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

function mapStateToProps(state) {
    return{
        deviceList: state
    }
}

export default connect(mapStateToProps, null)(Application);