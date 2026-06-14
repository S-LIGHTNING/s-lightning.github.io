<script setup lang="ts">

import { CONTENT } from "@/data/content"
import { useBoundingClientTop } from "@/utils/use-bounding-client-top"
import { ref, watchEffect } from "vue"
import ContentArea from "./ContentArea.vue"

const props = defineProps<{
    maskTop?: number
    data: typeof CONTENT
}>()

const element = ref<HTMLElement>()
const boundingClientTop = useBoundingClientTop(element)

function setMask(): void {
    if (element.value == undefined) {
        return
    }
    const maskTop = (props.maskTop ?? 0) - boundingClientTop.value
    element.value.style.maskImage = `linear-gradient(transparent ${maskTop - 32}px, white ${maskTop + 16}px)`
}
watchEffect(setMask)

</script>

<template>
    <div ref="element" class="content">
        <ContentArea v-for="area in data" :data="area"/>
    </div>
</template>

<style scoped>
.content {
    display: inline-table;
    text-align: center;
    padding-bottom: 1rem;
}
@media only screen and (min-width: 512px) {
    .content {
        width: calc(100% - 6rem);
    }
}
</style>
