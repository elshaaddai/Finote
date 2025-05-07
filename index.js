/**
 * @format
 */

import {AppRegistry} from 'react-native';

import App from './App';
import './src/config/Firebase';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);