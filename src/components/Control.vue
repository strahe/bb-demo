<script setup lang="ts">

import {useAppStore} from "@/stores/app";

const store = useAppStore();

const toggleMute = () => {
  store.muted = !store.muted;
}

</script>

<template>
  <v-row>
    <v-col
      cols="6"
    >
      <v-btn
        height="80"
        :prepend-icon="store.muted ? 'mdi-volume-off' : 'mdi-volume-high'"
        block
        color="primary"
        @click="toggleMute"
      >
        Mute
      </v-btn>
    </v-col>
    <v-col
      cols="6"
    >
      <v-btn
        prepend-icon="mdi-exit-to-app"
        height="80"
        block
        color="error"
        @click="store.leaveRoom()"
      >
        Exit
      </v-btn>
    </v-col>
  </v-row>
</template>

<style scoped lang="sass">

</style>
