<template>
    <select @change="changeOption">
        <option disabled value="">Выберите из списка</option>
        <option v-for="(option) in options" 
        :key="option.value" 
        :value="option.value"
        >
        {{ option.name }}
    </option>
    </select>
</template>

<script>
export default {
    name: "SelectList",
    props: {
        options: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        changeOption(event) {
            this.$emit('updated', event.target.value)
        }
    },
}
</script>

<style scoped>

</style>