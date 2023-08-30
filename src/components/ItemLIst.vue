<template>
  <div class="item-list">
    <div class="item" v-for="item in items" :key="item.id">
      <q-card class="my-card">
        <router-link class="itemlink" :to="'/item/' + item.id">
          <q-card-section horizontal>
            <div class="row">
              <q-img 
              :src="item.image.url" 
              ratio="1:1" 
              fit="fill" 
              width="250px" 
              height="250px" />
            </div>
            <q-card-section>
              <div class="text-h6">{{ item.title }}</div>
              <div>{{ item.body }}</div>
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


.item {
  align-content: center;
  padding: 10px;
  margin-bottom: 15px;
  width: 100%;

}

.itemlink {
  text-decoration: none;
  color: black;
}
</style>
