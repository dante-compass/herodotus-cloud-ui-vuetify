import { useRoute, type RouteLocationNormalizedGeneric, type RouteLocationNormalizedLoaded } from "vue-router";
import { useTabsViewStore, useElementStore } from "../stores";
import { RouterUtilities } from "../utilities";

import { isEmpty } from "lodash-es";

export default function useDetailPage() {
  const routeStore = useElementStore();
  const tabsViewStore = useTabsViewStore();

  const parseComponentName = (name: string, route?: RouteLocationNormalizedLoaded): string => {
    if (name) {
      return name;
    } else {
      let currentRoute = route;
      if (isEmpty(currentRoute)) {
        currentRoute = useRoute();
      }

      if (currentRoute && currentRoute.name) {
        return currentRoute.name as string;
      } else {
        return "";
      }
    }
  };

  const goBack = (parentName: string, currentName: string) => {
    console.log("----aaa---", parentName);
    console.log("----bbb---", currentName);
    if (!isEmpty(parentName) && !isEmpty(currentName)) {
      routeStore.removeRoutePushParam(currentName);
      tabsViewStore.deleteTabByName(currentName);
      RouterUtilities.getInstance().push({ name: parentName });
    } else {
      // 如果名称为空则强制返回
      RouterUtilities.getInstance().goBack();
    }
  };

  return {
    parseComponentName,
    goBack,
  };
}
