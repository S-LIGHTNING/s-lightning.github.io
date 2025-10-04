export interface IPageInfo {
    name: string
    slagName: string
    subPages?: IPageInfo[] | null | undefined
}
