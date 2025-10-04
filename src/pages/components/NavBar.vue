<script setup lang="ts">

import { ref, watchEffect, type ComponentInstance, type Ref } from "vue"
import type Content from "./Content.vue"
import NavBarItem, { type NavBarItemData } from "./NavBarItem.vue"
import { useDocumentScrollRate } from "@/utils/use-document-scroll-rate"

const props = defineProps<{
    content?: ComponentInstance<typeof Content> | undefined
    marginTop?: number
}>()

const items = ref<NavBarItemData[]>([])

watchEffect((): void => {
    const element = props.content?.$el as HTMLElement | undefined
    if (element == undefined) {
        return
    }
    items.value = []
    for (const contentElement of element.querySelectorAll(".content-group")) {
        items.value.push({
            title: contentElement.getAttribute("data-title") ?? "",
            icon: contentElement.getAttribute("data-icon"),
            target: contentElement
        })
    }
})

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
        <NavBarItem v-for="item in items" ...=item :marginTop />
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
