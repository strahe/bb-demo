<script setup lang="ts">

import TRTC from "trtc-sdk-v5";
import {useAppStore} from "@/stores/app";

const store = useAppStore();
const trtc = inject('trtc') as TRTC;

async function handleStartLocalAudio() {
  try {
    await trtc.startLocalAudio({
      option: {
        microphoneId: store.selectMicrophone?.deviceId,
      },
    });
    store.addLogs('start local audio');
  } catch (error) {
    store.addLogs('start local audio failed: '+ error);
  }
}

async function handleStopLocalAudio() {
  try {
    await trtc.stopLocalAudio();
    store.addLogs('stop local audio');
  } catch (error) {
    store.addLogs('stop local audio failed: ' + error);
  }
}
</script>

<template>
  <v-btn
    class="mt-6"
    prepend-icon="mdi-microphone"
    height="100"
    block
    color="primary"
    large
    :disabled="store.selectMicrophone === undefined"
    @mousedown="handleStartLocalAudio"
    @mouseup="handleStopLocalAudio"
    @mouseleave="handleStopLocalAudio"
  >
    PTT
  </v-btn>
</template>

<style scoped lang="sass">

</style>
