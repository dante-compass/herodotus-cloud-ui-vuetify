export default function useFileDownload(): {
    process: (response: Blob, objectName: string) => void;
    loadProgress: import('vue').ShallowRef<number, number>;
    showProgress: import('vue').ShallowRef<boolean, boolean>;
    showDownLoadProgress: () => void;
};
