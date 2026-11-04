import type { ThemeMode } from "@herodotus/core";

import { watch, shallowRef, computed, nextTick, watchEffect } from "vue";
import { useTheme } from "vuetify";

import { toast, notify } from "@herodotus/core";
import { ThemeModeEnum } from "@herodotus/core";
import { useSettingsStore } from "@herodotus/framework";

export default function useSystemTheme() {
  const settings = useSettingsStore();
}
