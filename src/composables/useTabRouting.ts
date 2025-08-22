import { watch, onMounted, type Ref, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

interface TabNode {
  queryName: string;
  store: Ref<string>; // binds to the active tab
  tabs: readonly string[];
  parent?: TabNode;
  parentValue?: string;
  // Query appears only if parent.store.value === parentValue
}

export function createNestedTabRoutingFactory() {
  const router = useRouter();
  const route = useRoute();

  const pendingQueryUpdates: Record<string, string | undefined> = {};
  let scheduled = false;

  function scheduleQueryUpdate() {
    if (scheduled) return;
    scheduled = true;

    Promise.resolve().then(() => {
      const query = { ...router.currentRoute.value.query };

      for (const [key, val] of Object.entries(pendingQueryUpdates)) {
        if (val === undefined) {
          delete query[key];
        } else {
          query[key] = val;
        }
      }

      // otherwise hash gets removed
      const currentQuery = router.currentRoute.value.query;
      if (
        [...Object.keys(currentQuery), ...Object.keys(query)].some(
          (key) => currentQuery[key] !== query[key]
        )
      ) {
        router.push({ query });
      }

      for (const key in pendingQueryUpdates) {
        delete pendingQueryUpdates[key];
      }
      scheduled = false;
    });
  }

  function setupTabRouting({
    queryName,
    store,
    tabs,
    parent,
    parentValue,
  }: TabNode) {
    onMounted(() => {
      if (store.value === "") {
        store.value = tabs[0]!;
      }

      const urlValue = route.query[queryName];
      if (typeof urlValue === "string" && tabs.includes(urlValue)) {
        store.value = urlValue;
      }
    });

    watch(
      [store, parent ? parent.store : ref("")],
      ([newVal, currentParentValue]) => {
        pendingQueryUpdates[queryName] = newVal;
        if (parent && parentValue !== currentParentValue) {
          pendingQueryUpdates[queryName] = undefined;
        }
        scheduleQueryUpdate();
      },
      { immediate: true }
    );

    watch(
      () => route.query[queryName],
      (newVal) => {
        if (typeof newVal === "string" && tabs.includes(newVal)) {
          store.value = newVal;
        }
      }
    );
  }

  return { setupTabRouting };
}
