import { Image, View } from "react-native";

// This is a shim for web and Android where the tab bar is generally opaque.
export default <Image source={require('@/assets/images/tabs/ic_tab_bg.png')} style={{ width: '100%', height: '100%', position: 'absolute', bottom: 0 }} />;

export function useBottomTabOverflow() {
  return 0;
}
