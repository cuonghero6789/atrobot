import { useRef, useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

// Generic WebSocket hook interface
export interface WebSocketConfig {
  url: string;
  token?: string;
  onMessage?: (data: any) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
}

// Generic WebSocket connection management
export function useWebSocketConnection(config: WebSocketConfig) {
  const ws = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const openWebSocket = () => {
    if (ws.current) {
      ws.current.close();
    }

    const wsUrl = config.token 
      ? `${config.url}?Authorization=${config.token}`
      : config.url;

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('WebSocket connection opened');
      setIsConnected(true);
      config.onOpen?.();
    };

    ws.current.onmessage = (e) => {
      let data = e?.data;
      if (typeof data === 'string' && data.startsWith('{')) {
        data = JSON.parse(data);
      }
      config.onMessage?.(data);
      console.log('Message received from server: ', e.data);
    };

    ws.current.onerror = (error: Event) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
      config.onError?.(error);
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
      setIsConnected(false);
      config.onClose?.();
    };
  };

  const closeWebSocket = () => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
      setIsConnected(false);
    }
  };

  const sendMessage = (message: any) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  };

  return {
    openWebSocket,
    closeWebSocket,
    sendMessage,
    isConnected,
  };
}

// App state management hook
export function useAppStateWebSocket(
  onAppActive: () => void,
  openWebSocket: () => void,
  closeWebSocket: () => void
) {
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

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

  return { appState };
} 