<script setup lang="ts">

import { type IPageInfo } from "@/page/page-info"

defineProps<{
    baseURL: string
    page: IPageInfo
}>()

</script>

<template>
    <li>
        <RouterLink :to="`${baseURL}${page.slagName}/`">{{ page.name }}</RouterLink>
        <ul v-for="subPage in page.subPages">
            <PageInfo :baseURL="`${baseURL}${page.slagName}/`" :page=subPage />
        </ul>
    </li>
</template>
