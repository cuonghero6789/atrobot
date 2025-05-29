import { createStore } from '@/core';
import { setloading, setMessages, setChats } from '../actions/common/ChatAction';
import IChatState from '../interfaces/common/IChatState';

const initState: Omit<IChatState, 'actions'> = {
  loading: false,
  messages: [],
};

const chatStore = (set: any, get: any) =>
({
  ...initState,
  actions: {
    setloading: setloading(set, get),
    setMessages: setMessages(set, get),
    setChats: setChats(set, get),
  },
} as IChatState);

const useChatStore = createStore<IChatState>(chatStore);

export default useChatStore; 