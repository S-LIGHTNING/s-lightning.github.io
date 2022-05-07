function showHoverWindow(title, src) {
    document.getElementById("hover-window--title").innerText = title
    document.getElementById("hover-window--img").style.backgroundImage = "url(" + src + ")"
    document.getElementById("hover-window--hover").style.display = "block"
}
function closeHoverWindow() {
    document.getElementById("hover-window--hover").style.display = "none"
}