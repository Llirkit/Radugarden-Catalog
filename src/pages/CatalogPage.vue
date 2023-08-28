<template>
    <div @click="$r">
        <SiteHeader class="siteheader"></SiteHeader>
        <div class="sort">
            Сортировка
            <SelectList style="margin-left: 10px;" v-model="selectedSort" :options="sortOptions"></SelectList>
        </div>
        <div class="buttons">
            <site-button @click="prevPage">Prev Pg</site-button>
            <site-button @click="nextPage">Next Pg</site-button>
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
            page: 1,
            limit: 10,
            totalPages: 0,
            selectedSort: '',
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержимому'},
                {value: 'id', name: 'По id'},
            ],
        }
    },
    methods: {
        async getPicture() {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/photos", {
                    params: {
                        _limit: this.limit,
                        _page: this.page,
                    }
                })
                return response.data
            } catch (error) {
                alert(error)
            }

        },
        async getItems() {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                    params: {
                        _limit: this.limit,
                        _page: this.page,
                    }
                })
                let images = await this.getPicture(this.limit);
                for (const image in images) {
                    response.data[image].image = images[image];
                }
                this.totalPages= Math.ceil(response.headers['x-total-count']/this.limit)
                this.items = response.data
            } catch (error) {
                alert(error)
            }
        },
        prevPage() {
            if(this.page === 1)
                this.page = this.totalPages
            else
                this.page--
            this.getItems()
        },
        nextPage() {
            if(this.page === this.totalPages)
                this.page = 1
            else
                this.page++
            this.getItems()
        },
    },
    mounted() {
        this.getItems(10)
    },
    watch: {
        selectedSort(newValue) {
            this.items.sort((item1,item2) => {
                switch (typeof item1[newValue]) {
                    case 'number':
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
.buttons {
    display: flex;
    flex-direction: row;
    margin-bottom: 0px;
}
</style>