<script setup lang="ts">

import { RouterLink } from "vue-router"

defineProps<ContentItemData>()

export interface ContentItemData {
    title: string
    icon: string
    href?: string | null | undefined
}

</script>

<template>
    <component
        :is="href?.startsWith(`/`) ? RouterLink : `a`"
        class="content-item"
        :to=href
        :href="href ?? `javascript: void 0`"
        :target="href?.startsWith(`http`) ? `_blank` : undefined"
    >
        <i class="icon fa" v-if="icon.startsWith(`fa-`)" :class=icon></i>
        <img class="icon" v-if="/^https?:\/\//.test(icon)" :src=icon></img>
        <div>{{ title }}</div>
    </component>
</template>

<style scoped>
.content-item {
    width: 8rem;
    text-align: center;
    padding-block: 0.5rem;
    display: inline-block;
    position: relative;
    bottom: 0rem;
    cursor: pointer;
}
.content-item:hover {
    box-shadow: 0rem 0rem 1rem #BABABA;
    bottom: 4px;
}
.icon {
    width: 3rem;
    font-size: 3rem;
}
</style>
