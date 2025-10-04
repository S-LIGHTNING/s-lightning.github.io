import { onMounted, onUnmounted, ref } from "vue"

export function useDocumentScrollRate() {
    const value = ref(0)
    const { documentElement } = document
    function update() {
        value.value = documentElement.scrollTop / (documentElement.scrollHeight - documentElement.clientHeight)
    }
    onMounted(() => {
        update()
        addEventListener("scroll", update)
        addEventListener("resize", update)
    })
    onUnmounted(() => {
        removeEventListener("scroll", update)
        removeEventListener("resize", update)
    })
    return value
}
