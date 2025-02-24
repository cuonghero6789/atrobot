import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';
import Colors from '@/styles/Colors';
interface Props {
  answer: string;
}
function AnswerComponent({answer}: Props): JSX.Element {
  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
      <View style={{paddingBottom: 16, paddingRight: 16}}>
        <Image
          source={require(`@/assets/images/ic_luna.png`)}
          style={{width: 40, height: 40}}
        />
      </View>
      <View style={{paddingVertical: 16, flex: 1}}>
        <Text style={styles.name}>{'Luna'}</Text>
        <View style={styles.body}>
          <Text style={styles.answer}>{answer}</Text>
        </View>
      </View>
    </View>
  );
}

export default AnswerComponent;

const styles = StyleSheet.create({
  answer: {
    fontSize: 14,
    color: Colors.white,
    lineHeight: 24,
  },
  body: {
    backgroundColor: Colors.bgColor7,
    borderRadius: 12,
    padding: 16,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.gray2,
    marginBottom: 6,
  },
  text: {
    fontSize: 12,
    color: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor2,
    paddingHorizontal: 16,
  },
});
