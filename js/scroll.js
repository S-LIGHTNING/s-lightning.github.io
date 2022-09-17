function getHeightToTop(ele){
    let root = document.body;
    let height = 0;
    do {
        height += ele.offsetTop;
        ele = ele.offsetParent;
    } while( ele != root )
    return height;
}

function scrollToEle(id) {
    var top = getHeightToTop(document.getElementById(id))
    var topEle;
    if (innerWidth < 512) topEle = "nav-bar"
    else topEle = "info"
    document.documentElement.scrollTop =document.body.scrollTop =  top - document.getElementById(topEle).offsetHeight
}
