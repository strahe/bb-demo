<script setup lang="ts">
import {useAppStore} from "@/stores/app";

const store = useAppStore();
</script>

<template>
  <v-textarea
    v-model="store.logText"
    label="Logs"
    variant="outlined"
    class="mt-2"
    readonly
    density="comfortable"
    rows="15"
  />
</template>

<style scoped lang="sass">

</style>
