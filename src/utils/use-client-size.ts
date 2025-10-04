import { ref, toValue, watchEffect, type MaybeRefOrGetter } from "vue"

export function useClientSize(element: MaybeRefOrGetter<HTMLElement | null | undefined>) {
    const width = ref(0), height = ref(0)
    function update() {
        const elementValue = toValue(element)
        width.value = elementValue?.clientWidth ?? 0
        height.value = elementValue?.clientHeight ?? 0
    }
    const resizeObserver = new ResizeObserver(update)
    watchEffect(() => {
        update()
        const elementValue = toValue(element)
        resizeObserver.disconnect()
        if (elementValue != null) {
            resizeObserver.observe(elementValue)
        }
    })
    return { width, height }
}
