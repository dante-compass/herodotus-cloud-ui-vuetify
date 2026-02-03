import type { AxiosProgressEvent } from '@herodotus/core';

import { toast } from '@herodotus/core';
import { API } from '@/configurations';

export default function useOssDownload() {
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
  /**
   * 下载对象文件
   * @param bucketName 存储桶名称
   * @param objectName 对象名称
   */
  const download = (bucketName: string, objectName: string, size?: number) => {
    if (size && size !== 0) {
      showDownLoadProgress();
      API.core
        .ossObject()
        .download({ bucketName: bucketName, objectName: objectName }, (progressEvent: AxiosProgressEvent) => {
          loadProgress.value = (progressEvent.loaded / size) * 100;
        })
        .then((response) => {
          const data = response as Blob;
          process(data, objectName);
        })
        .catch(() => {
          toast.error('下载失败');
        });
    } else {
      API.core
        .ossObject()
        .download({ bucketName: bucketName, objectName: objectName })
        .then((response) => {
          const data = response as Blob;
          process(data, objectName);
        })
        .catch(() => {
          toast.error('下载失败');
        });
    }
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
    loadProgress,
    showProgress,
    download,
  };
}
