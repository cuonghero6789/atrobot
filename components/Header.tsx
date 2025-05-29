import { colors } from '@/core/styles';
import {
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
const {width} = Dimensions.get('window');
const WIDTH = width / 2;
const HEIGHT = (WIDTH * 56) / 396;
interface Props {
  onPressBack?: () => void;
  onPressSetting?: () => void;
  title?: string;
}
function Header({onPressBack, onPressSetting, title}: Props) {
  return (
    <View style={styles.container}>
      {onPressBack ? (
        <TouchableOpacity onPress={onPressBack}>
          <Image
            source={require(`@/assets/images/ic_back_white.png`)}
            style={{height: 24, width: 24}}
          />
        </TouchableOpacity>
      ) : (
        <View style={{width: 24, height: 24}} />
      )}
      {title ? (
        <Text style={styles.title}>{title}</Text>
      ) : (
        <Image
          source={require(`@/assets/images/ic_header_white.png`)}
          style={{height: HEIGHT, width: WIDTH}}
        />
      )}
      {onPressSetting ? (
        <TouchableOpacity onPress={onPressSetting}>
          <Image
            source={require(`@/assets/images/ic_setting.png`)}
            style={{height: 32, width: 32}}
            tintColor={colors.warningLighter}
          />
        </TouchableOpacity>
      ) : (
        <View style={{width: 24, height: 24}} />
      )}
    </View>
  );
}

export default Header;
const styles = StyleSheet.create({
  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.success,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
