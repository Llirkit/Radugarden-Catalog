<script setup>

</script>

<template>
  <q-header reveal elevated class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-btn flat @click="$emit('draw')" round dense icon="menu" />
      <q-toolbar-title>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>
        RaduGarden
      </q-toolbar-title>
    </q-toolbar>

    <q-tabs align="left">
      <q-route-tab to="/home" label="Домой" />
      <q-route-tab to="/catalog" label="Каталог" />
    </q-tabs>
  </q-header>
</template>

<style scoped>

</style>
