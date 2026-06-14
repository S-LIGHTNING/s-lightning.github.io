<script setup lang="ts">

import { ref } from "vue"

import HoverWindow from "@/components/HoverWindow.vue"
import type { ContentImageItemRecord } from "@/data/content"
import ContentItemShared from "./ContentItemShared.vue"

defineProps<{ data: ContentImageItemRecord }>()

const showHoverWindow = ref<boolean>()

</script>

<template>
    <div @click="showHoverWindow = true">
        <ContentItemShared :data="data" />
    </div>
    <teleport to="body">
        <HoverWindow :title="data.title" v-model:show="showHoverWindow">
            <img class="image" :src="data.src" :alt="data.alt">
        </HoverWindow>
    </teleport>
</template>

<style scoped>
.image {
    width: 256px;
}
</style>
