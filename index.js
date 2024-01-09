/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';
import App from './App';

import MesAnnonces from './views/pages/annonces/MesAnnonces';
import MyStacks from './views/navs/MyStacks';

AppRegistry.registerComponent(appName, () => MyStacks);
