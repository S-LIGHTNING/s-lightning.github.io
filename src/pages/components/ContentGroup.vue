<script setup lang="ts">

defineProps<ContentGroupData>()

export interface ContentGroupData {
    title: string
    icon?: string
}

</script>

<template>
    <div class="content-group" :data-title=title :data-icon=icon>
        <h2>{{ title }}</h2>
        <slot />
    </div>
</template>
