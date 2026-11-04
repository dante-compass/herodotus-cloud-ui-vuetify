import { useTheme } from 'vuetify';
import { isEmpty, toLower } from 'lodash-es';

export default function useImage() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const theme = useTheme();
  const getStaticFile = (name: string, folder = '') => {
    const path = baseUrl + 'static/images/';

    if (isEmpty(folder)) {
      return path + name;
    } else {
      return path + folder + '/' + name;
    }
  };

  const getStaticImage = (name: string, format = 'png', folder = '') => {
    const fileName = name + '.' + format;
    return getStaticFile(fileName, folder);
  };

  const getSocialLogo = (name: string, suffix = 'png') => {
    return getStaticImage(toLower(name), suffix, 'social');
  };

  const getAssetsFile = (url: string) => {
    return new URL(`../../../assets/images/${url}`, import.meta.url).href;
  };

  const getSystemLogo = () => {
    const name = `dante-cloud-${theme.current.value.dark ? 'dark' : 'light'}.png`;
    return getStaticFile(name, 'layouts');
  };

  return {
    getSocialLogo,
    getAssetsFile,
    getSystemLogo,
    getStaticFile,
    getStaticImage,
  };
}
