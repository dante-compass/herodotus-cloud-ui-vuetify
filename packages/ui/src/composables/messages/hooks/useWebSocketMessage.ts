import { variables } from '/@/lib/utils';

import { MessageChannelEnum } from '../enums';

import {
  useRSocketWebSocketStore,
  useWebFluxWebSocketStore,
  useStompWebSocketStore,
  useNotificationStore,
  useRealTimeInformationStore
} from '../stores';

export default function useWebSocketMessage() {
  const isUseWebSocket = variables.isUseWebSocket();
  const isReactiveProject = variables.isReactiveProject();
  const stompWebSocketStore = useStompWebSocketStore();
  const webfluxWebSocketStore = useWebFluxWebSocketStore();
  const rsocketWebSocketStore = useRSocketWebSocketStore();
  const notificationStore = useNotificationStore();
  const realtimeStore = useRealTimeInformationStore();

  const webSocketOperations = {
    pullNotifications: (data: string) => {
      notificationStore.pullAllNotification();
    },
    syncOnlineUserCount: (data: string) => {
      const count = data as unknown as number;
      realtimeStore.onlineUserCount = count;
    }
  };

  const messageChannel = (category = MessageChannelEnum.RSOCKET, isConnected = true) => {
    switch (category) {
      case MessageChannelEnum.RSOCKET:
        if (isConnected) {
          rsocketWebSocketStore.connect(webSocketOperations);
        } else {
          rsocketWebSocketStore.disconnect();
        }
        break;
      case MessageChannelEnum.WEBFLUX:
        if (isConnected) {
          webfluxWebSocketStore.connect();
        } else {
          webfluxWebSocketStore.disconnect();
        }
        break;
      default:
        if (isConnected) {
          stompWebSocketStore.connect();
        } else {
          stompWebSocketStore.disconnect();
        }
        break;
    }
  };

  const connect = () => {
    if (isUseWebSocket) {
      if (isReactiveProject) {
        messageChannel(MessageChannelEnum.RSOCKET, true);
      } else {
        messageChannel(MessageChannelEnum.STOMP, true);
      }
    }
  };

  const disconnect = () => {
    if (isUseWebSocket) {
      if (isReactiveProject) {
        messageChannel(MessageChannelEnum.RSOCKET, false);
      } else {
        messageChannel(MessageChannelEnum.STOMP, false);
      }
    }
  };

  return {
    connect,
    disconnect,
    messageChannel
  };
}
