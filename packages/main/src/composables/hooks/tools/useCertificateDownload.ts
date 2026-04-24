import type { AxiosProgressEvent } from '@herodotus/core';

import { toast } from '@herodotus/core';
import { API } from '@/configurations';

import { useFileDownload } from '@herodotus/framework';

export default function useCertificateDownload() {
  const { process, loadProgress, showProgress, showDownLoadProgress } = useFileDownload();

  const download = (filename: string, size?: number) => {
    if (size && size !== 0) {
      showDownLoadProgress();
      API.core
        .mgtCertificateFile()
        .download({ filename: filename }, (progressEvent: AxiosProgressEvent) => {
          loadProgress.value = (progressEvent.loaded / size) * 100;
        })
        .then((response) => {
          const data = response as Blob;
          process(data, filename);
        })
        .catch(() => {
          toast.error('下载失败');
        });
    } else {
      API.core
        .mgtCertificateFile()
        .download({ filename: filename })
        .then((response) => {
          const data = response as Blob;
          process(data, filename);
        })
        .catch(() => {
          toast.error('下载失败');
        });
    }
  };

  return {
    download,
    loadProgress,
    showProgress,
  };
}
