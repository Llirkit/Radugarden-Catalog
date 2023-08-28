<template>
    <div>
        <button class="site-button">
            <slot></slot>
        </button>
    </div>
</template>

<script>
    export default {
        name: "SiteButton"
    }
</script>

<style >
.site-button {
    margin: 15px;
    width: 100px;
    border-radius: 10px;
    background: rgba(214, 218, 255, 0.38);
}
</style>