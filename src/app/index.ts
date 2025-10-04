import "@/assets/styles/global.css"
import { createApp } from "vue"
import App from "./index.vue"
import { router } from "./router"

router.beforeEach((to): void => {
    const { title } = to.meta
    if (typeof title == "string") {
        document.title = title
    }
})

createApp(App).use(router).mount("#app")
