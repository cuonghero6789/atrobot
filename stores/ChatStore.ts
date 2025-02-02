import { createStore } from '@/core/utils/StoreUtil';
import { setChats, setloading, setMessages } from './actions/ChatAction';
import IChatState from './interfaces/IChatState';

const initState: Omit<IChatState, 'actions'> = {
  loading: false,
};

const chatStore = (set: any, get: any) =>
({
  ...initState,
  actions: {
    setloading: setloading(set, get),
    setChats: setChats(set, get),
    setMessages: setMessages(set, get),
  },
} as IChatState);

const useChatStore = createStore<IChatState>(chatStore);

export default useChatStore;
