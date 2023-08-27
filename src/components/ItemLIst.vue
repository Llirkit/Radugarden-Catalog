<template>
    <div class="item-list">
        <div class="item" v-for="item in  items " :key="item.id">
            <router-link :to="{ path: '/item/' + item.id }">
                <img class="item-image" :src="item.image.url" :alt="item.image.thumbnailUrl">
                <div><strong>Название:</strong> {{ item.title }}</div>
                <div><strong>Описание:</strong> {{ item.body }}</div>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        items: {
            type: Array,
            require: true,
        }
    }
}
</script>
<style>
.item-list {
    display: flex;
    flex-direction: column;
}

.item {
    align-content: center;
    padding: 15px;
    margin-top: 15px;
    width: 100%;
    border: 1px solid;
    border-radius: 10px;
}

.item-image {
    float: left;
    margin-right: 15px;
    max-width: 150px;
    max-height: 150px;
}
</style>