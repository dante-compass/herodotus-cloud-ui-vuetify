import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'; // 导入本地化语言

import duration from 'dayjs/plugin/duration';

dayjs.locale('zh-cn');
dayjs.extend(duration);

export { dayjs };
