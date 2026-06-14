<script setup lang="ts">

import type { ContentTextLineRecord } from "@/data/content"

defineProps<{ data: ContentTextLineRecord }>()

</script>

<template>
    <p>{{ data.text }}</p>
</template>
