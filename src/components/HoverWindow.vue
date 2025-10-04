<script setup lang="ts">

import { ref } from "vue"

defineProps<{
    title?: string
}>()

const showRef = defineModel<() => void>("show")

const isShow = ref(false)

function show() {
    isShow.value = true
}

showRef.value = show

function close() {
    isShow.value = false
}

</script>

<template>
    <div class="hover" :class="isShow ? null : `hover--hide`">
        <div class="hover-window" :class="isShow ? null : `hide`">
            <div class="head">
                <span class="title">{{ title }}</span>
                <i class="close fa fa-close" @click="close"></i>
            </div>
            <div class="content">
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped>
.hover {
    z-index: 32;
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #80808080;
}
.hover--hide {
    opacity: 0;
    pointer-events: none;
}
.hover-window {
    background-color: var(--background-color);
    backdrop-filter: blur(4px);
    transition: transform 0.2s;
}
.hide {
    transform: scale(0.5);
}
.head {
    color: var(--theme-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 16px;
}
.close {
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    cursor: pointer;
}
.close:hover {
    background-color: red;
    color: white;
}
.content {
    display: block;
    margin: 16px;
    margin-top: 0px;
    transition: none;
}
</style>
