import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CalendarIcon,
  TicketIcon,
  XMarkIcon,
} from 'react-native-heroicons/solid';
import Input from '../../component/Input.tsx';
import DatePicker, {parseDateHour} from '../../component/DatePicker.tsx';
import React, {useState} from 'react';
import Bouton from '../../component/Bouton.tsx';
import {VenteData} from '../../../models/class/Types.ts';

function ModifStatut({
  idAnnonce,
  handleShowModifStatut,
}: {
  idAnnonce: string | number;
  handleShowModifStatut: (event: GestureResponderEvent) => void;
}): React.JSX.Element {
  const iconColor: string = '#CD1F90';
  const titleColor: string = 'rgb(30,30,30)';

  const [getPrix, setPrix] = useState('0');
  const handleSetPrix = (value: string) => {
    setPrix(value);
  };
  const [getDateVente, setDateVente] = useState(new Date());
  const handleSetDateVente = (value: any) => {
    setDateVente(value);
  };

  console.log('Date de vente: ' + parseDateHour(getDateVente));

  const saveVente = () => {
    const vente: VenteData = {
      id: '',
      idAnnonce: idAnnonce,
      prix: parseFloat(getPrix),
      dateVente: parseDateHour(getDateVente),
    };
    console.log(
      `Objet vente: ${vente.idAnnonce} \n ${vente.prix} \n ${vente.dateVente}`,
    );
    // ----- call web service -------
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.quitIcon}
          onPress={handleShowModifStatut}>
          <XMarkIcon size={'100%'} color={'rgb(30,30,30)'} />
        </TouchableOpacity>
        <Text style={styles.headerLabel}>Modification de statut</Text>
      </View>
      <View>
        <Input
          title={'Prix de vente'}
          titleColor={titleColor}
          placeholder={'000,00'}
          icon={<TicketIcon />}
          iconColor={iconColor}
          keyboardType={'numeric'}
          style={styles.input}
          textStyle={styles.inputText}
        />
        <DatePicker
          title={'Date du vente'}
          titleColor={'rgb(30,30,30)'}
          putValueTo={handleSetDateVente}
          style={styles.input}
          icon={<CalendarIcon />}
          iconColor={iconColor}
        />
      </View>
      <View style={[styles.buttonContainer]}>
        <Bouton
          label={'Vendu'}
          labelStyle={styles.buttonLabel}
          style={[styles.button]}
          onPress={saveVente}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: '0%',
    width: '80%',
    height: 'auto',

    // borderRadius: 10,
    backgroundColor: 'rgba(250,250,250,1)',
  },

  header: {
    height: '15%',
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    backgroundColor: 'rgba(100,100,100,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLabel: {
    color: '#6C40C3',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  quitIcon: {
    position: 'absolute',
    left: '1%',
    height: '80%',
    aspectRatio: 1,
    // backgroundColor: 'red',
  },

  input: {
    backgroundColor: 'rgba(30,30,30,0.5)',
  },
  inputText: {
    color: 'rgb(30,30,30)',
  },

  buttonContainer: {
    // backgroundColor: 'red',
    width: '90%',
    height: 45,
    marginTop: '3%',
    marginBottom: '10%',

    flex: 1,
    // flexWrap: 'wrap',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },

  button: {
    width: '35%',
    height: '100%',
    backgroundColor: '#6C40C3',

    marginLeft: '5%',
  },

  buttonLabel: {
    fontSize: 13,
    fontFamily: 'Poppins-Light',
  },
});

export default ModifStatut;
