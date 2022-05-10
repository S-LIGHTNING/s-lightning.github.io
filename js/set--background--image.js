function setBackgroundImage() {
    document.getElementsByTagName("body")[0].style.backgroundImage = "url(" +
    [
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fquotefancy.com%2Fmedia%2Fwallpaper%2F3840x2160%2F1700728-Linus-Torvalds-Quote-Talk-is-cheap-Show-me-the-code.jpg&refer=http%3A%2F%2Fquotefancy.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654756759&t=980cca4b349ff1bf5e9637a5fa1d96ef",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg3.ii77.com%2Fmmbiz_jpg%2FPn4Sm0RsAuiamaJSNwc81TKTrsTPfpf1bFfcoGqsmwqa0bicWTmLRlvWIN5ldJEGX83pbWZYMbV8Oo3XagH0J9cg%2F640%3Fwx_fmt%3Djpeg&refer=http%3A%2F%2Fimg3.ii77.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654758188&t=8ec0a8d1ab01a9420f8df376dd6a57e2"
    ][Math.floor(Math.random() * 2)] + ")"
    setTimeout(setBackgroundImage, 1000);
}
