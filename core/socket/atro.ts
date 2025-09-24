import { getConfig } from '@/core';
import { useAccountStore, useAuthStore, useChatStore, useDailyStore, useLuckyDayStore, usePlanetStore, useQuestionStore, useStarMatesStore, useYouStore } from '@/core/stores';
import { useRouter } from 'expo-router';
import { useWebSocketConnection, useAppStateWebSocket } from './common';

// AtroBot WebSocket operations
export enum AtroOP {
  ASTRO_ME = 'astro_me',
  ASTRO_GEN_QUESTION = 'astro_gen_question',
  ASTRO_ANSWER_QUESTION = 'astro_answer_question',
  ASTRO_DAILY = 'astro_daily',
  ASTRO_DAILY_MONTHLY = 'astro_daily_monthly',
  ASTRO_QUOTE = 'astro_quote',
  ASTRO_BOT = 'astro_bot',
  ASTRO_ME_DOMINANT = 'astro_me_dominant',
  ASTRO_ME_MANIFEST = 'astro_me_manifest',
  ASTRO_CUSTOM = 'astro_custom',
}

// AtroBot message handler
export function useAtroMessageHandler() {
  const router = useRouter();
  const actionPlanet = usePlanetStore(state => state.actions);
  const actionsQuestion = useQuestionStore(state => state.actions);
  const actionDaily = useDailyStore(state => state.actions);
  const actionsChat = useChatStore(state => state.actions);
  const actionYou = useYouStore(state => state.actions);
  const actionAuth = useAuthStore(state => state.actions);
  const user = useAccountStore(state => state.user);
  const actionStarMates = useStarMatesStore(state => state.actions);
  const actionLuckyDay = useLuckyDayStore(state => state.actions);

  const handleMessage = (data: any) => {
    const { payload, op } = data || {};
    const from_date = payload?.from_date || '';

    switch (op) {
      case AtroOP.ASTRO_ME:
        actionPlanet.setPlanetSign(payload || '');
        // router.push("/PlanetScreen");
        break;
      case AtroOP.ASTRO_GEN_QUESTION:
        actionsQuestion.setQuestions(
          payload?.questions || [],
          payload?.topic || '',
        );
        break;
      case AtroOP.ASTRO_ANSWER_QUESTION:
        actionsQuestion.setAnswer(payload?.answer || '');
        // router.push("/AnswerScreen");
        break;
      case AtroOP.ASTRO_DAILY:
        if (payload?.weekly?.length) {
          actionDaily.setDaily(payload || []);
        }
        if (payload?.scores?.length) {
          actionDaily.setScores(payload?.scores || [], from_date);
        }
        break;
      case AtroOP.ASTRO_QUOTE:
        payload && actionDaily.setQuote(payload?.quote);
        break;
      case AtroOP.ASTRO_DAILY_MONTHLY:
        payload && actionDaily.setMonthly(payload);
        break;
      case AtroOP.ASTRO_BOT:
        actionsChat.setloading(false);
        console.log('payload ASTRO_BOT == ', payload);
        payload && actionsChat.setMessages([payload], payload?.chat_id, user);
        break;
      case AtroOP.ASTRO_ME_DOMINANT:
        payload && actionYou.setDominant(payload);
        break;
      case AtroOP.ASTRO_ME_MANIFEST:
        console.log('payload ASTRO_ME_MANIFEST == ', payload);
        // actionPlanet.setManifest(payload);
        break;
      case AtroOP.ASTRO_CUSTOM:
        if (payload?.action === "astro_starmates") {
          actionStarMates.setStarMate(payload);
        } else if (payload?.range == "week") {
          actionLuckyDay.setWeek(payload.days);
        } else if (payload?.range == "month") {
          actionLuckyDay.setMonth(payload.days);
        }
        break;
      default:
        break;
    }
  };

  const handleError = (error: Event) => {
    if (!error.isTrusted) {
      // actionAuth.onLogout();
    }
  };

  return {
    handleMessage,
    handleError,
  };
}

// AtroBot WebSocket hook
export function useAtroWebSocket(onAppActive: () => void) {
  const { handleMessage, handleError } = useAtroMessageHandler();

  const { openWebSocket, closeWebSocket, sendMessage, isConnected } = useWebSocketConnection({
    url: getConfig().API.WS_URL,
    token: global.token || undefined,
    onMessage: handleMessage,
    onError: handleError,
  });

  const { appState } = useAppStateWebSocket(onAppActive, openWebSocket, closeWebSocket);

  return {
    sendMessage,
    isConnected,
    appState,
  };
} 