import type { RouteLocationNormalizedGeneric } from "vue-router";
import { useRoute } from "vue-router";
import { useTabsViewStore, useElementStore } from "../stores";
import { RouterUtilities } from "../utilities";

import { isEmpty } from "lodash-es";

export default function useEditFinish(realRoute?: RouteLocationNormalizedGeneric) {
  const routeStore = useElementStore();
  const tabsViewStore = useTabsViewStore();

  const getRoute = (): RouteLocationNormalizedGeneric | undefined => {
    if (!isEmpty(realRoute)) {
      return realRoute;
    } else {
      // 在当前 Vuetify 版本下 useRoute() 使用正常。但是将其放到升级至新版本 Quasar 依赖环境下就会报错。
      const innerRoute = useRoute();
      if (!isEmpty(innerRoute)) {
        return innerRoute;
      } else {
        return undefined;
      }
    }
  };

  const onFinish = () => {
    const route = getRoute();

    console.log("---onFinish--", route);

    console.log("---onFinish--", route?.name);
    if (!isEmpty(route) && route.name) {
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
