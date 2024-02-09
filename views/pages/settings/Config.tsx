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
import React, {useEffect, useMemo, useState} from 'react';
import {ArrowLeftIcon, GlobeAltIcon} from 'react-native-heroicons/solid';
import Input from '../../component/Input.tsx';
import Bouton from '../../component/Bouton.tsx';
import {useNavigation} from '@react-navigation/native';
import ConfigManager, {
  ConfigData,
} from '../../../models/class/db/ConfigManager.ts';

function Config(): React.JSX.Element {
  const configManager = useMemo(() => new ConfigManager(), []);
  const navigation = useNavigation<any>();

  const iconColor = '#cd1f90';
  const validButtonColor = '#6C40C3';

  // -------------------- GET VALUE STATES ---------------------

  const [getBaseUrl, setBaseUrl] = useState('');
  const handleSetBaseUrl = (value: string) => {
    setBaseUrl(value);
  };

  const [currentConfig, setCurrentConfig] = useState<ConfigData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await configManager.findById('CFG7001');
        setCurrentConfig(result);
      } catch (error) {
        console.error('Error fetching current config:', error);
      }
    };
    fetchData();

    // fetchData();
  }, [configManager]);

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
            navigation.navigate('NavbarStack', {screen: 'Annonces'});
          }}
          style={GlobalStyles.titleBarIcon}>
          <ArrowLeftIcon color={'#6C40C3'} size={'60%'} />
        </TouchableOpacity>
        <Text style={GlobalStyles.titleBarLabel}>
          Configuration VAROTRAFIARA
        </Text>
      </View>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollable}>
        <View style={{marginTop: '20%'}} />

        <View style={styles.container}>
          <View style={styles.currentConfigContainer}>
            <Text style={styles.currentConfigLabel}>Base Url actuel: </Text>
            {currentConfig !== null ? (
              <Text style={styles.currentConfigValue}>
                {currentConfig.baseUrl}
              </Text>
            ) : (
              <Text style={styles.currentConfigValue}>Chargement...</Text>
            )}
          </View>

          <Input
            title={'Base url du site (ex: http://localhost:8080)'}
            placeholder={'www.example.com'}
            icon={<GlobeAltIcon />}
            iconColor={iconColor}
            putValueTo={handleSetBaseUrl}
          />

          <View style={[styles.buttonContainer]}>
            <Bouton
              label={'Enregistrer'}
              labelStyle={styles.buttonLabel}
              style={[
                styles.button,
                {
                  backgroundColor: validButtonColor,
                },
              ]}
              onPress={async () => {
                const idConfig: string = 'CFG7001';
                const exist: boolean = await configManager.exist(idConfig);
                if (exist) {
                  configManager.updateData(idConfig, getBaseUrl);
                  const newResult = await configManager.findById('CFG7001');
                  setCurrentConfig(newResult);
                } else {
                  configManager.insertData(idConfig, getBaseUrl);
                  const newResult = await configManager.findById('CFG7001');
                  setCurrentConfig(newResult);
                }
              }}
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
    fontSize: 13,
    fontFamily: 'Poppins-Light',
  },

  buttonSB: {
    width: '45%',
    height: '100%',

    marginLeft: '5%',
    backgroundColor: 'rgba(250,250,250,0)',
  },

  buttonSBLabel: {
    fontSize: 13,
    fontFamily: 'Poppins-Light',
  },

  currentConfigContainer: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'rgba(250,250,250,0)',

    flexDirection: 'row',
    // justifyContent: 'space-between',
  },

  currentConfigLabel: {
    color: 'rgba(250,250,250,0.9)',
    fontSize: 13,
    fontFamily: 'Poppins-Bold',
  },

  currentConfigValue: {
    color: 'rgba(250,250,250,0.9)',
    fontSize: 13,
    fontFamily: 'Poppins-Regular',

    marginLeft: '2%',
  },
});

export default Config;
