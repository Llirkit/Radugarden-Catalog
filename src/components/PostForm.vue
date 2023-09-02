<script setup>
import { ref } from 'vue'
import usePost from '@/hooks/usePost'
import { Notify } from 'quasar'

const title = ref('')
const body = ref('')

const onSubmit = async () => {
  const response = await usePost.createItem({
    title: title.value,
    body: body.value
  })
  if (response?.error) {
    Notify.create({
      type: 'negative',
      message: `Ошибка при создании:\n${response.error.code}`
    })
  } else {
    Notify.create({
      type: 'positive',
      message: 'Успешно созданно!'
    })
    return response
  }
}

const onReset = () => {
  title.value = ''
  body.value = ''
}
</script>

<template>
  <q-form focus @submit="onSubmit()" @reset="onReset" class="q-ma-md">
    <div>
      <q-input v-model="title" label="Title" />
      <q-input v-model="body" label="Text of post" autogrow class="q-mb-md" />
    </div>
    <div>
      <q-btn label="Submit" type="submit" color="primary" v-close-popup />
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
</template>

<style lang="scss" scoped></style>
