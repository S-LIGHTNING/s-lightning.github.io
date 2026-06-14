<script setup lang="ts">

import { RouterLink } from "vue-router"

import type { ContentLinkItemRecord } from "@/data/content"
import ContentItemShared from "./ContentItemShared.vue"

defineProps<{ data: ContentLinkItemRecord }>()

</script>

<template>
    <RouterLink v-if="data.link.startsWith(`/`)" :to="data.link">
        <ContentItemShared :data="data" />
    </RouterLink>
    <a v-else :href="data.link" target="_blank">
        <ContentItemShared :data="data" />
    </a>
</template>
