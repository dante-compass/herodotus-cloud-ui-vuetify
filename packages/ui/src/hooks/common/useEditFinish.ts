import { useRoute } from 'vue-router';
import { useTabsStore, useRouterStore } from '@/stores';
import { RouterUtils } from '@/configurations';

export default function useEditFinish() {
  const route = useRoute();
  const routeStore = useRouterStore();
  const tabs = useTabsStore();

  const onFinish = () => {
    const name = route.name as string;

    routeStore.removeRoutePushParam(name);
    tabs.deleteTab(route);
    RouterUtils.goBack();
  };

  return {
    onFinish,
  };
}
