import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Bubble,
  GiftedChat,
  IChatMessage,
  InputToolbar,
  Message,
  MessageText,
  Send,
  Time,
} from 'react-native-gifted-chat';
import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import AnswerComponent from '@/components/Answer';
import strings from '@/localization';
import Colors from '@/styles/Colors';
import useChatStore from '@/stores/ChatStore';
import { ASTRO_BOT } from '@/apollo/mutation';
import useAccountStore from '@/stores/AccountStore';
import { MESSAGES } from '@/apollo/query';
import { ImageBackground } from 'expo-image';
import TypeStyles from '@/styles/TypeStyle';

function ChatScreen() {
  const insets = useSafeAreaInsets();
  const chats = useChatStore(state => state.chats);
  const messages = useChatStore(state => state.messages);
  const loadingChat = useChatStore(state => state.loading);
  const [AstroBot, { data: dataBot, loading: loadingBot, error: errorBot }] =
    useMutation(ASTRO_BOT);
  const chat_id = chats?.[0].id || '';
  const user = useAccountStore(state => state.user);
  console.log('current user:', JSON.stringify(user));
  console.log('messages:', JSON.stringify(messages));
  const actions = useChatStore(state => state.actions);
  const { data, loading, error } = useQuery(MESSAGES, {
    variables: {
      chat_id,
      page: 1,
    },
  });

  // const _keyboardDidShow = useCallback(() => {
  //   navigation.setOptions({
  //     tabBarVisible: false,
  //   });
  // }, [navigation]);

  // const _keyboardDidHide = useCallback(() => {
  //   navigation.setOptions({
  //     tabBarVisible: true,
  //   });
  // }, [navigation]);

  // useEffect(() => {
  //   const showSubscription = Keyboard.addListener(
  //     'keyboardDidShow',
  //     _keyboardDidShow,
  //   );
  //   const hideSubscription = Keyboard.addListener(
  //     'keyboardDidHide',
  //     _keyboardDidHide,
  //   );

  //   // cleanup function
  //   return () => {
  //     showSubscription.remove();
  //     hideSubscription.remove();
  //   };
  // }, [_keyboardDidHide, _keyboardDidShow]);

  useEffect(() => {
    if (data) {
      actions.setMessages(data.messages, chat_id, user);
    }
  }, [data]);

  const onSend = useCallback(
    (messages: IChatMessage[] = []) => {
      console.log(`onSend: ${JSON.stringify(messages)}`);
      const text = messages[0]?.text || '';

      actions.setMessages(
        [
          {
            id: new Date().getTime().toString(),
            content: text,
            created_time: moment().toDate().toString(),
            user_id: user?.id,
          },
        ],
        chat_id,
        user,
      );
      actions.setloading(true);
      AstroBot({
        variables: {
          user_input: text,
          chat_id,
        },
      });
    },
    [chat_id, user],
  );

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        renderSend={props => (
          <Send
            {...props}
            containerStyle={{
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <View style={styles.send}>
              <Image
                source={require('@/assets/images/ic_send.png')}
                style={{ width: 24, height: 24, tintColor: Colors.black }}
              />
            </View>
          </Send>
        )}
        containerStyle={styles.toolbar}
      />
    );
  };

  return <ImageBackground source={require('@/assets/images/bg_home.png')} style={[styles.container, { paddingTop: insets.top }]}>
    {messages?.length == 0 && (
      <View style={{ paddingHorizontal: 16 }}>
        <AnswerComponent answer={strings.t("chatLuna")} />
      </View>
    )}
    {messages != undefined && (
      <GiftedChat
        bottomOffset={- (insets.bottom + 70)}
        messages={messages}
        isTyping={loadingChat}
        onSend={(messages: IChatMessage[]) => onSend(messages)}
        renderInputToolbar={renderInputToolbar}
        showUserAvatar
        textInputProps={[
          { placeholder: strings.t("writeAMessage") },
          TypeStyles.bodyText1
        ]}
        renderBubble={(props: any) => (
          <Bubble
            {...props}
            wrapperStyle={{
              left: [{ backgroundColor: "#385F97", marginBottom: 8 }, styles.body],
              right: [{ backgroundColor: "#DAE2F7", marginBottom: 8 }, styles.body],
            }}
          />
        )}
        renderTime={(props: any) => <Time {...props} timeTextStyle={{ right: { color: Colors.black }, left: { color: Colors.white } }} />}
        renderMessageText={(props: any) => (
          <MessageText {...props} textStyle={{ left: { color: Colors.white }, right: { color: Colors.black } }} />
        )}
        user={{
          _id: user?.id || 1,
        }}
      />
    )}
    <View style={{ height: insets.bottom + 80, backgroundColor: 'transparent' }} />
  </ImageBackground>
}

export default ChatScreen;

const styles = StyleSheet.create({
  body: {
    shadowOffset: {
      width: 6,
      height: 6
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 12,
    shadowColor: "#000",
  },
  send: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: Platform.OS === 'ios' ? 0 : 10,
  },
  toolbar: {
    marginHorizontal: 16,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingTop: Platform.OS === 'ios' ? 0 : 6,
    borderTopColor: 'transparent',
  },
  btnsend: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
});
