import { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image';
import { colors } from '@/core/styles';
const SIZE = 108;

interface EditAvatarProps {
    onPress: () => void;
    avatar?: string;
}

const EditAvatar = ({ onPress, avatar }: EditAvatarProps) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={[styles.avatar]}>
                {
                    !avatar ?
                        <AntDesign name='user' size={24} color={colors.success} /> :
                        <Image source={{ uri: avatar }} style={styles.avatar} />
                }
            </TouchableOpacity>
        </View>

    );
};

export default memo(EditAvatar);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    wrapper: {
        height: 48,
        borderRadius: 8,
        overflow: 'hidden'
    },
});
