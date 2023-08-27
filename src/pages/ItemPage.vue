<template>
    <div class="page">
        <SiteHeader></SiteHeader>
        <div class="container">
            <div class="title">{{ item.title }}</div>
            <div class="discription">
                <img class="item-image" :src="item.image.url" :alt="item.image.thumbnailUrl">
                <div class="body">{{ item.body }}</div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            item: {},
        }
    },
    methods: {
        async getItem(id) {
            try {
                const response = await axios("https://jsonplaceholder.typicode.com/posts", {
                    params: {
                        id: id,
                    }
                }).then((res) => res.data[0])
                    .then(async (res) => {
                        try {
                            res.image = await axios("https://jsonplaceholder.typicode.com/photos", {
                                params: {
                                    id: id,
                                }
                            }).then(res => res.data[0])
                            return res
                        } catch (error) {
                            alert(error)
                        }

                    })
                console.log(response)
                this.item = response
            } catch (error) {
                alert(error)
            }

        }
    },
    mounted() {
        this.getItem(this.$route.params.id)
        console.log("asdads")
    }
}
</script>
<style>
.container {
    display: flex;
    flex-direction: column;
}

.title {
    width: 100%;
    border: 1px solid;
}

.discription {
    display: flex;
    flex-direction: row;
}

.item-image {
    float: left;
    margin-right: 15px;
    width: 150px;
    height: 150px;
}
</style>