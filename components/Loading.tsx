import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';

export interface CanShowLoading {
  show: () => void;
  hide: () => void;
}

const Loading = forwardRef<CanShowLoading, {}>((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  useImperativeHandle(ref, () => ({
    show() {
      setVisible(true);
    },
    hide() {
      setVisible(false);
    },
  }));

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      supportedOrientations={['portrait']}>
      <View
        style={[styles.container, {backgroundColor: 'rgba(255,255,255,0.75)'}]}>
        <LottieView
          source={require('@/assets/lottie/loader.json')}
          style={[styles.animationStyle, {width: 100, height: 100}]}
          autoPlay
          loop
        />
      </View>
    </Modal>
  );
});

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationStyle: {
    height: '100%',
    width: '100%',
  },
});
