import { useRoute } from "vue-router";
import { useTabsViewStore, useElementStore } from "../stores";
import { RouterUtilities } from "../utilities";

export default function useEditFinish() {
  const route = useRoute();
  const routeStore = useElementStore();
  const tabsViewStore = useTabsViewStore();

  const onFinish = () => {
    const name = route.name as string;

    routeStore.removeRoutePushParam(name);
    tabsViewStore.deleteTab(route);
    RouterUtilities.getInstance().goBack();
  };

  return {
    onFinish,
  };
}
