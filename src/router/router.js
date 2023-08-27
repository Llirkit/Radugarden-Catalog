import MainPage from '@/pages/MainPage.vue'
import ItemPage from '@/pages/ItemPage.vue'
import CatalogPage from '@/pages/CatalogPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/item/:id',
        component: ItemPage
    },
    {
        path: '/catalog',
        component: CatalogPage
    }
]
const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;