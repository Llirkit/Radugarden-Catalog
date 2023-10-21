<script setup>

import {ref} from "vue";

const prop = ref(true)

</script>


<template>
  <q-drawer
      v-model="prop"
      show-if-above
      :width="200"
      :breakpoint="700"
      elevated
      class="bg-primary text-white"
  />

</template>

<style scoped>

</style>
