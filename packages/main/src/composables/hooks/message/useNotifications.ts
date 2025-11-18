import type { NotificationEntity, NotificationConditions } from '@herodotus/api';

import { NotificationCategoryEnum } from '@herodotus/api';
import { moment } from '@herodotus/core';
import { useAuthenticationStore } from '@herodotus/framework';
import { API } from '@/configurations';
import { useNotificationStore } from '../../stores';
import { useTable } from '../commons';

export default function useNotifications(
  isTotal = false,
  category?: NotificationCategoryEnum,
  loadOnMount = true,
) {
  const { tableRows, totalItems, findItemsByPage } = useTable<
    NotificationEntity,
    NotificationConditions
  >(API.core.notification(), 'Notification', false, ['createTime'], 'DESC', loadOnMount);

  const notificationStore = useNotificationStore();

  const { hasDialogue, hasAnnouncement, totalCount, dialogueCount, announcementCount } =
    storeToRefs(notificationStore);
  const authenticationStore = useAuthenticationStore();

  const findByCategory = () => {
    if (category) {
      findItemsByPage(1, 5, {
        userId: authenticationStore.userId,
        category: category,
        read: false,
      });
    }
  };

  const findTotalNumber = () => {
    findItemsByPage(1, 5, {
      userId: authenticationStore.userId,
      read: false,
    });
  };

  const setAllRead = () => {
    API.core
      .notification()
      .setAllRead(authenticationStore.userId)
      .then(() => {
        notificationStore.resetCount();
      });
  };

  watch(
    () => totalItems.value,
    (newValue) => {
      if (isTotal) {
        notificationStore.recordTotal(newValue);
      } else {
        if (category) {
          notificationStore.recordCount(category, newValue);
        }
      }
    },
  );

  const convertDate = (date: Date): string => {
    return moment(date).fromNow();
  };

  return {
    tableRows,
    hasDialogue,
    hasAnnouncement,
    totalCount,
    dialogueCount,
    announcementCount,
    convertDate,
    setAllRead,
    findByCategory,
    findTotalNumber,
  };
}
