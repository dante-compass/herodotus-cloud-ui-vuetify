import { App } from 'vue';
import { HIconButton } from './HButton';
import { HDate, HDateTime, HDuration, HTime } from './HDateTime';
import { HDialog } from './HDialog';
import { HDivider } from './HDivider';
import { HDownloadProgress } from './HProgress';
import { HLabel } from './HLabel';
import { HMdiIconSelect, HTreeSelect } from './HSelect';
import { HLabelItem } from './HItem';
export { HDate, HDateTime, HDialog, HDivider, HDownloadProgress, HDuration, HMdiIconSelect, HIconButton, HLabel, HLabelItem, HTime, HTreeSelect, };
export * from './lib';
declare const _default: {
    install: (app: App) => void;
};
export default _default;
