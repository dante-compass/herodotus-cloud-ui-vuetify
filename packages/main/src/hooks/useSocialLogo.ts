export default function useSocialLogo() {
  const find = (name: string, suffix = 'png') => {
    const modules = socialLogoModules as ModuleNamespace;

    const index = `../static/images/social/${name}.${suffix}`;
    const item = modules[`${index}`];
    const module = item.default || '';
    return module;
  };
}
