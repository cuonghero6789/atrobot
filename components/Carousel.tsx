import React from 'react';
import { View, Dimensions, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { colors, spacing } from '@/core/styles';
import { useSharedValue } from 'react-native-reanimated';
import { Card } from './Card';
import { DailyModel, ScoreModel } from '@/core/types/atro';
import { SkeletonLoader } from './loading/LoadingView';

const { width } = Dimensions.get('window');

export const CAROUSEL_HEIGHT = 191;

interface Props {
    daily: DailyModel[];
    scores: ScoreModel[];
}

const CustomCarousel = ({ daily, scores }: Props) => {

    const progress = useSharedValue<number>(0);
    const { width: screenWidth } = useWindowDimensions();
    // Responsive width: keep margins on small screens, cap max width for large web screens
    const carouselWidth = Math.min(screenWidth - spacing.large * 2, 1024);
    const baseOptions = {
        vertical: false,
        width: carouselWidth,
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

    if (!daily || daily?.length <= 0) return <SkeletonLoader />;

    return (
        <View style={[
            styles.container,
            {
                width: carouselWidth,
                height: CAROUSEL_HEIGHT,
                marginLeft: Platform.OS === 'web' ? 0 : 0,
                alignSelf: 'center',
            }
        ]}>
            <Carousel
                ref={ref}
                {...baseOptions}
                onProgressChange={progress}
                data={daily}
                renderItem={({ item }) => (
                    <Card daily={item} score={scores?.find(score => score.key === item.key)} />
                )}
            />
            <Pagination.Basic
                progress={progress}
                data={daily}
                dotStyle={{ backgroundColor: "#FFFFFF4D", width: 6, height: 6, borderRadius: 3 }}
                activeDotStyle={{ backgroundColor: colors.white }}
                containerStyle={{ gap: 5, position: 'absolute', bottom: 8 }}
                onPress={onPressPagination}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.white,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.32, // Similar to #00000052
        shadowRadius: 4,
        overflow: 'hidden',
        // elevation: 6, // Required for Android
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