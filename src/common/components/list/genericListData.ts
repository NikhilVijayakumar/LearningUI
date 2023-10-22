//src/common/components/list/genericListData.ts

export interface ListDataItem {
  name: string
}

export interface GenericListProps<T extends ListDataItem> {
  subheaderText: string
  data: T[]
  onItemClick: (item: T) => void
}
