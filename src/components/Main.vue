<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import Log from "@/components/Log.vue";
import Device from "@/components/Device.vue";
import Connect from "@/components/Connect.vue";
import Control from "@/components/Control.vue";

const store = useAppStore();
</script>

<template>
  <v-container>
    <Connect v-if="!store.connected" />
    <template v-else>
      <Log :style="{ height: '70%' }" />
      <Device />
      <Control />
      <PTT />
    </template>
  </v-container>
</template>
