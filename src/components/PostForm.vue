<script setup>
    import { ref } from "vue";
    const emits = defineEmits(['onSubmit'])

    const title = ref('')
    const body = ref('')

    const onSubmit = () => {
        emits('onSubmit', {
            title: title.value,
            body: body.value,
            userId: Math.floor(Math.random() * 100)
        })
        title.value = ''
        body.value = ''
    }

    const onReset = () => {
        title.value = ''
        body.value = ''
    }
</script>

<template>
    <q-form
        focus
        @submit="onSubmit()"
        @reset="onReset"
        class="q-gutter-md"
    >
        <div>
            <q-input v-model="title" label="Title"/>
            <q-input v-model="body" label="Text of post" autogrow />
        </div>
        <div>
            <q-btn label="Submit" type="submit" color="primary" v-close-popup/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
    </q-form>
</template>

<style lang="scss" scoped>

</style>