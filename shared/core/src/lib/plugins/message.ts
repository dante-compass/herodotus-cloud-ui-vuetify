import type { SweetAlertIcon, SweetAlertResult, SweetAlertTheme } from 'sweetalert2';
import type { ThemeMode } from '@/declarations';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const SwalToast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: false,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const getConfirmButtonColor = (theme = 'light' as ThemeMode) => {
  return theme === 'light' ? '#6750A4' : '#2563eb';
};

const convertThemeType = (theme: ThemeMode): SweetAlertTheme => {
  const result = theme === 'system' ? 'auto' : theme;
  return result as SweetAlertTheme;
};

const standardDeleteNotify = (
  onConfirm: () => void,
  onCancel?: () => void,
  theme = 'light' as ThemeMode,
) => {
  Swal.fire({
    title: '确定删除?',
    text: '您将无法恢复此操作！',
    icon: 'warning',
    theme: convertThemeType(theme),
    showCancelButton: true,
    confirmButtonColor: getConfirmButtonColor(theme),
    cancelButtonColor: '#d33',
    confirmButtonText: '是的, 删除!',
    cancelButtonText: '取消',
  }).then((confirm: SweetAlertResult) => {
    if (confirm.value) {
      onConfirm();
    } else {
      if (onCancel) {
        onCancel();
      }
    }
  });
};

/**
 * 这里使用单例模式，主要是因为将静态类，赋值给Vue.prototype会出现 Property '' is a static member of type '' 错误。
 * 参考以下文章
 * {@see https://techformist.com/static-variables-methods-typescript/}
 * {@see https://www.xspdf.com/resolution/54250655.html}
 * {@see https://www.typescriptlang.org/docs/handbook/classes.html#static-properties}
 *
 * 单例模式饿汉式与懒汉式
 * {@see https://zhuanlan.zhihu.com/p/129264092}
 */
class Notify {
  private static instance = new Notify();

  private theme: SweetAlertTheme;

  private constructor() {
    this.theme = 'light';
  }

  public static getInstance(): Notify {
    return this.instance;
  }

  public setTheme(newTheme: ThemeMode): void {
    this.theme = convertThemeType(newTheme);
  }

  public information(
    title: string,
    text: string,
    icon: SweetAlertIcon,
  ): Promise<SweetAlertResult<string>> {
    return Swal.fire({
      title: title,
      text: text,
      position: 'top',
      icon: icon,
      theme: this.theme,
      timer: 5000,
      showConfirmButton: false,
      showClass: {
        popup: 'animate__animated animate__fadeIn',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut',
      },
    });
  }

  public info(title: string, text = ''): Promise<SweetAlertResult<string>> {
    return this.information(title, text, 'info');
  }

  public error(title: string, text = ''): Promise<SweetAlertResult<string>> {
    return this.information(title, text, 'error');
  }

  public warning(title: string, text = ''): Promise<SweetAlertResult<string>> {
    return this.information(title, text, 'warning');
  }

  public success(title: string, text = ''): Promise<SweetAlertResult<string>> {
    return this.information(title, text, 'success');
  }

  public question(title: string, text = ''): Promise<SweetAlertResult<string>> {
    return this.information(title, text, 'question');
  }
}

const notify: Notify = Notify.getInstance();

class Toast {
  private static instance = new Toast();
  private theme: SweetAlertTheme;

  private constructor() {
    this.theme = 'light';
  }

  public static getInstance(): Toast {
    return this.instance;
  }

  public setTheme(newTheme: ThemeMode): void {
    this.theme = convertThemeType(newTheme);
  }

  public information(title: string, icon: SweetAlertIcon): Promise<SweetAlertResult<string>> {
    return SwalToast.fire({
      icon: icon,
      title: title,
      theme: this.theme,
    });
  }

  public info(text: string): Promise<SweetAlertResult<string>> {
    return this.information(text, 'info');
  }

  public error(text: string): Promise<SweetAlertResult<string>> {
    return this.information(text, 'error');
  }

  public warning(text: string): Promise<SweetAlertResult<string>> {
    return this.information(text, 'warning');
  }

  public success(text: string): Promise<SweetAlertResult<string>> {
    return this.information(text, 'success');
  }

  public question(text: string): Promise<SweetAlertResult<string>> {
    return this.information(text, 'question');
  }
}

const toast: Toast = Toast.getInstance();

export { Swal, notify, toast, standardDeleteNotify };
