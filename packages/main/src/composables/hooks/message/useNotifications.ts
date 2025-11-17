import type { Sort, Page } from '@herodotus/core';
import type { NotificationEntity, NotificationConditions } from '@herodotus/api';

import { NotificationCategoryEnum } from '@herodotus/api';
import { moment } from '@herodotus/core';
import { useAuthenticationStore } from '@herodotus/framework';
import { API } from '@/configurations';
import { useNotificationStore } from '../../stores';
import { useTable } from '../commons';

export default function useNotifications(category: NotificationCategoryEnum) {
  const { tableRows, totalItems, findItemsByPage } = useTable<
    NotificationEntity,
    NotificationConditions
  >(API.core.notification(), 'Notification', false, ['createTime'], 'DESC');

  const notificationStore = useNotificationStore();

  const { hasDialogue, hasAnnouncement, totalCount, dialogueCount, announcementCount } =
    storeToRefs(notificationStore);
  const authenticationStore = useAuthenticationStore();

  const findItems = () => {
    findItemsByPage(1, 5, {
      userId: authenticationStore.userId,
      category: category,
      read: false,
    });
  };

  watch(
    () => totalItems.value,
    (newValue) => {
      notificationStore.recordCount(category, newValue);
    },
  );

  const convertDate = (date: Date): string => {
    return moment(date).fromNow();
  };

  onMounted(() => {
    findItems();
  });

  return {
    tableRows,
    hasDialogue,
    hasAnnouncement,
    totalCount,
    dialogueCount,
    announcementCount,
    convertDate,
  };
}
