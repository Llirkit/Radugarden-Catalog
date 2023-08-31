<template>
  <q-toolbar class="bg-info text-white">
    <div>
      <q-input type="text" label="Label" @update:model-value="(value) => onSearch(value)" />
    </div>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="current"
        @update:model-value="(value) => getItems(value)"
        :max="totalPages"
        direction-links
      />
      <div class="text-no-wrap">
        <q-select
          filled
          label="Сортировка"
          v-model="selectedSort"
          @update:model-value="(model) => Sort(model.value)"
          :options="sortOptions"
          :option-value="(option) => option.value"
          :option-label="(option) => option.name"
        />
      </div>
    </div>
  </q-toolbar>
  <div class="q-mt-sm q-ml-sm flex flex-right">
    <q-btn color="primary" icon="send" label="Post item" @click="postItem = true" />

    <q-dialog v-model="postItem">
      <q-card>
        <q-card-section class="row items-center">
          <PostForm @onSubmit="onSubmit" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
  <ItemList :items="modifiedItems" @DeleteItem="(item) => onDelete(item)"></ItemList>

  <q-toolbar class="bg-info text-white">
    <q-pagination
      v-model="current"
      @update:model-value="(value) => getItems(value)"
      :max="totalPages"
      direction-links
    />
  </q-toolbar>
</template>

<script>
import ItemList from '@/components/ItemList.vue'
import PostForm from '@/components/PostForm.vue'
import request from '../hooks/useRequest'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { Notify } from 'quasar'
export default {
  components: {
    ItemList,
    PostForm
  },

  setup() {
    const items = ref([])
    const modifiedItems = ref([])
    const limit = 10
    const totalPages = ref(0)
    const selectedSort = ref({ value: 'id', name: 'По id' })

    const onSearch = (value) => {
      modifiedItems.value = items.value.filter((elem) => elem.title.includes(value))
    }

    const Sort = (newValue) => {
      modifiedItems.value = items.value.sort((item1, item2) => {
        switch (typeof item1[newValue]) {
          case 'number':
            return item1[newValue] > item2[newValue] ? 1 : -1
          default:
            return item1[newValue]?.localeCompare(item2[newValue])
        }
      })
    }

    const getPicture = async (page) => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos', {
          params: {
            _limit: limit,
            _page: page
          }
        })
        return response.data
      } catch (error) {
        alert(error)
      }
    }

    const getItems = async (page) => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: limit,
            _page: page
          }
        })
        let images = await getPicture(page)
        for (const image in images) {
          response.data[image].image = images[image]
        }
        totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)
        items.value = response.data
        Sort(selectedSort)
      } catch (error) {
        alert(error)
      }
    }

    const onSubmit = async (item) => {
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', item, {
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        })
        const reqItem = response.data
        reqItem.image = await request.useRequestImage(reqItem.id)
        items.value.unshift(reqItem)
        Notify.create({
          message: 'Предмет создан',
          color: 'green',
          group: false
        })
      } catch (error) {
        console.log(error)
        Notify.create({
          message: 'Ошибка при создании предмета',
          color: 'red'
        })
      }
      Sort(selectedSort.value)
    }

    const onDelete = (item) => {
      try {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${item.id}`)
        // getItems(current.value)
        items.value = items.value.filter((elem) => !(elem == item))
        Notify.create({
          message: 'Предмет удален',
          type: 'positive',
          group: false
        })
      } catch (error) {
        Notify.create({
          message: 'Ошибка: Предмет не был удален',
          type: 'negative'
        })
      }
      Sort(selectedSort.value)
    }

    onMounted(() => {
      getItems(1)
    })

    return {
      postItem: ref(false),
      postItemData: ref({}),
      items,
      modifiedItems,
      current: ref(1),
      totalPages,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержимому' },
        { value: 'id', name: 'По id' }
      ],
      selectedSort,
      Sort,
      getItems,
      getPicture,
      onSubmit,
      onDelete,
      onSearch
    }
  }
}
</script>
<style></style>
