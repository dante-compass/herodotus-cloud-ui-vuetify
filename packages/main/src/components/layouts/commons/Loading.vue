<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center" style="height: 100vh">
      <v-col cols="12" sm="8" md="6" lg="4" align-self="center">
        <v-card class="py-12" flat rounded="xl">
          <v-card-text class="text-center">
            <v-progress-circular
              :size="70"
              :width="7"
              color="primary"
              indeterminate
            ></v-progress-circular>
            <p class="text-h6 mt-6 mb-6">正在加载，请稍候...</p>
            <v-progress-linear
              indeterminate
              chunk-gap="2"
              chunk-width="50"
              color="primary"
              height="10"
              rounded
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
defineOptions({ name: 'loading' });
</script>

<style lang="scss" scoped></style>
