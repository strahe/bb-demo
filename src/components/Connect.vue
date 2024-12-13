<script setup lang="ts">
import {useAppStore} from "@/stores/app";

const store = useAppStore();


const inputRules = [
  (value: string) => {
    if (value) return true

    return 'You must enter a value.'
  },
]
</script>

<template>
  <v-form
    class="mt-2"
    fast-fail
    @submit.prevent="store.enterRoom"
  >
    <v-text-field
      v-model="store.sdkAppId"
      label="App ID"
      :rules="inputRules"
    />
    <v-text-field
      v-model="store.sdkSecretKey"
      label="Secret Key"
      :rules="inputRules"
    />
    <v-text-field
      v-model="store.userId"
      label="User ID"
      :rules="inputRules"
    />
    <v-text-field
      v-model="store.channelId"
      label="Channel ID"
      :rules="inputRules"
    />
    <v-btn
      color="primary"
      type="submit"
      block
      size="large"
    >
      Connect
    </v-btn>
  </v-form>
</template>

<style scoped lang="sass">

</style>
