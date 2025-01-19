import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image, StyleSheet, View, ImageBackground, Dimensions } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { BlurView } from 'expo-blur';
const { width, height } = Dimensions.get('window');
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarIconStyle:{
          margin: 4
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarBackground: () => (
          <BlurView
            // style={StyleSheet.absoluteFill}
            intensity={20} // Adjust the blur intensity
            tint="light" // Options: "light", "dark", or "default"
          />
        ),
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            backgroundColor:Colors["light"].tabBackground,
            borderTopLeftRadius: 42,
            borderTopRightRadius: 42,
            height:107,
            borderWidth: 1,
            borderColor: '#FFFFFF33',
            shadowColor: '#F4F8FF',
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 4,
            elevation: 4, // For Android shadow
            borderTopWidth: 0,
            overloay: 'hidden',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Image source={require('@/assets/images/tabs/ic_home.png')} style={{ width: 28, height: 28 }} tintColor={color}  />,
        }}
      />
      <Tabs.Screen
        name="divine"
        options={{
          title: 'divine',
          tabBarIcon: ({ color }) => <Image source={require('@/assets/images/tabs/ic_divine.png')} style={{ width: 28, height: 28 }} tintColor={color}  />,
        }}
      />
        <Tabs.Screen
        name="chat"
        options={{
          title: 'chat',
          tabBarIcon: ({ color }) => <Image source={require('@/assets/images/tabs/ic_chat.png')} style={{ width: 28, height: 28 }} tintColor={color}  />,
        }}
      />
        <Tabs.Screen
        name="you"
        options={{
          title: 'you',
          tabBarIcon: ({ color }) => <Image source={require('@/assets/images/tabs/ic_you.png')} style={{ width: 28, height: 28 }} tintColor={color}  />,
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
});