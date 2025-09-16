import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import strings from '../../core/localization';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment-timezone';
import SearchInput from '../../components/SearchInput';
import { colors, spacing } from "@/core/styles"
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAccountStore } from '@/core/stores';

function TimeZonesScreen(): JSX.Element {
  const router = useRouter();
  const userTmp = useAccountStore(state => state.userTmp);
  const actions = useAccountStore(state => state.actions);
  const allTimezonesRef = useRef<string[]>(moment.tz.names());
  const [timeZone, setTimeZone] = React.useState<string[]>(allTimezonesRef.current);

  const insets = useSafeAreaInsets();
  const { name } = useLocalSearchParams<{ name: string }>();
  const [text, setText] = React.useState('');

  useEffect(() => {
    setUserInfo({ timezone: name });
  }, [name]);

  const prettify = useCallback((tz: string) => tz.replace(/_/g, ' '), []);

  const renderItem = useCallback(
    ({ item }: { item: string }) => {
      const pretty = prettify(item);
      const offset = moment.tz(item).format('Z');
      const now = moment().tz(item).format('HH:mm');
      const selected = userTmp?.timezone === item;
      return (
        <TouchableOpacity
          key={item}
          onPress={() => {
            setUserInfo({ timezone: item });
          }}
          style={[styles.row, selected ? styles.rowSelected : undefined]}
          activeOpacity={0.8}
        >
          <View style={{ flex: 1 }}>
            <Text style={[styles.rowTitle, selected ? styles.rowTitleSelected : undefined]}>{pretty}</Text>
            <Text style={styles.rowSub}>{`GMT${offset} · ${now}`}</Text>
          </View>
          {selected && (
            <Text style={styles.tick}>✓</Text>
          )}
        </TouchableOpacity>
      );
    },
    [userTmp?.timezone, prettify],
  );

  const setUserInfo = useCallback((data: any) => {
    actions.setAccountTmp({
      ...userTmp,
      ...data
    });
  }, [userTmp]);

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
            setTimeZone(allTimezonesRef.current);
          }}
          text={text}
          onChangeText={(value: string) => {
            setText(value);
            const query = value.trim().toUpperCase();
            const data = allTimezonesRef.current.filter(item => item.toUpperCase().includes(query));
            setTimeZone(data);
          }}
          placeholder={strings.t("inputTimezone")}
        />
        <FlatList
          renderItem={renderItem}
          data={timeZone}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
          keyExtractor={item => item}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          initialNumToRender={20}
          windowSize={10}
          maxToRenderPerBatch={20}
          removeClippedSubviews
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
  row: {
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSelected: {
    backgroundColor: 'rgba(255,255,255,0.30)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)'
  },
  rowTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  rowTitleSelected: {
    color: '#fff'
  },
  rowSub: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginTop: 4,
  },
  tick: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: spacing.large,
  },
  container: {
    flex: 1,
  },
});
