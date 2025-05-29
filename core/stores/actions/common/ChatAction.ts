import { IMessage } from 'react-native-gifted-chat';
import { ChatModel, MessageModel, UserModel } from '@/core/types/common';
import useChatStore from '@/core/stores/common/ChatStore';
import moment from 'moment';
export const setloading = (set: any, get: any) => async (value: boolean) => {
  try {
    console.log('setloading success:', value);
    set(
      (state: any) => {
        state.loading = value;
      },
      false,
      'setloadingSuccess',
    );
  } catch (error: any) {
    console.log('loading error:', error.message);
  }
};
export const setChats = (set: any, get: any) => async (chats: ChatModel[]) => {
  try {
    console.log('setChats success:', JSON.stringify(chats));
    set(
      (state: any) => {
        state.chats = chats;
      },
      false,
      'setChatsSuccess',
    );
  } catch (error: any) {
    console.log('chats error:', error.message);
  }
};

export const setMessages =
  (set: any, get: any) =>
    async (_messages: MessageModel[], chatId: string, user?: UserModel) => {
      const messages = get().messages || [];
      const formatmessages = _messages.map((message: MessageModel) => {
        return {
          _id: message.id || moment().valueOf().toString(),
          text: message.content,
          createdAt: moment(message.created_time).toDate(),
          user: {
            _id: message.user_id ? message.user_id : chatId,
            name: message.user_id ? user?.display_name : 'Luna',
            avatar: message.user_id
              ? user?.avatar
              : 'https://i.imgur.com/XDOSOGK.png',
          },
        };
      });
      const lastMessages = [...formatmessages.reverse(), ...messages];
      try {
        set(
          (state: any) => {
            state.messages = lastMessages;
          },
          false,
          'setMessagesSuccess',
        );
      } catch (error: any) {
        console.log('Login error:', error.message);
      }
    };
