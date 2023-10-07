<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { Notify } from 'quasar'
import usePost from '@/hooks/usePost'

const route = useRoute()
const item = ref()
const picture = ref()
const test2eb = ref()

const useNotif = () => {
  Notify.create('Messege')
}

onMounted(async () => {
  item.value = await usePost.getItem(route.params.id)
  picture.value = await usePost.getItemPicture(route.params.id)
})
</script>

<template>
  <div class="page">
    <div class="container">
      <q-btn color="primary" icon="check" label="OK" @click="useNotif" />
      <div class="title">{{ item?.title }}</div>
      <div class="discription">
        <img class="item-image" :src="picture?.url" />
        <div class="body">{{ item?.body }}</div>
      </div>
      <div>
        <q-btn
          color="primary"
          icon="delete"
          label="Удалить"
          @click="usePost.deleteItem(item?.id)"
        />
      </div>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
}

.title {
  width: 100%;
  border: 1px solid;
  margin-top: 5px;
  margin-bottom: 10px;
  margin-left: 3px;
  padding: 5px;
}

.discription {
  display: flex;
  flex-direction: row;
}

.item-image {
  float: left;
  margin-left: 5px;
  margin-right: 15px;
  width: 150px;
  height: 150px;
}
</style>
