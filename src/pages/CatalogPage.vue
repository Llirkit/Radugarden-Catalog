<template>
  <q-toolbar class="bg-info text-white">
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="current"
        @update:model-value="(value) => getItems(value)"
        :max="totalPages"
        direction-links
      />
    </div>
  </q-toolbar>
  <div>
    <ItemList :items="items"></ItemList>
  </div>
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
      totalPages: 0,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержимому' },
        { value: 'id', name: 'По id' }
      ]
    }
  },
  setup() {
    return {
      current: ref(1)
    }
  },
  methods: {
    selectedSort(newValue) {
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
  watch: {}
}
</script>
<style></style>
