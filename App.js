/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import AppStackNavigator from "./src/routes/Routes";
import {Provider} from 'react-redux';
import {store} from './src/redux/ReduxStore';

const App = ()  => {
  console.disableYellowBox = true;
  return (
    <Provider store = {store}>
      <AppStackNavigator />
    </Provider>
  );
};

export default App;
