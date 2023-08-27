<template>
    <div @click="$r">
        <SiteHeader class="siteheader"></SiteHeader>
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
    }
}
</script>
<style></style>