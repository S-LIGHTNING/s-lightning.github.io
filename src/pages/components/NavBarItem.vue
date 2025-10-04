<script setup lang="ts">

import { getHeightToTop } from "@/utils/get-height-to-top"

const props = defineProps<{
    marginTop?: number
} & NavBarItemData>()

export interface NavBarItemData {
    title: string
    icon?: string | null | undefined
    target?: Element | null | undefined
}

function scrollToElement() {
    const top = getHeightToTop(props.target)
    document.documentElement.scrollTop = top - (props.marginTop ?? 0)
}

</script>

<template>
    <a class="item" @click=scrollToElement>
        <i class="icon fa" :class="icon ?? `fa-chain`"></i>
        <div>{{ title }}</div>
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
