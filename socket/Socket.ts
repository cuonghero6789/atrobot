// socket.ts
import ConfigUtil from '@/core/utils/ConfigUtil';
import useAccountStore from '@/stores/AccountStore';
import useAuthStore from '@/stores/AuthStore';
import useChatStore from '@/stores/ChatStore';
import useDailyStore from '@/stores/DailyStore';
import usePlanetStore from '@/stores/PlanetStore';
import useQuestionStore from '@/stores/QuestionStore';
import useYouStore from '@/stores/YouStore';
import { useRef, useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useRouter } from 'expo-router';
enum OP {
  ASTRO_ME = 'astro_me',
  ASTRO_GEN_QUESTION = 'astro_gen_question',
  ASTRO_ANSWER_QUESTION = 'astro_answer_question',
  ASTRO_DAILY = 'astro_daily',
  ASTRO_QUOTE = 'astro_quote',
  ASTRO_BOT = 'astro_bot',
  ASTRO_ME_DOMINANT = 'astro_me_dominant',
}
export default function useWebSocket(onAppActive: () => void) {
  const router = useRouter();
  const actionPlanet = usePlanetStore(state => state.actions);
  const actionsQuestion = useQuestionStore(state => state.actions);
  const actionDaily = useDailyStore(state => state.actions);
  const actionsChat = useChatStore(state => state.actions);
  const actionYou = useYouStore(state => state.actions);
  const actionAuth = useAuthStore(state => state.actions);
  const user = useAccountStore(state => state.user);
  const ws = useRef<WebSocket | null>(null);
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

  const openWebSocket = () => {
    if (ws.current) {
      ws.current.close();
    }
    ws.current = new WebSocket(`${ConfigUtil.URL_WS}?Authorization=${global.token}`);
    ws.current.onopen = () => {
      console.log('WebSocket connection opened');
    };
    ws.current.onmessage = e => {
      var data = e?.data;
      if (typeof data === 'string' && data.startsWith('{')) {
        data = JSON.parse(data);
      }
      const { payload, op } = data || {};
      const from_date = payload?.from_date || '';

      switch (op) {
        case OP.ASTRO_ME:
          actionPlanet.setPlanetSign(payload || '');
          router.push("/PlanetScreen");
          break;
        case OP.ASTRO_GEN_QUESTION:
          actionsQuestion.setQuestions(
            payload?.questions || [],
            payload?.topic || '',
          );
          break;
        case OP.ASTRO_ANSWER_QUESTION:
          actionsQuestion.setAnswer(payload?.answer || '');
          router.push("/AnswerScreen");
          break;
        case OP.ASTRO_DAILY:
          if (payload?.daily?.length) {
            actionDaily.setDaily(payload?.daily || [], from_date);
          }
          if (payload?.scores?.length) {
            actionDaily.setScores(payload?.scores || [], from_date);
          }
          if (payload?.events) {
            actionDaily.setEvents(payload?.events || [], from_date);
          }
          break;
        case OP.ASTRO_QUOTE:
          actionDaily.setQuote(payload?.quote || '', from_date);
          break;
        case OP.ASTRO_BOT:
          actionsChat.setloading(false);
          actionsChat.setMessages([payload], payload?.chat_id, user);
          break;
        case OP.ASTRO_ME_DOMINANT:
          actionYou.setDominant(payload);
        default:
          break;
      }
      console.log('Message received from server: ', e.data);
    };
    ws.current.onerror = (error: Event) => {
      if (!error.isTrusted) {
        actionAuth.onLogout();
      }
      console.error('WebSocket error:', error);
    };
    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
    };
  };

  const closeWebSocket = () => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }
  };

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      openWebSocket();
      onAppActive();
    } else if (nextAppState.match(/inactive|background/)) {
      closeWebSocket();
    }
    setAppState(nextAppState);
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    openWebSocket();

    return () => {
      closeWebSocket();
      subscription.remove();
    };
  }, [appState]);
};