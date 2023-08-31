<script setup>
import axios from 'axios';
// import { useRequest } from '../hooks/useRequest'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { Notify } from 'quasar';

const route = useRoute()
const item = ref()


const useNotif = () => {
  Notify.create("Messege")
}
onMounted(async () => {
  const post = await axios.get(`https://jsonplaceholder.typicode.com/posts/${route.params.id}`)
  item.value = post.data
  const image = await axios.get(`https://jsonplaceholder.typicode.com/photos/${route.params.id}`)
  item.value.image = image.data
})
</script>

<template>
  <div class="page">
    <div class="container">
      <q-btn color="primary" icon="check" label="OK" @click="useNotif" />
      <div class="title">{{ item?.title }}</div>
      <div class="discription">
        <img class="item-image" :src="item?.image?.url" />
        <div class="body">{{ item?.body }}</div>
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
