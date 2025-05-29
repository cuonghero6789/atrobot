import { BackButton } from "@/components/Button";
import { Image, ImageBackground } from "expo-image";
import { useRouter } from "expo-router";
import { memo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, StyleSheet } from "react-native";
import { CardItem, CardView } from "@/components/Card";
import { spacing } from "@/core/styles";
import DetailInnerShadowBox from "@/components/DetailInnerShadowBox";
import { useQuestionStore, useAccountStore } from "@/core/stores";

function AnswerScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const answer = useQuestionStore(state => state.answer);
    const loadingAnswer = useQuestionStore(state => state.loadingAnswer);
    const userAccount = useAccountStore(state => state.user);
    const actions = useQuestionStore(state => state.actions);

    return <ImageBackground source={require('@/assets/images/bg_home.png')} style={{ flex: 1, paddingTop: insets.top }}>
        <BackButton onPress={() => router.back()} />
            <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.large, paddingBottom: spacing.big }}>
            <CardView name={userAccount?.display_name} contanerStyle={{ paddingBottom: spacing.extraLarge, marginHorizontal: spacing.large }} />
            <DetailInnerShadowBox
                answer={answer}
                loadingAnswer={loadingAnswer}
                colorStart="#FFFFFFBF"
                colorEnd="#357FE999"
                iconSource={require('@/assets/images/ic_mode.png')} />
        </ScrollView>
    </ImageBackground>
}

export default memo(AnswerScreen);

const styles = StyleSheet.create({

});