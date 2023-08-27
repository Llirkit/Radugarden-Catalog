<template>
    <div class="header-background">
        <button class="header-button" @click="$router.push('/')">Главная</button>
    </div>
</template>
<script>
export default {
    name: 'SiteHeader'
}
</script>
<style>
.header-background {
    display: flex;
    height: 50px;
    background: linear-gradient(270deg, rgba(199, 210, 166, 0.18) 0%, #D1EC85 0%, #748640 99.99%, #D6F974 100%);
}

.header-button {
    margin: 10px;
    width: 100px;
    align-items: center;
    border-radius: 10px;
    background: rgba(214, 218, 255, 0.38);
}
</style>