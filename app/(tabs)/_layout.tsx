import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image, StyleSheet, View, ImageBackground, Dimensions, Text } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/styles/Colors';
const { width, height } = Dimensions.get('window');
const TAB_HEIGHT = width * 180 / 780;

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.tint,
        tabBarInactiveTintColor: 'white',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarIconStyle: {
          marginTop: 23
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 'bold',
          textAlign: 'center',
          marginRight: 6
        },
        tabBarBackground: () => (
          <ImageBackground source={require('@/assets/images/tabs/ic_tab_bg.png')} style={styles.tabBarBackground} />
        ),
        // tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            height: TAB_HEIGHT,
            borderColor: 'transparent',
            // borderTopLeftRadius: 42, // Rounded top-left corner
            // borderTopRightRadius: 42, // Rounded top-right corner
            // borderColor: '#FFFFFF33', // Semi-transparent border
            // shadowColor: 'white', // Shadow color
            // shadowOffset: { width: 16, height: -16 },
            // shadowOpacity: 0.8,
            // shadowRadius: 42,
            // elevation: 4, // Shadow for Android
            overflow: 'hidden', // Ensure rounded corners are visible
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'HOME',
          tabBarIcon: ({ color, focused }) => <Image source={focused ? require('@/assets/images/tabs/ic_home.png') : require('@/assets/images/tabs/ic_home_white.png')} style={{ width: 42, height: 42 }} tintColor={"inherit"} />,
        }}
      />
      <Tabs.Screen
        name="divine"
        options={{
          title: 'MANIFEST',
          tabBarIcon: ({ color, focused }) => <Image source={focused ? require('@/assets/images/tabs/ic_cosmic.png') : require('@/assets/images/tabs/ic_cosmic_white.png')} style={{ width: 42, height: 42 }} tintColor={"inherit"} />,

        }}
      />
      <Tabs.Screen
        name="starmates"
        options={{
          title: 'STARMATES',
          tabBarIcon: ({ color, focused }) => <Image source={focused ? require('@/assets/images/tabs/ic_star.png') : require('@/assets/images/tabs/ic_star_white.png')} style={{ width: 42, height: 42 }} tintColor={"inherit"} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'CHAT',
          tabBarIcon: ({ color, focused }) => <Image source={focused ? require('@/assets/images/tabs/ic_chat.png') : require('@/assets/images/tabs/ic_chat_white.png')} style={{ width: 42, height: 42 }} tintColor={color} />,
        }}
      />
      <Tabs.Screen
        name="you"
        options={{
          title: 'Setting',
          tabBarIcon: ({ color, focused }) => <Image source={focused ? require('@/assets/images/tabs/ic_setting.png') : require('@/assets/images/tabs/ic_setting_white.png')} style={{ width: 42, height: 42 }} tintColor={color} />,
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'transparent', // Transparent to allow the blur effect to show
    borderWidth: 1, // Border for the tab bar
    borderColor: '#FFFFFF33', // Semi-transparent border color
    shadowColor: '#F4F8FF', // Shadow color
    shadowOffset: { width: 2, height: 2 }, // Shadow offset
    shadowOpacity: 0.8, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 4, // Shadow on Android
  },
  tabBarBackground: {
    width,
    height: TAB_HEIGHT,
    position: 'absolute',
  },
  gradientTextContainer: {
    padding: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    backgroundColor: 'transparent', // Make sure the text has no background
    color: 'transparent',           // Hide default text color
    backgroundClip: 'text',         // This allows the gradient to apply to the text
  },
});