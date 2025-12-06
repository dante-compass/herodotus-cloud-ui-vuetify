import type { Sort, Page } from '@herodotus/core';
import type { NotificationConditions, NotificationEntity } from '@herodotus/api';

import { NotificationCategoryEnum } from '@herodotus/api';
import { useAuthenticationStore } from '@herodotus/framework';

import { API } from '@/configurations';

export const useNotificationStore = defineStore('Notification', {
  state: () => ({
    totalNumber: 0,
    dialogueCount: 0,
    announcementCount: 0,
  }),

  getters: {
    hasDialogue: (state) => state.dialogueCount !== 0,
    hasAnnouncement: (state) => state.announcementCount !== 0,
    totalCount: (state) => {
      if (state.totalNumber === 0) {
        return state.dialogueCount + state.announcementCount;
      } else {
        return state.totalNumber;
      }
    },
  },

  actions: {
    setAllRead(): void {
      const authenticationStore = useAuthenticationStore();
      API.core
        .notification()
        .setAllRead(authenticationStore.userId)
        .then(() => {
          this.totalNumber = 0;
          this.dialogueCount = 0;
          this.announcementCount = 0;
        });
    },

    resetCount(): void {
      this.totalNumber = 0;
      this.dialogueCount = 0;
      this.announcementCount = 0;
    },

    recordCount(type: NotificationCategoryEnum, count: number): void {
      if (type === NotificationCategoryEnum.DIALOGUE) {
        this.dialogueCount = count;
      } else {
        this.announcementCount = count;
      }
    },

    recordTotal(count: number): void {
      this.totalNumber = count;
    },

    /**
     * 该方法与 useNotifications 中 API 的方式类似，但是只能单独编写，因为使用的时机不同。
     * 如果将该方法中的 API 调用与 useNotifications 中合并，因为 hooks 只能用于 setup 环境，就会经常出现异常问题
     */
    pullAllNotification(): void {
      const sort: Sort = { direction: 'DESC', properties: ['createTime'] };
      const store = useAuthenticationStore();

      API.core
        .notification()
        .fetchByPage(
          {
            pageNumber: 0,
            pageSize: 5,
            ...sort,
          },
          { userId: store.userId, read: false } as NotificationConditions,
        )
        .then((result) => {
          const data = result.data as Page<NotificationEntity>;
          // 用户文档列表中无结果时也要更新列表数据
          if (data) {
            this.totalNumber = parseInt(data.totalElements, 0);
          } else {
            this.totalNumber = 0;
          }
        });
    },
  },
});
