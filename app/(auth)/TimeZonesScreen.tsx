import React, { useCallback, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import strings from '../../localization';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import moment from 'moment-timezone';
import SearchInput from '../../components/SearchInput';
import Colors from '@/styles/Colors';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import spacing from '@/styles/spacing';
import useAuthStore from '@/stores/AuthStore';
import useAccountStore from '@/stores/AccountStore';

function TimeZonesScreen(): JSX.Element {
  const router = useRouter();
  const user = useAccountStore(state => state.user);
  const actions = useAccountStore(state => state.actions);
  const [timeZone, setTimeZone] = React.useState(moment.tz.names());

  const insets = useSafeAreaInsets();
  const { name } = useLocalSearchParams<{ name: string }>();
  const [text, setText] = React.useState('');

  console.log("time zone: " + JSON.stringify(user));
  
  useEffect(() => {
    setUserInfo({ timezone: name });
  }, [name]);

  const renderItem = useCallback(
    ({ item }: { item: string }) => {
      return (
        <TouchableOpacity
          key={item}
          onPress={() => {
            setUserInfo({ timezone: item });
            // router.back();
          }}
          style={user?.timezone == item ? styles.itemSelected : styles.item}>
          <Text style={{ fontSize: 16, color: Colors.line2 }}>{item}</Text>
        </TouchableOpacity>
      );
    },
    [user],
  );

  const setUserInfo = useCallback((data: any) => {
    actions.setAccount({
      ...user,
      ...data
    });
  }, [user]);

  return (
    <SafeAreaView edges={[]} style={[styles.container]}>
      <LinearGradient
        colors={['#2D79E5', '#B2D1FD']}
        style={[styles.body, { paddingTop: insets.top }]}
      >
        <SearchInput
          onPressBack={() => router.back()}
          onPressClose={() => {
            setText('');
            setUserInfo({ timezone: moment.tz.names() });
          }}
          text={text}
          onChangeText={(value: string) => {
            setText(value);
            const data = moment.tz
              .names()
              .filter(item => item.toUpperCase().includes(value.toUpperCase()));
            setTimeZone(data);
          }}
          placeholder={strings.t("inputTimezone")}
        />
        <FlatList
          renderItem={renderItem}
          data={timeZone}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
          keyExtractor={item => item}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

export default TimeZonesScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  itemSelected: {
    backgroundColor: Colors.green,
    paddingHorizontal: spacing.padding.large,
    paddingVertical: spacing.padding.base,
    borderRadius: spacing.borderRadius.extraLarge,
  },
  item: {
    padding: spacing.padding.large,
  },
  container: {
    flex: 1,
  },
});
