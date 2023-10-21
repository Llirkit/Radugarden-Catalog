<template>
  <q-layout view="hHh lpr fFf">
    <draw-first v-if="draw"/>
    <head-sec @draw="change"/>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import DrawFirst from "@/components/drawFirst.vue";
import HeadSec from "@/components/headSec.vue";
import {ref} from "vue";

const draw = ref(true)

const change = function () {
  draw.value = !draw.value
}

</script>

<style></style>
