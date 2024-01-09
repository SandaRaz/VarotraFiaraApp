import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {PauseCircleIcon, PlayCircleIcon} from 'react-native-heroicons/solid';
import React, {useState} from 'react';
import MyIcon from './MyIcon.tsx';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';

function MusicBar(): React.JSX.Element {
  const [isPlayed, togglePlay] = useState(false);

  const menuPlaySize: string = '100%';
  const otherIconSize: string | number = 20;
  const otherIconColor: string = 'rgba(250,250,250,0.9)';

  return (
    <View style={menuStyles.bottomBar}>
      <View style={menuStyles.otherIcons}>
        <TouchableOpacity style={[menuStyles.bottomComp]}>
          <MyIcon
            component={<FontAwesome6Icon name={'backward-step'} />}
            iconSize={otherIconSize - 2}
            iconColor={otherIconColor}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[menuStyles.bottomComp]}>
          <MyIcon
            component={<FontAwesome6Icon name={'backward'} />}
            iconSize={otherIconSize + 5}
            iconColor={otherIconColor}
          />
        </TouchableOpacity>

        <TouchableOpacity style={[menuStyles.bottomComp, {opacity: 0}]} />

        <TouchableOpacity style={[menuStyles.bottomComp]}>
          <MyIcon
            component={<FontAwesome6Icon name={'forward'} />}
            iconSize={otherIconSize + 5}
            iconColor={otherIconColor}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[menuStyles.bottomComp]}>
          <MyIcon
            component={<FontAwesome6Icon name={'forward-step'} />}
            iconSize={otherIconSize - 2}
            iconColor={otherIconColor}
          />
        </TouchableOpacity>
      </View>

      <View style={menuStyles.playContainer}>
        {isPlayed ? (
          <TouchableOpacity
            style={menuStyles.play}
            onPress={() => togglePlay(!isPlayed)}>
            <PauseCircleIcon
              size={menuPlaySize}
              color={'#1db954'}
              style={{borderRadius: 50}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={menuStyles.play}
            onPress={() => togglePlay(!isPlayed)}>
            <PlayCircleIcon
              size={menuPlaySize}
              color={'#1db954'}
              style={{borderRadius: 50}}
            />
          </TouchableOpacity>
        )}
      </View>

      {/*<View style={menuStyles.playContainer}></View>*/}
    </View>
  );
}

const menuStyles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'flex-end',
    width: '100%',
    height: '8%',
    backgroundColor: 'rgba(200, 200, 200, 0.2)',

    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },

  otherIcons: {
    borderWidth: 0,
    borderColor: 'blue',

    width: '100%',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  playContainer: {
    position: 'absolute',
    bottom: 0,

    backgroundColor: 'rgba(66,66,66,1)',
    width: '17%',
    aspectRatio: 1,

    borderRadius: 50,

    justifyContent: 'center',
    alignItems: 'center',
  },

  play: {
    position: 'absolute',
    bottom: 0,

    backgroundColor: 'rgba(66,66,66,0)',
    width: '100%',
    aspectRatio: 1,

    borderRadius: 50,

    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomComp: {
    // backgroundColor: 'blue',
    height: '72%',

    marginLeft: '1%',
    marginRight: '1%',
    marginTop: '1%',
    marginBottom: '2%',

    borderRadius: 10,

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomIcon: {
    resizeMode: 'contain',
    color: 'black',
  },

  iconStyle: {
    // color: 'rgba(120,120,120, 0.9)',
    color: 'rgba(255,255,255, 1)',
    //color: 'rgb(87,180,103)',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

export default MusicBar;
