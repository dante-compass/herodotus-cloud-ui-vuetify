import { DialogueContactEntity, DialogueDetailEntity, NotificationEntity } from '../../declarations';
import { AxiosHttpResult, HttpConfig, AbstractWriteableService } from '@herodotus/core';
declare class DialogueContactService extends AbstractWriteableService<DialogueContactEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): DialogueContactService;
    getBaseAddress(): string;
}
declare class DialogueDetailService extends AbstractWriteableService<DialogueDetailEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): DialogueDetailService;
    getBaseAddress(): string;
    getDeleteDialoguePath(id: string): string;
    deleteDialogueById(id: string): Promise<AxiosHttpResult<string>>;
}
declare class NotificationService extends AbstractWriteableService<NotificationEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): NotificationService;
    getBaseAddress(): string;
    getAllReadAddress(): string;
    setAllRead(userId: string): Promise<AxiosHttpResult<string>>;
}
declare class WebSocketMessageService {
    private static instance;
    private config;
    private constructor();
    static getInstance(config: HttpConfig): WebSocketMessageService;
    getBaseAddress(): string;
    getStatAddress(): string;
    fetchAllStat(): Promise<AxiosHttpResult<Record<string, any>>>;
}
export { DialogueContactService, DialogueDetailService, NotificationService, WebSocketMessageService };
