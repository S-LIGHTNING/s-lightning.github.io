import { createWebHistory, createRouter, type RouteComponent } from "vue-router"

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: (): RouteComponent => import("@/pages/index.vue"),
            meta: { title: "SLIGHTNING" }
        }, {
            path: "/projects/",
            component: (): RouteComponent => import("@/pages/projects/index.vue"),
            meta: { title: "项目 | SLIGHTNING" }
        }, {
            path: "/:catchAll(.*)",
            component: (): RouteComponent => import("@/pages/page-index/index.vue")
        }
    ]
})
