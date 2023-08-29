
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',

        component: () => import("@/Layouts/MainLayout.vue"),

        children: [
            {
                path: '/home',
                component: () => import("@/pages/MainPage.vue")
            },
            {
                path: '/item/:id',
                component: () => import('@/pages/ItemPage.vue')
            },
            {
                path: '/catalog',
                component: () => import('@/pages/CatalogPage.vue')
            },
        ]
    }
]
const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;