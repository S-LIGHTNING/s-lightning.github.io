export class ContentArea {
    public constructor(
        public readonly key: string,
        public readonly title: string,
        public readonly icon: string,
        public readonly group: ContentGroup
    ) {}
}

export type ContentGroup = ContentItemGroup | ContentLineGroup

export class ContentItemGroup {
    public constructor(
        public readonly contents: ContentItem[]
    ) {}
}

export type ContentItem = ContentLinkItem | ContentImageItem

export class ContentLinkItem {
    public constructor(
        public readonly key: string,
        public readonly title: string,
        public readonly icon: string,
        public readonly link: string
    ) {}
}

export class ContentImageItem {
    public constructor(
        public readonly key: string,
        public readonly title: string,
        public readonly icon: string,
        public readonly src: string,
        public readonly alt?: string
    ) {}
}

export class ContentLineGroup {
    public constructor(
        public readonly lines: ContentLine[]
    ) {}
}

export type ContentLine = ContentTextLine | ContentImageLine

export class ContentTextLine {
    public constructor(
        public readonly text: string
    ) {}
}

export class ContentImageLine {
    public constructor(
        public readonly src: string,
        public readonly alt?: string
    ) {}
}

export const CONTENT: ContentArea[] = [
    new ContentArea("links", "链接", "fa-chain", new ContentItemGroup([
        new ContentLinkItem("blog", "博客", "fa-bold", "https://s-lightning.github.io/SLIGHTNING-Blog/"),
        new ContentLinkItem("projects", "项目", "fa-cube", "/projects/"),
        new ContentLinkItem("cli", "命令行版", "fa-terminal", "/cli/")
    ])),
    new ContentArea("accounts", "账号", "fa-user", new ContentItemGroup([
        new ContentLinkItem("github", "GitHub", "fa-github", "https://github.com/S-LIGHTNING"),
        new ContentLinkItem("gitee", "Gitee", "https://gitee.com/favicon.ico", "https://gitee.com/slightning"),
        new ContentLinkItem("codemao", "编程猫", "https://static.codemao.cn/whitef/favicon.ico", "https://shequ.codemao.cn/user/6519713"),
        new ContentLinkItem("luogu", "洛谷", "https://www.luogu.com.cn/favicon.ico", "https://www.luogu.com.cn/user/1126821"),
        new ContentLinkItem("ccw", "共创世界", "https://m.ccw.site/community/images/logo-ccw.png", "https://www.ccw.site/student/651d05d9215a4214b915fbc8"),
        new ContentLinkItem("40code", "40code", "https://www.40code.com/favicon.ico", "https://www.40code.com/#page=user&id=2482")
    ])),
    new ContentArea("contact", "联系", "fa-comments", new ContentItemGroup([
        new ContentImageItem("mm", "微信", "fa-wechat", "/res/SLIGHTNING/contact/mm.png"),
        new ContentImageItem("qq", "QQ", "fa-qq", "/res/SLIGHTNING/contact/qq.png"),
        new ContentLinkItem("leave-a-message", "留言", "fa-paper-plane", "https://s-lightning.github.io/SLIGHTNING-Blog/messageboard/"),
        new ContentLinkItem("mail", "邮箱", "fa-envelope", "mailto: slightning@qq.com")
    ])),
    new ContentArea("friends", "友链", "fa-external-link", new ContentItemGroup([
        new ContentLinkItem("glacier-studio", "冰川工作室", "https://glacier-studio.github.io/res/icon/icon.svg", "https://glacier-studio.github.io/"),
        new ContentLinkItem("star-dream-net", "StarDreamNet", "https://www.cloudroo.top/favicon.ico", "https://www.cloudroo.top/"),
        new ContentLinkItem("vistamin", "Vistamin", "https://static.codemao.cn/whitef/favicon.ico", "https://github.com/vistaminc/"),
        new ContentLinkItem("little-yan", "颜学谦", "https://avatars.githubusercontent.com/u/164725925?v=4", "https://dayanshifu.github.io/"),
        new ContentLinkItem("moon-leeeaf", "满月叶", "https://creation.bcmcdn.com//490/YW5kXzEwMDFfMTE3NzA3NjhfMF8xNzI4ODM3MjUyMDI1X0VTRzRZV1NH.jpg", "https://github.com/MoonLeeeaf")
    ])),
    new ContentArea("appreciate", "赞赏", "fa-thumbs-up", new ContentLineGroup([
        new ContentTextLine("开发不易，给点赞赏鼓励下吧！"),
        new ContentImageLine("/res/SLIGHTNING/appreciation-code.png", "赞赏码")
    ])),
    new ContentArea("ad", "广告", "fa-adn", new ContentLineGroup([
        new ContentTextLine("广告位招租，详情请联系我。")
    ]))
]
