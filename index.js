/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
//import App from './App';
import AppNavigation from './App/Navigation/AppNavigation';
AppRegistry.registerComponent(appName, () => AppNavigation);
