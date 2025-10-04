import { fileURLToPath, URL } from "url"

import { defineConfig, UserConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueDevTools from "vite-plugin-vue-devtools"

export default defineConfig((): UserConfig => {
    return {
        plugins: [
            vue(),
            vueDevTools()
        ],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url))
            }
        }
    }
})
