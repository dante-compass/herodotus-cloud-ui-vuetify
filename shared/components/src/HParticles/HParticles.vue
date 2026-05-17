<template>
  <div :id="id">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { Container } from "@tsparticles/engine";

import { shallowRef, onMounted, onUnmounted, nextTick } from "vue";
import { tsParticles } from "@tsparticles/engine";
import { loadTrianglesPreset } from "@tsparticles/preset-triangles";

import { options } from "./particles";

defineOptions({ name: "HParticles" });

const id = shallowRef("HParticles");

let container: Container | undefined;

onMounted(() => {
  nextTick(async () => {
    await loadTrianglesPreset(tsParticles);

    container = await tsParticles.load({
      id: id.value,
      options: {
        fullScreen: {
          zIndex: 1,
        },
        preset: "triangles",
        background: { color: "transparent" },
        particles: {
          number: {
            density: {
              enable: true,
              width: 1920,
              height: 1080,
            },
            value: 100,
          },
          links: {
            distance: 125,
            enable: true,
            triangles: {
              enable: true,
              opacity: 0.1,
            },
          },
          move: {
            enable: true,
            speed: 5,
          },
          size: {
            value: 1,
          },
          shape: {
            type: "circle",
          },
        },
      },
    });
  });
});

onUnmounted(() => {
  if (container) {
    container.destroy();
    container = undefined;
  }
});
</script>
