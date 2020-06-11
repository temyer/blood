import store from '@/store';

export async function checkAuthentication(to, from, next) { //eslint-disable-line
  const isAuth = store.getters['auth/isAuthenticated'];

  if (!isAuth) {
    try {
      await store.dispatch('auth/autoLogin');
      next();
    } catch (err) {
      next();
    }
  } else {
    next();
  }
}

export function checkAccess(to, from, next) {
  const isAuth = store.getters['auth/isAuthenticated'];
  const authRequired = to.matched.some((route) => route.meta.authRequired);

  if (authRequired && isAuth) return next();
  if (authRequired) return next({ name: 'login' });
  return next();
}

export function setPageTitle(to, from, next) {
  const pageTitle = to.matched.find((route) => route.meta.title);

  if (pageTitle) window.document.title = pageTitle.meta.title;
  next();
}
