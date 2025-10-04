import { ref, toValue, watchEffect, type MaybeRefOrGetter } from "vue"

export function useBoundingClientTop(element: MaybeRefOrGetter<HTMLElement | null | undefined>) {
    const top = ref(0)
    function update() {
        top.value = toValue(element)?.getBoundingClientRect().top ?? 0
    }
    const resizeObserver = new ResizeObserver(update)
    watchEffect(() => {
        update()
        const elementValue = toValue(element)
        resizeObserver.disconnect()
        removeEventListener("scroll", update)
        if (elementValue != null) {
            resizeObserver.observe(elementValue)
            addEventListener("scroll", update)
        }
    })
    return top
}
