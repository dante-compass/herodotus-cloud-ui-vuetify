import { DialogueContactEntity, DialogueDetailEntity, NotificationEntity } from '../../declarations';
import { AxiosHttpResult, HttpConfig, AbstractEntityService } from '@herodotus/core';
declare class DialogueContactService extends AbstractEntityService<DialogueContactEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): DialogueContactService;
    getBaseAddress(): string;
}
declare class DialogueDetailService extends AbstractEntityService<DialogueDetailEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): DialogueDetailService;
    getBaseAddress(): string;
    getDeleteDialoguePath(id: string): string;
    deleteDialogueById(id: string): Promise<AxiosHttpResult<string>>;
}
declare class NotificationService extends AbstractEntityService<NotificationEntity> {
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
export { DialogueContactService, DialogueDetailService, NotificationService, WebSocketMessageService, };
