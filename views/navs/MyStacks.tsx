import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NavbarStack from './Navbar.tsx';
import {CompteStack} from '../pages/comptes/Compte.tsx';

const Stack = createStackNavigator();

const MyStacks: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'NavbarStack'}>
        <Stack.Screen
          name={'NavbarStack'}
          component={NavbarStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'CompteStack'}
          component={CompteStack}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStacks;
