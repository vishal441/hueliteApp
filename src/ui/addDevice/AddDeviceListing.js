import React, {Component} from 'react'
import {View, Text, FlatList, StyleSheet} from 'react-native'
import Slider from '../common/customComponents/SliderAnimation'
import AddDevice from './AddDevice'
import {getDeviceListFromWindow} from '../../util/AppUtil'

class Application extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deviceList: [],
      wifiList: [],
    }
  }

  componentDidMount() {
    let {navigation} = this.props,
      {deviceList, wifiList} = navigation.getParam('otherParam', 'default value')
    this.setState({deviceList: deviceList, wifiList: wifiList})
  }

  render() {
    let {deviceList, wifiList} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.dashBoardContainer}>
          <View>
            <Text style={styles.dashboard}>Click on the Device you'd like to Pair.</Text>
            <FlatList
              style={styles.list}
              data={deviceList}
              keyExtractor={(item, index) => 'key' + index}
              renderItem={({item, index}) => {
                return (
                  <Slider index={index}>
                    <AddDevice name={item.SSID} navigation={this.props.navigation} deviceInfo={item} deviceList={deviceList} wifiList={wifiList} />
                  </Slider>
                )
              }}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
  },
  dashBoardContainer: {
    height: '85%',
  },
  dashboard: {
    justifyContent: 'center',
    padding: 20,
    fontWeight: '700',
  },
})

export default Application
