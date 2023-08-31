<template>
  <div class="item-list">
    <div class="item" v-for="item in props.items" :key="item.id">
      <q-card class="my-card">
        <q-card-section horizontal>
          <router-link class="itemlink" :to="'/item/' + item.id">
            <div class="row">
              <q-img :src="item.image.url" ratio="1:1" fit="fill" width="250px" height="250px" />
            </div>
          </router-link>
          <q-card-section>
            <router-link class="itemlink" :to="'/item/' + item.id">
              <div class="text-h6">{{ item.title }}</div>
              <div>{{ item.body }}</div>
            </router-link>
            <div class="flex column-reverse">
              <q-btn color="primary" icon="delete" label="Удалить" @click="onDeleteItem(item)" />
            </div>
          </q-card-section>
        </q-card-section>

        <q-separator />
      </q-card>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    require: true
  }
})

const emits = defineEmits(['DeleteItem'])
const onDeleteItem = (item) => {
  emits('DeleteItem', item)
}
</script>
<style>
.item {
  align-content: center;
  padding: 10px;
  margin-bottom: 15px;
  width: 100%;
}

.itemlink {
  text-decoration: none;
  color: black;
}
</style>
