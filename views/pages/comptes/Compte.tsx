import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Connexion from './Connexion.tsx';
import Inscription from './Inscription.tsx';
import Inscription2 from './Inscription2.tsx';

function Compte(): React.JSX.Element {
  return (
    <View>
      <Text>aaa</Text>
      <Text>aaa</Text>
    </View>
  );
}

const Stack = createStackNavigator();
const CompteStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={'Inscription'}>
      <Stack.Screen
        name={'Inscription'}
        component={Inscription}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'Inscription2'}
        component={Inscription2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'Login'}
        component={Connexion}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export {CompteStack};
export default Compte;
