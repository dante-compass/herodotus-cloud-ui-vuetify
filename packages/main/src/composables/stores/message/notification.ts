import { NotificationCategoryEnum } from '@herodotus/api';

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
  },
});
