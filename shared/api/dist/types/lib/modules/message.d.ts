import { DialogueContactEntity, DialogueDetailEntity, NotificationEntity } from '../../declarations';
import { AxiosHttpResult, HttpConfig, AbstractService } from '@herodotus/core';
declare class DialogueContactService extends AbstractService<DialogueContactEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): DialogueContactService;
    getBaseAddress(): string;
}
declare class DialogueDetailService extends AbstractService<DialogueDetailEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): DialogueDetailService;
    getBaseAddress(): string;
    private getDeleteDialoguePath;
    deleteDialogueById(id: string): Promise<AxiosHttpResult<string>>;
}
declare class NotificationService extends AbstractService<NotificationEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): NotificationService;
    getBaseAddress(): string;
    private getAllReadAddress;
    setAllRead(userId: string): Promise<AxiosHttpResult<string>>;
}
declare class WebSocketMessageService {
    private static instance;
    private config;
    private constructor();
    static getInstance(config: HttpConfig): WebSocketMessageService;
    getBaseAddress(): string;
    private getStatAddress;
    fetchAllStat(): Promise<AxiosHttpResult<Record<string, any>>>;
}
export { DialogueContactService, DialogueDetailService, NotificationService, WebSocketMessageService };
