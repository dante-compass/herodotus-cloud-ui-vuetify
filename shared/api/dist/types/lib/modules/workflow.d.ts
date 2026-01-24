import { ExtendedTaskEntity } from '../../declarations';
import { AxiosHttpResult, Page, Pageable, Conditions, HttpConfig, AbstractEntityService } from '@herodotus/core';
declare class ExtendedTaskService extends AbstractEntityService<ExtendedTaskEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): ExtendedTaskService;
    getBaseAddress(): string;
    getToDoTasksAddress(): string;
    getCompletedTasksAddress(): string;
    fetchToDoTasksByPage(params: Pageable, others?: Conditions): Promise<AxiosHttpResult<Page<ExtendedTaskEntity>>>;
    fetchCompletedTasksByPage(params: Pageable, others?: Conditions): Promise<AxiosHttpResult<Page<ExtendedTaskEntity>>>;
}
export { ExtendedTaskService };
