import { useRoute } from 'vue-router';
import { useTabsViewStore, useElementStore } from '../stores';
import { RouterUtilities } from '../utilities';

export default function useEditFinish() {
  const route = useRoute();
  const routeStore = useElementStore();
  const tabs = useTabsViewStore();

  const onFinish = () => {
    const name = route.name as string;

    routeStore.removeRoutePushParam(name);
    tabs.deleteTab(route);
    RouterUtilities.getInstance().goBack();
  };

  return {
    onFinish,
  };
}
