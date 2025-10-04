<script setup lang="ts">

import { onMounted } from "vue"

import ProjectInfo from "@/pages/projects/components/ProjectInfo.vue"

onMounted(() => {
    const id = location.hash.slice(1)
    const element = document.getElementById(id)
    if (element != null) {
        element.scrollIntoView()
    } else {
        document.documentElement.scrollTop = 0
    }
})

</script>

<template>
    <h1>我的项目</h1>
    <p>我管理或参与的项目。</p>
    <span>标记说明：</span>
    <ul>
        <li>【测试】：处于初期测试阶段，可能有较多的缺陷。</li>
        <li>【开发中】：正在开发中，功能尚不完善。</li>
        <li>【非正式】：没有按照标准方式开发，可能存在测试不充分、大量破坏性更新等问题，不建议使用。</li>
    </ul>
    <h2>一、编程猫相关</h2>
    <h3>1. 编程猫 CoCo 相关</h3>
    <h4>(1) 编程猫 CoCo 自定义控件相关</h4>
    <h5 id="project--codemao--coco--widget--widgets">① 编程猫 CoCo 自定义控件</h5>
    <div class="project-group">
        <ProjectInfo
            name="数据工具"
            description="提供大量基础、实用的数据操作方法（如位运算、字符串截取、列表查找/过滤/排序）。"
            gitee="slightning/coco-data-utils-widget"
            github="S-LIGHTNING/coco-data-utils-widget"
            ye="474624b8d047864240f66553363ca4dd"
        />
        <ProjectInfo
            name="源码云功能"
            description="适用于 Nemo、Kitten 和 Kitten N 云数据查看和修改工具。"
            docs="https://s-lightning.github.io/Kitten-Cloud-Function/"
            gitee="slightning/Kitten-Cloud-Function"
            github="S-LIGHTNING/Kitten-Cloud-Function"
        />
        <ProjectInfo
            name="分割数据"
            description="【开发中】用于解析和生成用指定符号分割的数据（支持嵌套），这类数据常见于编程猫作品云变量中。"
            ye="508a9bc1dcaf1583058f45e97380bdde"
        />
        <ProjectInfo
            name="冰川列表框"
            description="【测试】按需动态加载消息的列表框，同时利用虚拟滚动条技术提升性能，海量消息也能流畅显示。"
            ye="209088c90317f8f59c978bec802df713"
        />
        <ProjectInfo
            name="椰子云空间"
            description="查看和修改 CoCo 已发布作品所关联的源码云空间数据。"
            gitee="slightning/CoCo-Widget-CoCo-Cloud-Space"
            github="S-LIGHTNING/CoCo-Widget-CoCo-Cloud-Space"
            ye="1f9628c6fe541e7caf567336ab8ef994"
        />
        <ProjectInfo
            name="五子棋界面"
            description="五子棋界面，不包含分析功能。"
            ye="deb5375ce43799ab2b0c31bf201f9679"
        />
        <ProjectInfo
            name="五子棋分析"
            description="基础五子棋功能，结合五子棋界面控件使用。"
            ye="6fa57f56335972e05637ef22c9b10c6d"
        />
        <ProjectInfo
            name="顶部弹出提示"
            description="在界面顶端弹出一条提示，支持同时显示多个提示。"
            ye="1bbb2a3ff366763d0c2055cdcfb5cc47"
        />
        <ProjectInfo
            name="浏览器功能"
            description="【非正式】浏览器功能。"
            ye="f1692636b6ee5849f16995d20df32dfb"
        />
        <ProjectInfo
            name="快速循环"
            description="【非正式】快速循环。"
            ye="1d6f460d21c6c5a28605cce47dfcba92"
        />
        <ProjectInfo
            name="异步控制"
            description="【非正式】异步控制。"
            ye="f5d1949344a88bc13e16d0c9e90f0598"
        />
        <ProjectInfo
            name="跨屏函数"
            description="【非正式】跨屏函数。"
            ye="3d2871205a89b257d4cacd5e10d44995"
        />
    </div>
    <h5>② 编程猫 CoCo 自定义控件开发工具</h5>
    <div class="project-group">
        <ProjectInfo
            name="SCW 框架"
            description="工程化 CoCo 自定义控件开发的一些尝试。"
            docs="https://s-lightning.github.io/slightning-coco-widget/"
            gitee="slightning/slightning-coco-widget"
            github="S-LIGHTNING/slightning-coco-widget"
        />
    </div>
    <h4>(2) 编程猫 CoCo 编辑器相关</h4>
    <div class="project-group">
        <ProjectInfo
            name="CoCo 源代码计划"
            description="还原编程猫 CoCo 编辑器、CoCo Player 等的代码。"
            gitee="glacier-studio/CoCo-Source-Code-Plan"
            github="glacier-studio/CoCo-Source-Code-Plan"
        />
    </div>
    <h5>(3) 编程猫 CoCo 编辑器作品</h5>
    <div class="project-group">
        <ProjectInfo
            name="冰川五子棋"
            description="【开发中】一个简单的五子棋程序，计划支持连接编程猫所有五子棋作品。"
            codemao="215662216"
        />
    </div>
    <h3>2. 其他</h3>
    <div class="project-group">
        <ProjectInfo
            name="源码反编译器4"
            description="针对使用源码编辑器4创作的已发布的作品的反编译工具。"
            gitee="slightning/Kitten-4-Decompiler"
            github="S-LIGHTNING/Kitten-4-Decompiler"
        />
    </div>
</template>

<style scoped>
h1, p {
    text-align: center;
}
* {
    tab-size: 16px;
}
.project-group {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: auto;
}
</style>
