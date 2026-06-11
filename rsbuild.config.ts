import { defineConfig } from "@rsbuild/core"
import { pluginVue } from "@rsbuild/plugin-vue"
import path from "path"

import { rootPage } from "./src/page/root-page"
import { IPageInfo } from "./src/page/page-info"

const pages = ["index", "404"]
function addPage(basePath: string, page: IPageInfo) {
    pages.push(path.join(basePath, page.slagName, "index"))
    for (const subPage of page.subPages ?? []) {
        addPage(path.join(basePath, page.slagName), subPage)
    }
}
for (const subPage of rootPage.subPages ?? []) {
    addPage("", subPage)
}

// Docs: https://rsbuild.rs/config/
export default defineConfig({
    source: {
        entry:
            process.env.NODE_ENV !== "development" ?
            Object.fromEntries(pages.map(page => [page, "./src/index"])) :
            undefined
    },
    html: {
        title: "SLIGHTNING",
        favicon: "./public/res/icon.png",
        tags: [
            {
                tag: "link",
                attrs: {
                    rel: "stylesheet",
                    href: "https://unpkg.com/font-awesome@4/css/font-awesome.css"
                }
            }
        ]
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        }
    },
    plugins: [pluginVue()]
})
