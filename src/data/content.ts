export class ContentAreaRecord {
    public constructor(
        public readonly key: string,
        public readonly title: string,
        public readonly icon: string,
        public readonly group: ContentGroupRecord
    ) {}
}

export type ContentGroupRecord = ContentItemGroupRecord | ContentLineGroupRecord

export class ContentItemGroupRecord {
    public constructor(
        public readonly contents: ContentItemRecord[]
    ) {}
}

export type ContentItemRecord = ContentLinkItemRecord | ContentImageItemRecord

export class ContentLinkItemRecord {
    public constructor(
        public readonly key: string,
        public readonly name: string,
        public readonly icon: string,
        public readonly link: string
    ) {}
}

export class ContentImageItemRecord {
    public constructor(
        public readonly key: string,
        public readonly name: string,
        public readonly icon: string,
        public readonly title: string,
        public readonly src: string,
        public readonly alt?: string
    ) {}
}

export class ContentLineGroupRecord {
    public constructor(
        public readonly lines: ContentLineRecord[]
    ) {}
}

export type ContentLineRecord = ContentTextLineRecord | ContentImageLineRecord

export class ContentTextLineRecord {
    public constructor(
        public readonly text: string
    ) {}
}

export class ContentImageLineRecord {
    public constructor(
        public readonly src: string,
        public readonly alt?: string
    ) {}
}

export const CONTENT: ContentAreaRecord[] = [
    new ContentAreaRecord("about", "关于", "fa-user", new ContentLineGroupRecord([
        new ContentTextLineRecord("你好"),
        // new ContentImageLineRecord("https://github-readme-stats.vercel.app/api?username=s-lightning&amp&hide=contribs,prs;show_icons=true", "SLIGHTNING's GitHub stats"),
        // new ContentImageLineRecord("https://github-readme-stats.vercel.app/api/top-langs/?username=s-lightning&amp;layout=compact", "Top Langs")
    ])),
    new ContentAreaRecord("links", "链接", "fa-chain", new ContentItemGroupRecord([
        new ContentLinkItemRecord("blog", "博客", "fa-bold", "https://s-lightning.github.io/SLIGHTNING-Blog/"),
        new ContentLinkItemRecord("projects", "项目", "fa-cube", "/projects/"),
        new ContentLinkItemRecord("cli", "命令行版", "fa-terminal", "/cli/")
    ])),
    new ContentAreaRecord("accounts", "账号", "fa-address-book", new ContentItemGroupRecord([
        new ContentLinkItemRecord("github", "GitHub", "fa-github", "https://github.com/S-LIGHTNING"),
        new ContentLinkItemRecord("gitee", "Gitee", "https://gitee.com/favicon.ico", "https://gitee.com/slightning"),
        new ContentLinkItemRecord("codemao", "编程猫", "https://static.codemao.cn/whitef/favicon.ico", "https://shequ.codemao.cn/user/6519713"),
        new ContentLinkItemRecord("luogu", "洛谷", "https://www.luogu.com.cn/favicon.ico", "https://www.luogu.com.cn/user/1126821"),
        new ContentLinkItemRecord("ccw", "共创世界", "https://m.ccw.site/community/images/logo-ccw.png", "https://www.ccw.site/student/651d05d9215a4214b915fbc8"),
        new ContentLinkItemRecord("40code", "40code", "https://www.40code.com/favicon.ico", "https://www.40code.com/#page=user&id=2482")
    ])),
    new ContentAreaRecord("contact", "联系", "fa-comments", new ContentItemGroupRecord([
        new ContentImageItemRecord("mm", "微信", "fa-wechat", "扫二维码，加我微信", "/res/SLIGHTNING/contact/mm.png"),
        new ContentImageItemRecord("qq", "QQ", "fa-qq", "扫二维码，加我 QQ", "/res/SLIGHTNINGs/contact/qq.png"),
        new ContentLinkItemRecord("leave-a-message", "留言", "fa-paper-plane", "https://s-lightning.github.io/SLIGHTNING-Blog/messageboard/"),
        new ContentLinkItemRecord("mail", "邮箱", "fa-envelope", "mailto: slightning@qq.com")
    ])),
    new ContentAreaRecord("friends", "友链", "fa-external-link", new ContentItemGroupRecord([
        new ContentLinkItemRecord("glacier-studio", "冰川工作室", "https://glacier-studio.github.io/res/icon/icon.svg", "https://glacier-studio.github.io/"),
        new ContentLinkItemRecord("star-dream-net", "StarDreamNet", "https://www.cloudroo.top/favicon.ico", "https://www.cloudroo.top/"),
        new ContentLinkItemRecord("vistamin", "Vistamin", "https://avatars.githubusercontent.com/u/164725925?v=4", "https://github.com/vistaminc/"),
        new ContentLinkItemRecord("little-yan", "颜学谦", "https://static.codemao.cn/pickduck/HJTNP4yn6.jpg", "https://dayanshifu.github.io/"),
        new ContentLinkItemRecord("moon-leeeaf", "满月叶", "https://creation.bcmcdn.com//490/YW5kXzEwMDFfMTE3NzA3NjhfMF8xNzI4ODM3MjUyMDI1X0VTRzRZV1NH.jpg", "https://github.com/MoonLeeeaf")
    ])),
    new ContentAreaRecord("appreciate", "赞赏", "fa-thumbs-up", new ContentLineGroupRecord([
        new ContentTextLineRecord("开发不易，给点赞赏鼓励下吧！"),
        new ContentImageLineRecord("/res/SLIGHTNING/appreciation-code.png", "赞赏码")
    ])),
    new ContentAreaRecord("ad", "广告", "fa-adn", new ContentLineGroupRecord([
        new ContentTextLineRecord("广告位招租，详情请联系我。")
    ]))
]
