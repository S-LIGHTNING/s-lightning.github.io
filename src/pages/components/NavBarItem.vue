<script setup lang="ts">

import Icon from "@/components/Icon.vue"
import type { ContentAreaRecord } from "@/data/content"
import { getHeightToTop } from "@/utils/get-height-to-top"

const props = defineProps<{
    marginTop?: number
    data: ContentAreaRecord
}>()

function scrollToElement() {
    const element = document.getElementById(`content-${props.data.key}`)
    const top = getHeightToTop(element)
    document.documentElement.scrollTop = top - (props.marginTop ?? 0)
}

</script>

<template>
    <a class="item" @click=scrollToElement>
        <div class="icon"><Icon :src="data.icon" /></div>
        <div>{{ data.title }}</div>
    </a>
</template>

<style scoped>
.item {
    width: 64px;
    display: inline-block;
    flex-shrink: 0;
    cursor: pointer;
    filter: drop-shadow(0px 0px 0px #808080);
}
.item:hover {
    filter: drop-shadow(1px 1px 1px #808080);
}
.icon {
    font-size: 48px;
    display: block;
}
</style>
