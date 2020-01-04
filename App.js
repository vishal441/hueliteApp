/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Application from './src/Application';
import { Client } from 'bugsnag-react-native';
const bugsnag = new Client("8728cee51810d1e69db80ff104516c24");

const App = ()  => {
  console.disableYellowBox = true;
  return (
    <Application/>
  );
};

export default App;
