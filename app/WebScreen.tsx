import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '@/core/styles';
import Header from '@/components/Header';

function WebScreen() {
    const router = useRouter();
    const { uri, title } = useLocalSearchParams<{ uri: string, title: string }>();
    return (
        <SafeAreaView
            edges={['left', 'right', "top"]}
            onTouchStart={event => {
                console.log('touchMove', event.nativeEvent);
            }}
            style={styles.container}>
            <Header
                title={title}
                onPressBack={() => {
                    router.back();
                }}
            />
            <WebView
                source={{ uri: uri }}
                onMessage={(event: any) => {
                    // do something with `event.nativeEvent.data`
                    // alert(event?.nativeEvent?.data);
                }}
                // javaScriptEnabled={true}
                // injectedJavaScript={webViewScript}
                domStorageEnabled={true}
                sytle={{ flex: 1 }}
            />
        </SafeAreaView>
    );
}

export default WebScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.green,
    },
});
