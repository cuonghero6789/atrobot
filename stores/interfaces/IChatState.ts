import {IMessage} from 'react-native-gifted-chat';
import {ChatModel, MessageModel, UserModel} from '../../models/UserModel';
export default interface IChatState {
  loading: boolean;
  messages?: IMessage[];
  chats?: ChatModel[];
  actions: {
    setloading: (value: boolean) => void;
    setChats: (value: ChatModel[]) => void;
    setMessages: (
      value: MessageModel[],
      chatId: string,
      user?: UserModel,
    ) => void;
  };
}
