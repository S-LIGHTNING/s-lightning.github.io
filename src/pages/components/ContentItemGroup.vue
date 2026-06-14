<script setup lang="ts">

import { ContentImageItemRecord, ContentLinkItemRecord, type ContentItemGroupRecord } from "@/data/content"
import ContentLinkItem from "./ContentLinkItem.vue"
import ContentImageItem from "./ContentImageItem.vue"

defineProps<{ data: ContentItemGroupRecord }>()

</script>

<template>
    <div v-for="content in data.contents" class="content-item">
        <ContentLinkItem v-if="content instanceof ContentLinkItemRecord" :data="content" />
        <ContentImageItem v-if="content instanceof ContentImageItemRecord" :data="content" />
    </div>
</template>

<style scoped>
.content-item {
    width: 8rem;
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
</style>
