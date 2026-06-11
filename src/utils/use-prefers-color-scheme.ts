import { onMounted, onUnmounted, ref } from "vue"

export function usePrefersColorScheme() {
    const themeMedia = window.matchMedia("(prefers-color-scheme: dark)")
    const prefersColorScheme = ref<"dark" | "light">(themeMedia.matches ? "dark" : "light")
    function handleThemeMediaChange(event: MediaQueryListEvent) {
        prefersColorScheme.value = event.matches ? "dark" : "light"
    }
    onMounted(() => { themeMedia.addEventListener("change", handleThemeMediaChange) })
    onUnmounted(() => { themeMedia.removeEventListener("change", handleThemeMediaChange) })
    return prefersColorScheme
}
