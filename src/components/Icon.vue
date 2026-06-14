<script setup lang="ts">

defineProps<{ src: string }>()

</script>

<template>
    <i v-if="src.startsWith(`fa-`)" class="icon fa" :class="src"></i>
    <img v-if="/^https?:\/\//.test(src)" class="icon" :src="src"></img>
</template>

<style scoped>
.icon {
    width: 100%;
    height: 100%;
}
</style>
