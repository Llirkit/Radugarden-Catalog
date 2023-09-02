<script setup>
import { Dialog, Notify } from 'quasar'
import { ref, onMounted } from 'vue'
import usePost from '../hooks/usePost'

const itemOnPageLimit = 10
const maxPages = ref(0)
const currentPage = ref(1)

const itemList = ref([])

const sortOptions = [
  { value: 'title', label: 'По названию' },
  { value: 'body', label: 'По содержимому' },
  { value: 'id', label: 'По id' }
]
const selectedSort = ref(sortOptions[2])

const search = ref('')
const postItem = ref(false)

const loadItems = async () => {
  await usePost.getItemList(currentPage.value, itemOnPageLimit, itemList)
}

const deleteConfirm = (id) => {
  console.log(id)
  Dialog.create({
    title: 'Confirm',
    message: 'Ya sure?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    usePost.deleteItem(id, itemList.value)
  })
}

const title = ref('')
const body = ref('')

const onSubmit = async () => {
  const response = await usePost.createItem({
    title: title.value,
    body: body.value
  })
  if (response?.error) {
    Notify.create({
      type: 'negative',
      message: `Ошибка при создании:\n${response.error.code}`,
      group: false
    })
    onReset()
  } else {
    Notify.create({
      type: 'positive',
      message: 'Успешно созданно!',
      group: false
    })
    response.image = await usePost.getItemPicture(response.id)
    itemList.value.unshift(response)
    onReset()
  }
}

const onReset = () => {
  title.value = ''
  body.value = ''
}

const onSearch = async () => {
  await loadItems()
  itemList.value = usePost.searchItem(search.value, itemList.value)
}

onMounted(async () => {
  maxPages.value = await usePost.getPagesCount(itemOnPageLimit)
  loadItems()
})
</script>

<template>
  <div class="item-list">
    <div class="q-ma-sm q-ml-sm flex flex-right">
      <q-btn color="primary" icon="send" label="Post item" @click="postItem = true" />
      <q-dialog v-model="postItem">
        <q-card>
          <q-form focus @submit="onSubmit()" @reset="onReset" class="q-ma-md">
            <div>
              <q-input v-model="title" label="Title" />
              <q-input v-model="body" label="Text of post" autogrow class="q-mb-md" />
            </div>
            <div>
              <q-btn label="Submit" type="submit" color="primary" v-close-popup />
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </q-card>
      </q-dialog>
    </div>
    <div class="flex">
      <q-input
        v-model="search"
        @update:model-value="onSearch"
        filled
        autogrow
        type="search"
        class="q-ml-sm"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-pagination
        v-model="currentPage"
        :max="maxPages"
        @update:model-value="loadItems()"
        direction-links
      />
      <q-select
        filled
        label="Сортировка"
        v-model="selectedSort"
        @update:model-value="usePost.sortItemList(selectedSort.value, itemList)"
        :options="sortOptions"
      />
    </div>
    <div class="item" v-for="item in itemList" :key="item.id">
      <q-card class="my-card">
        <q-card-section horizontal>
          <router-link class="itemlink" :to="'/item/' + item.id">
            <div class="row">
              <q-img :src="item?.image?.url" ratio="1:1" fit="fill" width="250px" height="250px" />
            </div>
          </router-link>
          <q-card-section>
            <router-link class="itemlink" :to="'/item/' + item.id">
              <div class="text-h6">{{ item.title }}</div>
              <div>{{ item.body }}</div>
            </router-link>
            <div class="flex column-reverse">
              <q-btn
                color="primary"
                icon="delete"
                label="Удалить"
                @click="deleteConfirm(item.id)"
              />
            </div>
          </q-card-section>
        </q-card-section>

        <q-separator />
      </q-card>
    </div>
  </div>
</template>

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
