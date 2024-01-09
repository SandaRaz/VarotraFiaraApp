import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GlobalStyles from '../../assets/GlobalStyles.tsx';
import React, {useState} from 'react';
import {
  ArrowLeftIcon,
  HomeIcon,
  LockClosedIcon,
} from 'react-native-heroicons/solid';
import Input from '../../component/Input.tsx';
import {
  PencilIcon,
  CalendarIcon,
  UserGroupIcon,
} from 'react-native-heroicons/solid';
import DatePicker from '../../component/DatePicker.tsx';
import Select, {Option} from '../../component/Select.tsx';
import Bouton from '../../component/Bouton.tsx';
import {useNavigation} from '@react-navigation/native';

function Inscription2(): React.JSX.Element {
  const navigation = useNavigation<any>();

  const iconColor = '#cd1f90';
  const validButtonColor = '#6C40C3';

  // -------------------- GET VALUE STATES ---------------------

  const [getMail, setNom] = useState('');
  const handleSetNom = (value: string) => {
    setNom(value);
  };

  const [getMdp, setMdp] = useState('');
  const handleSetMdp = (value: string) => {
    setMdp(value);
  };

  const [getConfirmedMdp, setConfirmedMdp] = useState('');
  const handleSetConfirmedMdp = (value: string) => {
    setConfirmedMdp(value);
  };

  // -----------------------------------------------------------

  return (
    <SafeAreaView>
      <StatusBar />

      <ImageBackground
        source={require('../../assets/images/background.jpg')}
        style={GlobalStyles.backgroundImage}
        blurRadius={50}
      />

      <View style={GlobalStyles.titleBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CompteStack', {screen: 'Inscription'});
          }}
          style={GlobalStyles.titleBarIcon}>
          <ArrowLeftIcon color={'#6C40C3'} size={'60%'} />
        </TouchableOpacity>
        <Text style={GlobalStyles.titleBarLabel}>Finalisation</Text>
      </View>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollable}>
        <View style={{marginTop: '20%'}} />

        <View style={styles.container}>
          <Input
            title={'Nom'}
            placeholder={'Votre nom'}
            icon={<PencilIcon />}
            iconColor={iconColor}
            putValueTo={handleSetNom}
          />
          <Input
            title={'Nouveau mot de passe'}
            placeholder={'mot de passe'}
            icon={<LockClosedIcon />}
            iconColor={iconColor}
            isPassword={true}
            putValueTo={handleSetMdp}
          />

          <Input
            title={'Confirmer le mot de passe'}
            placeholder={'mot de passe'}
            icon={<LockClosedIcon />}
            iconColor={iconColor}
            isPassword={true}
            valueToConfirm={getMdp}
            putValueTo={handleSetConfirmedMdp}
          />
          <View style={[styles.buttonContainer]}>
            <Bouton
              label={"S'inscrire"}
              labelStyle={styles.buttonLabel}
              style={[
                styles.button,
                {
                  backgroundColor: validButtonColor,
                },
              ]}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollable: {
    // backgroundColor: 'blue',
    minHeight: '100%',

    marginTop: '0%',
    marginBottom: '0%',
  },

  container: {
    width: '95%',
    height: '100%',

    flex: 1,
    // backgroundColor: 'red',

    alignSelf: 'center',
    marginBottom: '20%',
  },

  buttonContainer: {
    // backgroundColor: 'white',
    width: '90%',
    height: 45,
    marginTop: '9%',
    marginBottom: '5%',

    flex: 1,
    // flexWrap: 'wrap',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },

  button: {
    width: '35%',
    height: '100%',

    marginLeft: '5%',
  },

  buttonLabel: {
    fontSize: 15,
    fontFamily: 'Poppins-Light',
  },
});

export default Inscription2;
