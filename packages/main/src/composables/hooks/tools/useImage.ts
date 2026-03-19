import type { ModuleNamespace } from 'vite/types/hot.js';

import { useTheme } from 'vuetify';

export default function useImage() {
  const socialLogoModules = import.meta.glob('../../../assets/images/social/*', { eager: true });
  const theme = useTheme();

  const getSocialLogo = (name: string, suffix = 'png') => {
    const modules = socialLogoModules as ModuleNamespace;

    const index = `../../../assets/images/social/${name}.${suffix}`;
    const item = modules[`${index}`];
    const module = item.default || '';
    return module;
  };

  const getAssetsFile = (url: string) => {
    return new URL(`../../../assets/images/${url}`, import.meta.url).href;
  };

  const getSystemLogo = () => {
    const name = `dante-cloud-${theme.current.value.dark ? 'dark' : 'light'}.png`;
    return new URL(`../../../assets/images/layouts/${name}`, import.meta.url).href;
  };

  return {
    getSocialLogo,
    getAssetsFile,
    getSystemLogo,
  };
}
