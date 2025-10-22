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
    path: '/:path(.*)*',
    name: 'PageNotFound',
    title: 'Page Not Found',
  },
};
