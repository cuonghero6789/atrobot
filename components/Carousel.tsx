import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import spacing from '@/styles/spacing';
import Colors from '@/styles/Colors';
import { useSharedValue } from 'react-native-reanimated';
import { Card } from './Card';

const { width } = Dimensions.get('window');

const data = [
    { key: '1', text: 'Slide 1' },
    { key: '2', text: 'Slide 2' },
    { key: '3', text: 'Slide 3' },
    { key: '4', text: 'Slide 3' },
    { key: '5', text: 'Slide 3' },
    { key: '6', text: 'Slide 3' },
];

export const CAROUSEL_HEIGHT = 171;
export const CAROUSEL_WIDTH = width - 32;

const CustomCarousel = () => {
    const progress = useSharedValue<number>(0);
    const baseOptions = {
        vertical: false,
        width: CAROUSEL_WIDTH,
        height: CAROUSEL_HEIGHT,
    } as const;
    const ref = React.useRef<ICarouselInstance>(null);
    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            /**
             * Calculate the difference between the current index and the target index
             * to ensure that the carousel scrolls to the nearest index
             */
            count: index - progress.value,
            animated: true,
        });
    };

    return (
        <View style={styles.container}>
            <Carousel
                ref={ref}
                {...baseOptions}
                onProgressChange={progress}
                data={data}
                renderItem={({ item }) => (
                    <Card />
                )}
            />
            <Pagination.Basic
                progress={progress}
                data={data}
                dotStyle={{ backgroundColor: "#FFFFFF4D", width: 6, height: 6, borderRadius: 3 }}
                activeDotStyle={{ backgroundColor: Colors.white }}
                containerStyle={{ gap: 5, position: 'absolute', bottom: 8 }}
                onPress={onPressPagination}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: spacing.padding.large,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        width: CAROUSEL_WIDTH,
        height: CAROUSEL_HEIGHT,
        borderWidth: 2,
        borderColor: Colors.white,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.32, // Similar to #00000052
        shadowRadius: 4,
        overflow: 'hidden',
        elevation: 6, // Required for Android
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
    },
    text: {
        fontSize: 24,
        color: '#000',
    },
});

export default CustomCarousel;