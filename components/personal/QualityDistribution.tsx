import { colors, spacing, textStyle } from "@/core/styles";
import strings from '@/core/localization';
import { View, Text, useWindowDimensions } from "react-native";
import { PieChartPro } from "react-native-gifted-charts";
import { Distribution, InfoChartProperties } from "./distribution";
import { memo } from "react";
import { useSubjectStore, useYouStore } from "@/core/stores";
const QualityImages = {
    Mutable: require('@/assets/images/icons/ic_leading.png'),
    Cardinal: require('@/assets/images/icons/ic_persisent.png'),
    Fixed: require('@/assets/images/icons/ic_flexible.png'),
}
// runtime responsive values computed inside component

const QualityDistribution = () => {
    const { width: screenWidth } = useWindowDimensions();
    const { subject } = useSubjectStore(state => state);
    const { dominant } = useYouStore(state => state);

    const qualityDistribution = subject?.quality_distributions;
    const topQuality = qualityDistribution && qualityDistribution.length > 0
        ? qualityDistribution.reduce((max: any, cur: any) => (cur.percent > max.percent ? cur : max), qualityDistribution[0])
        : null;

    const data = [
        { value: qualityDistribution[0].percent, color: '#3589E9EB', text: qualityDistribution[0].name_label }, // Water
        { value: qualityDistribution[1].percent, color: '#8EB3CCBF', text: qualityDistribution[1].name_label }, // Fire
        { value: qualityDistribution[2].percent, color: '#90D3FF8F', text: qualityDistribution[2].name_label }, // Air
    ];
    // Responsive sizing similar to ElementDistribution
    const containerWidth = Math.min(screenWidth - spacing.big * 2, 1024);
    const SIZE = Math.max(120, Math.min(containerWidth * 0.28, 280));

    return (
        <View style={{ alignItems: 'center', flex: 1 }}>
            <Text style={[textStyle.textBold, { textAlign: 'center', marginVertical: spacing.big }]}>{strings.t('quantityDist')}</Text>
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
            <View style={{ minWidth: containerWidth, flexDirection: 'row', paddingHorizontal: spacing.bigx2, paddingVertical: spacing.big, justifyContent: 'space-between' }}>
                <InfoChartProperties icon={QualityImages[qualityDistribution[0].name as keyof typeof QualityImages]} title={qualityDistribution[0].name_label} description={qualityDistribution[0].percent.toString() + "%"} />
                <View style={{ width: 32 }} />
                <InfoChartProperties icon={QualityImages[qualityDistribution[1].name as keyof typeof QualityImages]} title={qualityDistribution[1].name_label} description={qualityDistribution[1].percent.toString() + "%"} />
                <View style={{ width: 32 }} />
                <InfoChartProperties icon={QualityImages[qualityDistribution[2].name as keyof typeof QualityImages]} title={qualityDistribution[2].name_label} description={qualityDistribution[2].percent.toString() + "%"} />
            </View>
            <View style={{ alignItems: 'flex-start' }}>
                <Text style={[textStyle.textBold2, { color: colors.black3, fontSize: 15 }]}>{`${strings.t('dominantQuantity')}: ${topQuality?.name_label ?? ''}`}</Text>
                <Text style={[textStyle.subTitleMedium1, { fontSize: 15, color: colors.black1 }]}>{dominant?.quality}</Text>
            </View>
        </View>
    )
}

export default memo(QualityDistribution);    