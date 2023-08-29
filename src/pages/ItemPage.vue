<template>
    <div class="page">
        <SiteHeader></SiteHeader>
        <div class="container">
            <div class="title">{{ item?.value?.title }}</div>
            <div class="discription">
                <img class="item-image" :src="item?.value?.image?.url">
                <div class="body">{{ item?.value?.body }}</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRequest } from '../hooks/useRequest';
import { useRoute } from 'vue-router'
import { reactive } from "vue";
        const route = useRoute()
        const {item} = reactive(useRequest(route.params?.id))

</script>
<style>
.container {
    display: flex;
    flex-direction: column;
}

.title {
    width: 100%;
    border: 1px solid;
    margin-top: 5px;
    margin-bottom: 10px;
    margin-left: 3px;
    padding: 5px;
}

.discription {
    display: flex;
    flex-direction: row;
}

.item-image {
    float: left;
    margin-left: 5px;
    margin-right: 15px;
    width: 150px;
    height: 150px;
}
</style>