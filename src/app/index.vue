<script setup lang="ts">

import { ref, watchEffect } from "vue"
import { RouterView } from "vue-router"

import { router } from "./router"
import type { IPageInfo } from "@/page/page-info"
import { rootPage } from "@/page/root-page"

const links = ref<{ path: string, name: string }[]>([])
watchEffect((): void => {
    links.value = []
    if (router.currentRoute.value.path == "/") {
        return
    }
    links.value.push({ path: "/", name: "主页" })
    let path = "/"
    let page: IPageInfo | null | undefined  = rootPage
    page = rootPage
    for (const slagName of router.currentRoute.value.path.split("/")) {
        if (slagName == "") {
            continue
        }
        page = page?.subPages?.find((page) => page.slagName == slagName)
        path += slagName
        path += "/"
        links.value.push({ path, name: page?.name ?? slagName })
    }
})

</script>

<template>
    <main>
        <iframe class="background" src="https://s-lightning.github.io/clock/"></iframe>
        <div class="card" :class="router.currentRoute.value.path == `/` ? null : `card-blur`">
            <div class="path">
                <RouterLink
                    class="path--name"
                    v-for="{ path, name } in links"
                    :to=path
                >{{ `> ${name} ` }}</RouterLink>
            </div>
            <RouterView />
        </div>
    </main>
</template>

<style scoped>
.background {
    width: 100%;
    height: 100%;
    position: fixed;
    inset: 0px;
    border: none;
    z-index: -1;
    filter: hue-rotate(180deg) invert(100%);
}
@media (prefers-color-scheme: dark) {
    .background {
        filter: none;
    }
}
.path {
    display: flex;
}
.path--name {
    margin-right: 4px;
    margin-bottom: 4px;
}
.card {
    margin: auto;
    padding: 8px;
    max-width: 64rem;
    transition: all 0.6s;
    min-height: calc(100dvh - 10dvw - 16px);
    box-shadow: 0rem 0rem 2rem #BABABA;
    background-color: var(--background-color);
}
.card-blur {
    backdrop-filter: blur(16px);
}
</style>
