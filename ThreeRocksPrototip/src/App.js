import React from 'react';
import {YellowBox} from 'react-native'
import Routes from './routes'

import { LogBox } from 'react-native';
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;
export default function App() {
  return (
      <Routes />
  );
}
