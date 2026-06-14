<script setup lang="ts">

import { ContentItemGroupRecord, ContentLineGroupRecord, type ContentAreaRecord } from "@/data/content"
import ContentItemGroup from "./ContentItemGroup.vue"
import ContentILineGroup from "./ContentILineGroup.vue"

defineProps<{ data: ContentAreaRecord }>()

</script>

<template>
    <h2 :id="`content-${data.key}`">{{ data.title }}</h2>
    <ContentItemGroup v-if="data.group instanceof ContentItemGroupRecord" :data="data.group" />
    <ContentILineGroup v-if="data.group instanceof ContentLineGroupRecord" :data="data.group" />
</template>
