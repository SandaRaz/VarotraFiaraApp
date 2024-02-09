import {ActivityIndicator, View} from 'react-native';

function Wait(): React.JSX.Element {
  return (
    <View style={{marginTop: '50%'}}>
      <ActivityIndicator size={'large'} color={'#0000ff'} />
    </View>
  );
}

export default Wait;
