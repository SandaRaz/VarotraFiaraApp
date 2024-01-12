import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BoiteNotification from '../pages/notifications/BoiteNotification.tsx';
import MesAnnonces from '../pages/annonces/MesAnnonces.tsx';
import NouvelleAnnonce from '../pages/annonces/NouvelleAnnonce.tsx';
import Compte from '../pages/comptes/Compte.tsx';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  BellIcon,
  ListBulletIcon,
  SquaresPlusIcon,
  UserIcon,
} from 'react-native-heroicons/solid';
import {Text} from 'react-native';
import Inscription from '../pages/comptes/Inscription.tsx';
import Login from '../pages/comptes/Login.tsx';

const Tab = createBottomTabNavigator();
const defaultColor: string = '#6C40C3';
const focusedColor: string = '#cd1f90';
const iconeSize: string | number = 17;

const {width, height} = Dimensions.get('window');

const NavbarStack: React.FC = () => {
  return (
    <View style={{width, height}}>
      <Tab.Navigator
        screenOptions={{tabBarStyle: [styles.navbar]}}
        initialRouteName={'Annonces'}>
        <Tab.Screen
          name={'Annonces'}
          component={MesAnnonces}
          options={({route}) => ({
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <ListBulletIcon
                color={focused ? focusedColor : defaultColor}
                size={iconeSize}
              />
            ),
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.label,
                  {color: focused ? focusedColor : defaultColor},
                ]}>
                {route.name}
              </Text>
            ),
          })}
        />
        <Tab.Screen
          name={'Nouvelle'}
          component={NouvelleAnnonce}
          options={({route}) => ({
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <SquaresPlusIcon
                color={focused ? focusedColor : defaultColor}
                size={iconeSize}
              />
            ),
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.label,
                  {color: focused ? focusedColor : defaultColor},
                ]}>
                {route.name}
              </Text>
            ),
          })}
        />
        <Tab.Screen
          name={'Notifications'}
          component={BoiteNotification}
          options={({route}) => ({
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <BellIcon
                color={focused ? focusedColor : defaultColor}
                size={iconeSize}
              />
            ),
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.label,
                  {color: focused ? focusedColor : defaultColor},
                ]}>
                {route.name}
              </Text>
            ),
          })}
        />
        <Tab.Screen
          name={'Compte'}
          component={Login}
          options={({route}) => ({
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <UserIcon
                color={focused ? focusedColor : defaultColor}
                size={iconeSize}
              />
            ),
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.label,
                  {color: focused ? focusedColor : defaultColor},
                ]}>
                {route.name}
              </Text>
            ),
          })}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 35,
    left: '2%',
    right: '2%',
    flex: 1,

    width: '96%',
    height: 45,
    paddingTop: '1%',
    paddingBottom: '1%',
    alignSelf: 'center',
    borderRadius: 8,

    backgroundColor: 'rgba(250,250,250, 1)',
    elevation: 10,
  },

  label: {
    color: '#6C40C3',
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
  },
});

export default NavbarStack;
