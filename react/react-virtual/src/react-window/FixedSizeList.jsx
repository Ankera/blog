import createListComponent from './createListComponent'

const FixedSizeList = createListComponent({
  // 预计内容的高度
  getEstimatedTotalSize: ({ itemSize, itemCount }) => itemCount * itemSize,
  getItemSize: ({ itemSize }, index) => itemSize,
  getItemOffset: ({ itemSize }, index) => itemSize * index,
  getStartIndexForOffset: ({ itemSize }, offset) =>
    Math.floor(offset / itemSize),
  getStopIndexForOffset: ({ itemSize, height }, startIndex) => {
    const numVisibleItems = Math.ceil(height / itemSize)

    // 结束位置是闭区间， -1
    return numVisibleItems + startIndex - 1
  },
})

export default FixedSizeList
