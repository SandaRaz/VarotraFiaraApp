import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Notifications from '../pages/Notifications.tsx';
import MesAnnonces from '../pages/annonces/MesAnnonces.tsx';
import AjoutAnnonce from '../pages/annonces/AjoutAnnonce.tsx';
import Compte from '../pages/comptes/Compte.tsx';
import {StyleSheet} from 'react-native';
import {
  BellIcon,
  ListBulletIcon,
  SquaresPlusIcon,
  UserIcon,
} from 'react-native-heroicons/solid';
import {Text} from 'react-native';
import Inscription from "../pages/comptes/Inscription.tsx";

const Tab = createBottomTabNavigator();
const defaultColor: string = '#6C40C3';
const focusedColor: string = '#cd1f90';
const iconeSize: string | number = '90%';

const NavbarStack: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{tabBarStyle: styles.navbar}}
      initialRouteName={'Annonces'}>
      <Tab.Screen
        name={'Notifications'}
        component={Notifications}
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
        component={AjoutAnnonce}
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
        name={'Compte'}
        component={Inscription}
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
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: '2%',
    left: '2%',
    right: '2%',

    width: '96%',
    height: '8%',
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
