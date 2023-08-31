<template>
  <q-toolbar class="bg-info text-white">
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="current"
        @update:model-value="(value) => getItems(value)"
        :max="totalPages"
        direction-links
      />
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
  </q-toolbar>
  <div>
    <ItemList :items="items"></ItemList>
  </div>
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
import axios from 'axios'
import { onMounted, ref } from 'vue'
export default {
  components: {
    ItemList
  },

  setup() {
    const items = ref([])
    const limit = 10
    const totalPages = ref(0)

    const Sort = (newValue) => {
      items.value.sort((item1, item2) => {
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
      } catch (error) {
        alert(error)
      }
    }

    onMounted(() => {
      getItems(1)
    })

    return {
      items,
      totalPages,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержимому' },
        { value: 'id', name: 'По id' }
      ],
      selectedSort: ref('Выберите сортировку'),
      Sort,
      getItems,
      getPicture,
    }
  }
}
</script>
<style></style>
