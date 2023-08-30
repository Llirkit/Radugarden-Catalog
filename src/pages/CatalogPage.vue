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
import { ref } from 'vue'
export default {
  components: {
    ItemList
  },
  data() {
    return {
      items: [],
      limit: 10,
      totalPages: 0
    }
  },
  setup() {
    return {
      current: ref(1),
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержимому' },
        { value: 'id', name: 'По id' }
      ],
      selectedSort: ref('Выберите сортировку')
    }
  },
  methods: {
    Sort(newValue) {
      this.items.sort((item1, item2) => {
        switch (typeof item1[newValue]) {
          case 'number':
            return item1[newValue] > item2[newValue] ? 1 : -1
          default:
            return item1[newValue]?.localeCompare(item2[newValue])
        }
      })
    },
    async getPicture(page) {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos', {
          params: {
            _limit: this.limit,
            _page: page
          }
        })
        return response.data
      } catch (error) {
        alert(error)
      }
    },
    async getItems(page) {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: this.limit,
            _page: page
          }
        })
        let images = await this.getPicture(page)
        for (const image in images) {
          response.data[image].image = images[image]
        }
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.items = response.data
      } catch (error) {
        alert(error)
      }
    }
  },
  mounted() {
    this.getItems(this.current)
  },

}
</script>
<style></style>
