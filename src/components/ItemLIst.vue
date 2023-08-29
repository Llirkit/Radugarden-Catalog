<template>
  <div class="item-list">
    <div class="item" v-for="item in items" :key="item.id">
      <q-card class="my-card">
        <router-link class="itemlink" :to="'/item/'+item.id">
        <q-card-section horizontal>
          <q-img :src="item.image.url" width="250px" height="250px" />

          <q-card-section class="wrap">
            <div class="text-h6">{{ item.title }}</div>
            {{ item.body }}
          </q-card-section>
        </q-card-section>
      </router-link>
        <q-separator />
      </q-card>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      require: true
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
  margin-bottom: 15px;
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

.itemlink {
  text-decoration: none;
  color:black
}

</style>
