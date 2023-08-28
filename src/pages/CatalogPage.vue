<template>
    <div @click="$r">
        <SiteHeader class="siteheader"></SiteHeader>
        <div class="sort">
            Сортировка
            <SelectList style="margin-left: 10px;" v-model="selectedSort" :options="sortOptions"></SelectList>
        </div>
        <ItemList :items="items"></ItemList>
    </div>
</template>
<script>
import ItemList from '@/components/ItemList.vue'
import axios from "axios";
export default {
    components: {
        ItemList,
    },
    data() {
        return {
            items: [],
            selectedSort: '',
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержимому'},
                {value: 'id', name: 'По id'},
            ],
        }
    },
    methods: {
        async getPicture(limit) {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/photos", {
                    params: {
                        _limit: limit
                    }
                })
                return response.data
            } catch (error) {
                alert(error)
            }

        },
        async getItems(limit) {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                    params: {
                        _limit: limit,
                    }
                })
                let images = await this.getPicture(limit);
                for (const image in images) {
                    response.data[image].image = images[image];
                }
                this.items = response.data
            } catch (error) {
                alert(error)
            }
        },
    },
    mounted() {
        this.getItems(10)
    },
    watch: {
        selectedSort(newValue) {
            this.items.sort((item1,item2) => {
                switch (newValue) {
                    case 'id':
                        return item1[newValue]>item2[newValue] ? 1 : -1                
                    default:
                        return item1[newValue]?.localeCompare(item2[newValue])
                }
                
            })
        }
    }
}
</script>
<style>
.sort {
    display: flex;
    margin: 10px 0px 0px 10px;
}
</style>