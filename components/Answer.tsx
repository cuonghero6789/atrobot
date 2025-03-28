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
import { useState } from 'react';
import Colors from '@/styles/Colors';
import { CardView } from './Card';
import { LinearGradient } from 'expo-linear-gradient';
import TypeStyles from '@/styles/TypeStyle';
interface Props {
  answer: string;
}
function AnswerComponent({ answer }: Props): JSX.Element {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
      <View style={{ paddingBottom: 16, paddingRight: 16 }}>
        <Image
          source={require(`@/assets/images/ic_luna.png`)}
          style={{ width: 40, height: 40 }}
        />
      </View>
      <View style={{ paddingVertical: 16, flex: 1 }}>
        <View style={styles.body}>
          <LinearGradient colors={["#385C90BF", "#357FE9BF"]} style={{ padding: 16, borderRadius: 12 }}>
            <Text style={[TypeStyles.bodyText2, { color: Colors.white }]}>{answer}</Text>
          </LinearGradient>
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
    borderRadius: 12,
    padding: 16,
    shadowOffset: {
      width: 6,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    shadowColor: "#000",
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
