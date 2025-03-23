// filepath: /Users/phancuong/gbv/atrobot/components/SkeletonLoader.tsx
import Colors from '@/styles/Colors';
import spacing from '@/styles/spacing';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import ContentLoader, { Rect, Facebook } from 'react-content-loader/native';
import { Dimensions, View, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');
const WIDTH = width - 110;

const SkeletonLoader = () => (
    <LinearGradient
        colors={['rgba(45, 121, 229, 0.52)', 'rgba(39, 72, 119, 0.72)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.card}
    >
            <ContentLoader
                height={140}
                speed={1}
                backgroundColor={'rgba(45, 121, 229, 0.52)'}
                foregroundColor={Colors.white}
                viewBox="0 0 380 70"
            >
                {/* Only SVG shapes */}
                <Rect x="16" y="0" rx="5" ry="5" width="44" height="44" />
                <Rect x="16" y="50" rx="5" ry="5" width="44" height="6" />
                <Rect x="23" y="60" rx="5" ry="5" width="30" height="6" />
                <Rect x="80" y="0" rx="4" ry="4" width={WIDTH} height="8" />
                <Rect x="80" y="18" rx="3" ry="3" width="250" height="8" />
                <Rect x="80" y="36" rx="3" ry="3" width="200" height="8" />
                <Rect x="80" y="54" rx="3" ry="3" width="100" height="8" />
            </ContentLoader>
    </LinearGradient>

);
const styles = StyleSheet.create({
    card: {
        flex: 1,
        marginHorizontal: 16,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: Colors.white,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.32, // Similar to #00000052
        shadowRadius: 4,
        overflow: 'hidden',
        elevation: 6, // Required for Android
    },
})
export {
    SkeletonLoader
}