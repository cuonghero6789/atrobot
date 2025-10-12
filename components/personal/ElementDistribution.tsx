import { colors, fontFamily, spacing, textStyle } from "@/core/styles";
import strings from '@/core/localization';
import { View, Text, useWindowDimensions } from "react-native";
import { PieChartPro } from "react-native-gifted-charts";
import { Distribution } from "./distribution";
import { memo } from "react";
import { useSubjectStore, useYouStore } from "@/core/stores";
const ElementImages = {
    Earth: require('@/assets/images/icons/ic_earth.svg'),
    Air: require('@/assets/images/icons/ic_air.svg'),
    Fire: require('@/assets/images/icons/ic_fire.svg'),
    Water: require('@/assets/images/icons/ic_water.svg'),
}
const ElementDistribution = () => {
    const { width: screenWidth } = useWindowDimensions();
    const { subject } = useSubjectStore(state => state);
    const { dominant } = useYouStore(state => state);

    const elementDistribution = subject?.element_distributions;
    const topElement = elementDistribution && elementDistribution.length > 0
        ? elementDistribution.reduce((max: any, cur: any) => (cur.percent > max.percent ? cur : max), elementDistribution[0])
        : null;

    const data = [
        { value: elementDistribution[0].percent, color: '#90D3FF8F', text: elementDistribution[0].name_label }, // Earth
        { value: elementDistribution[1].percent, color: '#3589E9EB', text: elementDistribution[1].name_label }, // Water
        { value: elementDistribution[2].percent, color: '#8EB3CCBF', text: elementDistribution[2].name_label }, // Fire
        { value: elementDistribution[3].percent, color: '#3589E9EB', text: elementDistribution[3].name_label }, // Air
    ];
    // Responsive chart radius: scale with screen width, clamp to keep layout nice on web fullscreen
    const containerWidth = Math.min(screenWidth - spacing.big * 2, 1024);
    const SIZE = Math.max(120, Math.min(containerWidth * 0.28, 280));

    return (
        <View style={{ alignItems: 'center' }}>
            <Text style={[textStyle.textBold, { textAlign: 'center', marginBottom: spacing.big }]}>{strings.t('elementDist')}</Text>
            <PieChartPro
                donut
                shadow
                innerCircleBorderWidth={6}
                showValuesAsLabels
                showText
                innerCircleBorderColor="transparent"
                innerCircleColor="transparent"
                textColor={colors.black2}
                textSize={12}
                radius={SIZE}
                font="Montserrat-Bold"
                textBackgroundRadius={26}
                data={data}
            />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: spacing.big, paddingVertical: spacing.big }}>
                <Distribution icon={ElementImages[elementDistribution[0].name as keyof typeof ElementImages]} title={elementDistribution[0].name_label} description={Math.ceil(elementDistribution[0].percent).toString() + "%"} />
                <Distribution icon={ElementImages[elementDistribution[1].name as keyof typeof ElementImages]} title={elementDistribution[1].name_label} description={Math.ceil(elementDistribution[1].percent).toString() + "%"} />
                <Distribution icon={ElementImages[elementDistribution[2].name as keyof typeof ElementImages]} title={elementDistribution[2].name_label} description={Math.ceil(elementDistribution[2].percent).toString() + "%"} />
                <Distribution icon={ElementImages[elementDistribution[3].name as keyof typeof ElementImages]} title={elementDistribution[3].name_label} description={Math.ceil(elementDistribution[3].percent).toString() + "%"} />
            </View>
            <View style={{ alignItems: 'flex-start' }}>
                <Text style={[textStyle.textBold2, {color: colors.black3, fontSize: 15}]}>{`${strings.t('dominantElement')}: ${topElement?.name_label ?? ''}`}</Text>
                <Text style={[textStyle.subTitleMedium1, { color: colors.black1, fontSize: 15, fontFamily: fontFamily.regular }]}>{dominant?.element}</Text>
            </View>
        </View>
    )
}

export default memo(ElementDistribution);    