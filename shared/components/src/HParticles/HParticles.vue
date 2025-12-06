<template>
  <div :id="id">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import type { Container, Engine } from '@tsparticles/engine';

import { shallowRef, onMounted, onUnmounted, nextTick } from 'vue';
import { tsParticles } from '@tsparticles/engine';
import { loadBasic } from '@tsparticles/basic';
import { loadParticlesLinksInteraction } from '@tsparticles/interaction-particles-links';

import { options } from './particles';

defineOptions({ name: 'HParticles' });

const id = shallowRef('HParticles');

let container: Container | undefined;

const loadTrianglesPreset = async (engine: Engine, refresh = true): Promise<void> => {
  await loadBasic(engine, false);
  await loadParticlesLinksInteraction(engine, false);

  await engine.addPreset('triangles', options, refresh);
};

onMounted(() => {
  nextTick(async () => {
    tsParticles.init();

    await loadTrianglesPreset(tsParticles);

    container = await tsParticles.load({
      id: id.value,
      options: {
        fullScreen: {
          zIndex: 1,
        },
        preset: 'triangles',
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
