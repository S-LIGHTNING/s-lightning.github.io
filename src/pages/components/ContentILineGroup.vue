<script setup lang="ts">

import { ContentImageLineRecord, ContentTextLineRecord, type ContentLineGroupRecord } from "@/data/content"
import ContentTextLine from "./ContentTextLine.vue"
import ContentImageLine from "./ContentImageLine.vue"

defineProps<{ data: ContentLineGroupRecord }>()

</script>

<template>
    <div v-for="line in data.lines" class="content-line">
        <ContentTextLine v-if="line instanceof ContentTextLineRecord" :data="line" />
        <ContentImageLine v-if="line instanceof ContentImageLineRecord" :data="line" />
    </div>
</template>
