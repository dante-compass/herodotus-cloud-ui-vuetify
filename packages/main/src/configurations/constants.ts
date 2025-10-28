export const IS_PROD = import.meta.env.PROD;
export const IS_DEV = import.meta.env.DEV;
export const IS_SERVER = import.meta.env.SSR;

export const DEAULT_ROUTER_LINK = {
  root: {
    path: '/',
    name: 'Root',
    title: 'Root',
  },
  sign_in: {
    path: '/sign-in',
    name: 'SignIn',
  },
  home: {
    path: '/dashboard',
    name: 'Dashboard',
    title: '首页',
  },
  not_found: {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    title: 'Page Not Found',
  },
};
