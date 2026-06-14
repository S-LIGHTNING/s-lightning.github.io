<script setup lang="ts">

import Icon from "@/components/Icon.vue"
import type { ContentItemRecord } from "@/data/content"

defineProps<{ data: ContentItemRecord }>()

</script>

<template>
    <div class="icon"><Icon :src="data.icon"/></div>
    <div>{{ data.name }}</div>
</template>

<style scoped>
.icon {
    margin: auto;
    width: 3rem;
    font-size: 3rem;
}
</style>
