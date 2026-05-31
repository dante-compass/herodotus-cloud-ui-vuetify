import type { Sort, Page } from "@herodotus/core";
import type { NotificationEntity } from "@herodotus/api";

import { NotificationCategoryEnum } from "@herodotus/api";
import { moment } from "@herodotus/core";
import { useAuthenticationStore } from "@herodotus/framework";
import { API } from "@/configurations";
import { useNotificationStore } from "../../stores";

export default function useNotifications() {
  const sort: Sort = { direction: "DESC", properties: ["createTime"] };
  const notificationStore = useNotificationStore();

  const totalItems = shallowRef(0);
  const totalPages = shallowRef(0);
  const tableRows = ref<NotificationEntity[]>([]);

  const { hasDialogue, hasAnnouncement, totalCount, dialogueCount, announcementCount } = storeToRefs(notificationStore);
  const authenticationStore = useAuthenticationStore();

  const findItemsByPage = (category: NotificationCategoryEnum, pageNumber: number, pageSize: number) => {
    API.core
      .notification()
      .fetchByPage(
        {
          pageNumber: pageNumber - 1,
          pageSize: pageSize,
          ...sort,
        },
        {
          userId: authenticationStore.userId,
          category: category,
          read: false,
        },
      )
      .then((result) => {
        const data = result.data as Page<NotificationEntity>;

        // 用户文档列表中无结果时也要更新列表数据
        if (data) {
          tableRows.value = data.content;
          totalPages.value = data.totalPages;
          totalItems.value = parseInt(data.totalElements, 0);
          notificationStore.recordCount(category, totalItems.value);
        } else {
          tableRows.value = [];
          totalItems.value = 0;
        }
      })
      .catch((error) => {
        console.log("----------------", error);
      });
  };

  const findByCategory = (category: NotificationCategoryEnum, pageNumber = 1, pageSize = 5) => {
    findItemsByPage(category, pageNumber, pageSize);
  };

  const convertDate = (date: Date): string => {
    return moment(date).fromNow();
  };

  const setAllRead = () => {
    notificationStore.setAllRead();
  };

  return {
    tableRows,
    hasDialogue,
    hasAnnouncement,
    totalCount,
    dialogueCount,
    announcementCount,
    convertDate,
    findByCategory,
    setAllRead,
  };
}
