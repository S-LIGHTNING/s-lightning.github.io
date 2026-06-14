<script setup lang="ts">

import { ref, watchEffect } from "vue"
import NavBarItem from "./NavBarItem.vue"
import { useDocumentScrollRate } from "@/utils/use-document-scroll-rate"
import type { ContentAreaRecord } from "@/data/content.ts"

const props = defineProps<{
    marginTop?: number
    data: ContentAreaRecord[]
}>()

const navBarElement = ref<HTMLElement | undefined>()
const documentScrollRate = useDocumentScrollRate()

watchEffect(() => {
    if (navBarElement.value == undefined) {
        return
    }
    navBarElement.value.scrollLeft = documentScrollRate.value * (navBarElement.value.scrollWidth - navBarElement.value.clientWidth)
})

</script>

<template>
    <nav ref="navBarElement" class="nav-bar">
        <NavBarItem v-for="item in data" :data="item" :marginTop />
    </nav>
</template>

<style scoped>
.nav-bar {
    position: sticky;
    z-index: 8;
    text-align: center;
    top: 0px;
    margin-block: 16px;
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
}
@media only screen and (min-width: 512px) {
    .nav-bar {
        top: 76px;
        width: 64px;
        margin-block: 0px;
        display: inline-table;
    }
}
</style>
