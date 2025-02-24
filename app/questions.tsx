import { BackButton } from "@/components/Button";
import { Image, ImageBackground } from "expo-image";
import { useRouter } from "expo-router";
import { memo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, StyleSheet } from "react-native";
import { CardItem, CardView } from "@/components/Card";
import spacing from "@/styles/spacing";
import InnerShadowBox from "@/components/InnerShadowBox";
import ChooseTypeTopics from "@/components/manifest/ChooseTypeTopics";

function QuestionsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    return <ImageBackground source={require('@/assets/images/bg_home.png')} style={{ flex: 1, paddingTop: insets.top }}>
        <BackButton onPress={() => router.back()} />
        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.padding.large, paddingBottom: spacing.padding.big }}>
            <CardView contanerStyle={{ paddingBottom: spacing.padding.extraLarge, marginHorizontal: spacing.margin.large }} />
            <ChooseTypeTopics />
            <InnerShadowBox
                onPress={() => {
                    router.push({
                        pathname: '/AnswerScreen',
                        params: {
                            id: 1,
                        }
                    })
                 }}
                colorStart="#FFFFFFBF"
                colorEnd="#357FE999"
                iconSource={require('@/assets/images/ic_mode.png')} />
            <InnerShadowBox
                onPress={() => { }}
                colorStart="#FFFFFFBF"
                colorEnd="#21476D9E"
                iconSource={require('@/assets/images/ic_mode1.png')} />
            <InnerShadowBox
                onPress={() => { }}
                colorStart="#FFFFFFBF"
                colorEnd="#0E0F3C99"
                iconSource={require('@/assets/images/ic_mode3.png')} />
        </ScrollView>
    </ImageBackground>
}

export default memo(QuestionsScreen);

const styles = StyleSheet.create({

});