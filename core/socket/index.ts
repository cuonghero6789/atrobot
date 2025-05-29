// Export common socket functionality
export {
  useWebSocketConnection,
  useAppStateWebSocket,
  type WebSocketConfig,
} from './common';

// Export AtroBot specific socket functionality
export {
  AtroOP,
  useAtroMessageHandler,
  useAtroWebSocket,
} from './atro';

// Main export for backward compatibility
export { useAtroWebSocket as default } from './atro'; 