<script setup lang="ts">
import TRTC from "trtc-sdk-v5";
import {useAppStore} from "@/stores/app";

const store = useAppStore();

const selectMicrophone = ref<MediaDeviceInfo>();
const microphones = ref<MediaDeviceInfo[]>([]);

onMounted(async () => {
  microphones.value = await TRTC.getMicrophoneList() as MediaDeviceInfo[];
});

watch(selectMicrophone, (newVal) => {
  store.selectMicrophone = newVal;
  store.addLogs('select microphone: ' + newVal?.label);
});
</script>

<template>
  <v-autocomplete
    v-model="selectMicrophone"
    class="mt-2"
    :items="microphones"
    item-title="label"
    label="microphones"
    item-value="deviceId"
    return-object
  />
</template>

<style scoped lang="sass">

</style>
