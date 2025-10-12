import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

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
      supportedOrientations={['portrait']}
    >
      <View style={[styles.container, { backgroundColor: 'rgba(255,255,255,0.75)' }]}>
        <ActivityIndicator size="large" color="#2D79E5" />
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
});


