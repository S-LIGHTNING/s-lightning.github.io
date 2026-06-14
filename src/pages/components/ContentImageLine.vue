<script setup lang="ts">

import type { ContentImageLineRecord } from "@/data/content"

defineProps<{ data: ContentImageLineRecord }>()

</script>

<template>
    <img class="image" :src="data.src">
</template>

<style scoped>
.image {
    width: 90%;
    max-width: 384px;
    background-color: var(--background-color);
}
</style>
