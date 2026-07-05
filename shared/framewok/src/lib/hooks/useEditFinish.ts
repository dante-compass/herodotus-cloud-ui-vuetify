import type { RouteLocationNormalizedLoadedGeneric } from "vue-router";

import { useRoute } from "vue-router";
import { useTabsViewStore, useElementStore } from "../stores";
import { RouterUtilities } from "../utilities";

export default function useEditFinish(currentRoute?: RouteLocationNormalizedLoadedGeneric) {
  // 在当前 Vuetify 版本下 useRoute() 使用正常。但是将其放到升级至新版本 Quasar 依赖环境下就会报错。
  const realRoute = useRoute();
  const routeStore = useElementStore();
  const tabsViewStore = useTabsViewStore();

  const getRoute = () => {
    if (realRoute) {
      return realRoute;
    } else {
      if (currentRoute) {
        return currentRoute;
      } else {
        return undefined;
      }
    }
  };

  const onFinish = () => {
    const route = getRoute();

    if (route && route.name) {
      const name = route.name as string;
      routeStore.removeRoutePushParam(name);
      tabsViewStore.deleteTab(route);
    }

    RouterUtilities.getInstance().goBack();
  };

  return {
    onFinish,
  };
}
