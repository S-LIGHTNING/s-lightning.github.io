export function getHeightToTop(element: Element | null | undefined): number {
    const root: HTMLElement = document.body
    let height: number = 0
    while (element instanceof HTMLElement && element != root) {
        height += element.offsetTop
        element = element.offsetParent
    }
    return height
}
