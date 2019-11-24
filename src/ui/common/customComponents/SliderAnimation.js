import React,{Component} from 'react';
import {Animated, View, Text} from 'react-native';


class CustomItem extends Component {

    constructor(props) {
        super(props);
        this.delayValue = 500;
        this.state = {
            animatedValue: new Animated.Value(0)
        }
    }

    componentDidMount() {
        Animated.spring(this.state.animatedValue, {
            toValue: 1,
            tension: 5,
            useNativeDriver: true
          }).start();
    }

    render() {
        this.delayValue = this.props.index*1000 + 500;
        const translateX = this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [this.delayValue, 1]
          });

        return (
            <Animated.View style={[{ transform: [{ translateX }] }]}>
               {this.props.children}
            </Animated.View>
        );
    }
}

export default CustomItem;