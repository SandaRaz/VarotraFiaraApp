import {StyleSheet} from 'react-native';

const GlobalStyles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  titleBar: {
    position: 'absolute',
    top: '2%',
    left: '2%',
    right: '2%',
    zIndex: 1,

    backgroundColor: 'rgba(250,250,250,0.9)',
    width: '96%',
    height: '8%',
    borderRadius: 10,

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleBarIcon: {
    // backgroundColor: 'red',
    width: '20%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',

    marginLeft: '-5%',
    paddingLeft: '0%',
  },
  titleBarLabel: {
    width: '60%',

    color: '#6C40C3',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
});

export default GlobalStyles;
