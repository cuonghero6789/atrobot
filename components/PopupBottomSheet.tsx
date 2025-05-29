import React, {
  forwardRef,
  useCallback,
  useRef,
  useImperativeHandle,
} from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Modal } from 'react-native';
import { colors } from '@/core/styles';

export interface CanShowBottomSheet {
  show: () => void;
  hide: () => void;
}

const PopupBottomSheet = forwardRef<
  CanShowBottomSheet,
  { children: any; snapPoints?: string[] }
>(({ children, snapPoints = ['30%'] }: any, ref) => {
  const [visible, setVisible] = React.useState<boolean>(false);
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  useImperativeHandle(ref, () => ({
    show() {
      setVisible(true);
      bottomSheetRef.current?.expand();
    },
    hide() {
      setVisible(false);
      bottomSheetRef.current?.close();
    },
  }));

  // callbacks
  const handleSheetChanges = useCallback(
    (index: number) => {
      console.log('handleSheetChanges', index);
      if (visible && index === -1) {
        setVisible(false);
      }
    },
    [visible],
  );

  // renders
  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.container}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => setVisible(false)} />
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose
          onChange={handleSheetChanges}>
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.contentContainer}>{children}</View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.backgroundTransparent,
  },
  contentContainer: {
    flex: 1
  },
});

export default PopupBottomSheet;
