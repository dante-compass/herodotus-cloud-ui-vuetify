import { shallowRef } from 'vue';

export default function useFileDownload() {
  const loadProgress = shallowRef(0);
  const showProgress = shallowRef(false);

  const process = (response: Blob, objectName: string) => {
    const data = response as Blob;
    const blob = new Blob([data], { type: 'application/x-download' });
    // 创建元素
    const link = document.createElement('a');
    link.style.display = 'none';
    // 创建下载的链接
    link.href = URL.createObjectURL(blob);
    // 给下载后的文件命名
    link.setAttribute('download', objectName);
    document.body.appendChild(link);
    // 点击下载
    link.click();
    // 下载完成移除元素
    document.body.removeChild(link);
    // 释放掉blob对象
    window.URL.revokeObjectURL(link.href);
  };

  const showDownLoadProgress = () => {
    showProgress.value = true;
    loadProgress.value = 0;
    const interval = setInterval(() => {
      if (loadProgress.value === 100) {
        clearInterval(interval);
      }
    }, 500);
  };

  return {
    process,
    loadProgress,
    showProgress,
    showDownLoadProgress,
  };
}
