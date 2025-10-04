import { onMounted, onUnmounted, ref } from "vue"

export function useInnerSize() {
    const width = ref(0), height = ref(0)
    function update() {
        width.value = innerWidth
        height.value = innerHeight
    }
    onMounted(() => {
        update()
        addEventListener("resize", update)
    })
    onUnmounted(() => { removeEventListener("resize", update) })
    return { width, height }
}
