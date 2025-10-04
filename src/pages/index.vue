<script setup lang="ts">

import { ref, watchEffect, type ComponentInstance } from "vue"

import Info from "./components/Info.vue"
import NavBar from "./components/NavBar.vue"
import Content from "./components/Content.vue"
import ContentGroup from "./components/ContentGroup.vue"
import ContentItem from "./components/ContentItem.vue"
import AppreciationCode from "@/components/AppreciationCode.vue"
import HoverWindow from "@/components/HoverWindow.vue"
import { useInnerSize } from "@/utils/use-inner-size"
import { useClientSize } from "@/utils/use-client-size"

const infoInstance = ref<ComponentInstance<typeof Info>>()
const navBarInstance = ref<ComponentInstance<typeof NavBar>>()
const contentInstance = ref<ComponentInstance<typeof Content>>()

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

const showMiroMsgContact = ref<() => void>()
const showQQContact = ref<() => void>()

</script>

<template>
    <Info ref="infoInstance" />
    <NavBar
        ref="navBarInstance"
        :content="contentInstance"
        :marginTop
    />
    <Content ref="contentInstance" :maskTop="marginTop">
        <ContentGroup title="链接" icon="fa-chain">
            <ContentItem
                title="博客"
                icon="fa-bold"
                href="https://s-lightning.github.io/SLIGHTNING-Blog/"
            />
            <ContentItem
                title="项目"
                icon="fa-cube"
                href="/projects/"
            />
        </ContentGroup>
        <ContentGroup title="账号" icon="fa-user">
            <ContentItem
                title="GitHub"
                icon="fa-github"
                href="https://github.com/S-LIGHTNING"
            />
            <ContentItem
                title="Gitee"
                icon="https://gitee.com/favicon.ico"
                href="https://gitee.com/slightning"
            />
            <ContentItem
                title="编程猫"
                icon="https://static.codemao.cn/whitef/favicon.ico"
                href="https://shequ.codemao.cn/user/6519713"
            />
            <ContentItem
                title="洛谷"
                icon="https://www.luogu.com.cn/favicon.ico"
                href="https://www.luogu.com.cn/user/1126821"
            />
            <ContentItem
                title="共创世界"
                icon="https://m.ccw.site/community/images/logo-ccw.png"
                href="https://www.ccw.site/student/651d05d9215a4214b915fbc8"
            />
            <ContentItem
                title="40code"
                icon="https://www.40code.com/favicon.ico"
                href="https://www.40code.com/#page=user&id=2482"
            />
        </ContentGroup>
        <ContentGroup title="联系" icon="fa-comments">
            <ContentItem
                title="微信"
                icon="fa-wechat"
                @click="showMiroMsgContact"
            />
            <ContentItem
                title="QQ"
                icon="fa-qq"
                @click="showQQContact"
            />
            <ContentItem
                title="留言"
                icon="fa-paper-plane"
                href="https://s-lightning.github.io/SLIGHTNING-Blog/messageboard/"
            />
            <ContentItem
                title="邮箱"
                icon="fa-envelope"
                href="mailto: slightning@qq.com"
            />
        </ContentGroup>
        <ContentGroup title="友链" icon="fa-external-link">
            <ContentItem
                title="冰川工作室"
                icon="https://glacier-studio.github.io/res/icon/icon.svg"
                href="https://glacier-studio.github.io/"
            />
            <ContentItem
                title="StarDreamNet"
                icon="https://www.cloudroo.top/favicon.ico"
                href="https://www.cloudroo.top/"
            />
            <ContentItem
                title="Vistamin"
                icon="https://avatars.githubusercontent.com/u/164725925?v=4"
                href="https://github.com/vistaminc/"
            />
            <ContentItem
                title="颜学谦"
                icon="https://static.codemao.cn/pickduck/HJTNP4yn6.jpg"
                href="https://dayanshifu.github.io/"
            />
            <ContentItem
                title="满月叶"
                icon="https://creation.bcmcdn.com//490/YW5kXzEwMDFfMTE3NzA3NjhfMF8xNzI4ODM3MjUyMDI1X0VTRzRZV1NH.jpg"
                href="https://github.com/MoonLeeeaf"
            />
        </ContentGroup>
        <ContentGroup title="赞赏" icon="fa-thumbs-up">
            <p>开发不易，给点赞赏鼓励下吧！</p>
            <AppreciationCode />
        </ContentGroup>
        <ContentGroup title="广告" icon="fa-adn">
            <p>广告位招租，详情请联系我。</p>
        </ContentGroup>
    </Content>
    <HoverWindow title="扫二维码，加我微信" v-model:show="showMiroMsgContact">
        <img class="contact" src="/res/SLIGHTNING/contact/mm.png">
    </HoverWindow>
    <HoverWindow title="扫二维码，加我 QQ" v-model:show="showQQContact">
        <img class="contact" src="/res/SLIGHTNING/contact/qq.png">
    </HoverWindow>
</template>

<style scoped>
img.contact {
    width: 256px;
}
</style>
