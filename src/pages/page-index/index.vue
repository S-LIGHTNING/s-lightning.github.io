<script setup lang="ts">

import { watchEffect } from "vue"

import { type IPageInfo } from "@/page/page-info"
import { rootPage } from "@/page/root-page"
import { router } from "@/app/router"
import PageInfo from "./components/PageInfo.vue"

let page: IPageInfo | null | undefined = null

watchEffect((): void => {
    page = rootPage
    for (const slagName of router.currentRoute.value.path.split("/")) {
        if (slagName == "") {
            continue
        }
        page = page?.subPages?.find((page) => page.slagName == slagName)
        if (page == null) {
            break
        }
    }
    if (page == null) {
        document.title = "找不到页面 | SLIGHTNING"
    } else {
        document.title = `${page.name} | SLIGHTNING`
    }
})

</script>

<template>
    <h1 v-if="page == null">404 找不到页面！</h1>
    <ul><PageInfo :baseURL="page == null ? `/` :router.currentRoute.value.path.replace(/[^\/]+\/?$/, ``)" :page="page ?? rootPage" /></ul>
</template>
