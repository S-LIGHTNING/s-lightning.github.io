<script setup lang="ts">

import { ref, watchEffect, type ComponentInstance } from "vue"

import Info from "./components/Info.vue"
import NavBar from "./components/NavBar.vue"
import Content from "./components/Content.vue"
import { useInnerSize } from "@/utils/use-inner-size"
import { useClientSize } from "@/utils/use-client-size"
import { CONTENT } from "@/data/content.ts"

const infoInstance = ref<ComponentInstance<typeof Info>>()
const navBarInstance = ref<ComponentInstance<typeof NavBar>>()

const marginTop = ref(0)
const innerSize = useInnerSize()
const marginTopElement = ref<HTMLElement | undefined>()
watchEffect(() => {
    marginTopElement.value = (innerSize.width.value < 512 ? navBarInstance : infoInstance).value?.$el
})
const marginTopElementSize = useClientSize(marginTopElement)
watchEffect(() => {
    if (marginTopElement == undefined) {
        return
    }
    marginTop.value = marginTopElementSize.height.value
})

</script>

<template>
    <Info ref="infoInstance" />
    <div>
        <NavBar ref="navBarInstance" :marginTop :data="CONTENT" />
        <Content ref="contentInstance" :maskTop="marginTop" :data="CONTENT" />
    </div>
</template>
