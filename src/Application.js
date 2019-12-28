
import React,{Component} from 'react';
import {View, Text,FlatList, StyleSheet, Image, Button,AppState} from 'react-native';
import AppStackNavigator from "../src/routes/Routes";
import {Provider} from 'react-redux';
import {store} from '../src/redux/ReduxStore';

class Application extends Component{
    constructor(props){
        super(props);
        this.state = {
          appState: AppState.currentState
        }
    }
    componentDidMount() {
      AppState.addEventListener('change', this.handleAppStateChange);
    }
  
    componentWillUnmount() {
      AppState.removeEventListener('change', this.handleAppStateChange);
    }
  
    handleAppStateChange = (nextAppState) => {
      this.setState({appState: nextAppState})
    };
  
    render(){
      // console.log("curr : state---->", this.state.appState);
        return(
        <Provider store = {store}>
            <AppStackNavigator/>
        </Provider>
        )
    }
}

export default Application