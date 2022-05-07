function showHoverWindow(title, src) {
    document.getElementById("hover-window--title").innerText = title
    document.getElementById("hover-window--img").style.backgroundImage = "url(" + src + ")"
    var hoverWindowHover = document.getElementById("hover-window--hover").style
    hoverWindowHover.pointerEvents = "auto"
    hoverWindowHover.opacity = 1
    document.getElementById("hover-window").style.transform = "scale(1)"
}
function closeHoverWindow() {
    var hoverWindowHover = document.getElementById("hover-window--hover").style
    hoverWindowHover.pointerEvents = "none"
    hoverWindowHover.opacity = 0
    document.getElementById("hover-window").style.transform = "scale(0.5)"
}