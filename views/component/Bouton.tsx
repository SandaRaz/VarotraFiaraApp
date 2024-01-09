import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface BoutonProps {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  radius?: number;
}

const Bouton: React.FC<BoutonProps> = ({
  label,
  onPress,
  style,
  labelStyle,
  radius,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        radius != null ? {borderRadius: radius} : null,
        style,
      ]}>
      <Text style={[styles.title, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,50, 250, 0.8)',
    height: 50,

    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
});

export default Bouton;
