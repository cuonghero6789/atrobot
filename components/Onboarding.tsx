import React from 'react';
import { Modal, View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Image, ImageBackground } from 'expo-image';
import { colors, spacing, textStyle } from '@/core/styles';
import { Button } from './Button';
import strings from '@/core/localization';

const { width, height } = Dimensions.get('window');

type OnboardingProps = {
  visible: boolean;
  onClose: () => void;
  onGoToChat: () => void;
  onGoToManifest: () => void;
};

const SLIDES = [
  {
    key: 'chat',
    titleKey: 'onboarding_chat_title',
    subtitleKey: 'onboarding_chat_subtitle',
    image: require('@/assets/images/ic_luna.png'),
  },
  {
    key: 'manifest',
    titleKey: 'onboarding_manifest_title',
    subtitleKey: 'onboarding_manifest_subtitle',
    image: require('@/assets/images/ic_mode3.png'),
  },
  {
    key: 'timing',
    titleKey: 'onboarding_timing_title',
    subtitleKey: 'onboarding_timing_subtitle',
    image: require('@/assets/images/ic_mode.png'),
  },
];

export default function Onboarding({ visible, onClose, onGoToChat, onGoToManifest }: OnboardingProps) {
  const scrollRef = React.useRef<ScrollView>(null);
  const [index, setIndex] = React.useState<number>(0);

  const onScroll = React.useCallback((e: any) => {
    const x = e?.nativeEvent?.contentOffset?.x || 0;
    const i = Math.round(x / width);
    if (i !== index) setIndex(i);
  }, [index]);

  const goTo = (i: number) => {
    scrollRef.current?.scrollTo({ x: i * width, animated: true });
    setIndex(i);
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <ImageBackground source={require('@/assets/images/bg_home.png')} style={styles.backdrop}>
        <View style={styles.container}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{ alignItems: 'center' }}
          >
            {SLIDES.map((s) => (
              <View key={s.key} style={styles.slide}>
                <Image source={s.image} style={{ width: 120, height: 120 }} contentFit="contain" />
                <Text style={[textStyle.title, styles.title]}>{strings.t(s.titleKey as any)}</Text>
                <Text style={[textStyle.bodyText2, styles.subtitle]}>{strings.t(s.subtitleKey as any)}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.dots}>
            {SLIDES.map((_, i) => (
              <TouchableOpacity key={`dot-${i}`} onPress={() => goTo(i)} style={[styles.dot, i === index && styles.dotActive]} />
            ))}
          </View>
          <View style={styles.actions}>
            <Button title={strings.t('onboarding_start_chat')} onPress={onGoToChat} buttonStyle={{ paddingHorizontal: 24 }} />
            <View style={{ height: spacing.large }} />
            <Button title={strings.t('onboarding_explore_manifest')} onPress={onGoToManifest} buttonStyle={{ paddingHorizontal: 24 }} />
            <TouchableOpacity onPress={onClose} style={{ marginTop: spacing.large }}>
              <Text style={[textStyle.text, { color: colors.black3 }]}>{strings.t('onboarding_later')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.backgroundTransparent,
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  slide: {
    width,
    alignItems: 'center',
    paddingHorizontal: spacing.large,
  },
  title: {
    textAlign: 'center',
    marginTop: spacing.large,
  },
  subtitle: {
    textAlign: 'center',
    marginTop: spacing.sm,
    color: colors.black4,
    fontSize: 16
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
    position: 'absolute',
    top: height / 2 + 62,
    marginTop: spacing.large,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF4D',
  },
  dotActive: {
    backgroundColor: colors.white,
  },
  actions: {
    alignItems: 'center',
    marginTop: 'auto',
  },
});


