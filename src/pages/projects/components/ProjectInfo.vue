<script setup lang="ts">

defineProps<{
    name: string
    description: string
    docs?: string
    gitee?: string
    github?: string
    ye?: string
    codemao?: string
}>()

</script>

<template>
    <div class="project">
        <div class="name">{{ name }}</div>
        <ul>
            <li v-if="docs != null"><a :href="docs"><i class="icon fa fa-file-text-o" />文档</a></li>
            <li v-if="gitee != null"><a :href="`https://gitee.com/` + gitee" target="_blank"><img class="icon" src="https://gitee.com/favicon.ico" />Gitee</a></li>
            <li v-if="github != null"><a :href="`https://github.com/` + github" target="_blank"><i class="icon fa fa-github" />GitHub</a></li>
            <li v-if="ye != null"><a :href="`https://open.lihouse.xyz/ye#/widget/` + ye" target="_blank"><img class="icon" src="/res/ye-icon.png" />耶椰椰</a></li>
            <li v-if="codemao != null"><a :href="`https://shequ.codemao.cn/work/` + codemao" target="_blank"><img class="icon" src="https://static.codemao.cn/coco/player/unstable/B1F3qc2Hj.image/svg+xml?hash=FlHXde3J3HLj1PtOWGgeN9fhcba3" />编程猫</a></li>
        </ul>
        <p>{{ description }}</p>
    </div>
</template>

<style scoped>
.project {
    width: 256px;
    min-height: 192px;
    margin: 16px;
    padding-inline: 16px;
    box-shadow: 0px 0px 16px #BABABA;
}
.name {
    -webkit-text-stroke-width: 1px;
    font-size: 1.5em;
    margin-block: 24px;
    text-align: center;
}
ul {
    display: flex;
    justify-content: space-evenly;
    padding-inline-start: 0px;
}
li {
    display: inline;
}
a {
    display: flex;
    align-items: center;
}
.icon {
    width: 1em;
    margin-right: 0.2em;
}
</style>
