import createListComponent from './createListComponent'

//  默认预估高度
const DEFAULT_ESTIMATED_ITEM_SIZE = 50

const VariableSizeList = createListComponent({
  // 预计内容的高度
  getEstimatedTotalSize,
  getItemSize: (props, index, instanceProps) =>
    getItemMetadata(props, index, instanceProps).size,
  getItemOffset: (props, index, instanceProps) =>
    getItemMetadata(props, index, instanceProps).offset,
  getStartIndexForOffset: (props, offset, instanceProps) =>
    findNearestItem(props, instanceProps, offset),
  getStopIndexForStartIndexOffset: (
    props,
    startIndex,
    scrollOffset,
    instanceProps
  ) => {
    const { height, itemCount } = props
    const itemMetadata = getItemMetadata(props, startIndex, instanceProps)

    const maxOffset = itemMetadata.offset + height

    let offset = itemMetadata.offset + itemMetadata.size

    let stopIndex = startIndex

    while (stopIndex < itemCount - 1 && offset < maxOffset) {
      stopIndex++
      offset += getItemMetadata(props, stopIndex, instanceProps).size
    }

    return stopIndex
  },

  initInstanceProps: (props) => {
    // debugger
    const { estimatedItemSize } = props
    const instanceProps = {
      estimatedItemSize: estimatedItemSize || DEFAULT_ESTIMATED_ITEM_SIZE,
      // 记录每个条目的信息
      itemMetadataMap: {},
      lastMeasuredIndex: -1,
    }

    return instanceProps
  },
})

/**
 *
 */
function getEstimatedTotalSize(
  { itemSize, itemCount },
  { estimatedItemSize, itemMetadataMap, lastMeasuredIndex }
) {
  let totalSizeOfMeasuredItems = 0

  if (lastMeasuredIndex >= 0) {
    const itemMetadata = itemMetadataMap[lastMeasuredIndex]
    totalSizeOfMeasuredItems = itemMetadata.offset + itemMetadata.size
  }

  // 未测量过的条目数量
  const numUnmeasuredItems = itemCount - lastMeasuredIndex - 1
  // 未测量过的总高度
  const totalSizeOfUnmeasuredItems = numUnmeasuredItems * estimatedItemSize

  return totalSizeOfMeasuredItems + totalSizeOfUnmeasuredItems
}

function findNearestItem(props, instanceProps, offset) {
  const { lastMeasuredIndex, itemMetadataMap } = instanceProps
  // 第一种写法
  let lastMeasuredItemOffset =
    lastMeasuredIndex > 0 ? itemMetadataMap[lastMeasuredIndex].offset : 0

  if (lastMeasuredItemOffset >= offset) {
    return findNearestBinarySearch(
      props,
      instanceProps,
      lastMeasuredIndex,
      0,
      offset
    )
  } else {
    return findNearestExponentialSearch(
      props,
      instanceProps,
      Math.max(0, lastMeasuredIndex),
      offset
    )
  }

  // 第二种写法
  // for (let index = 0; index <= lastMeasuredIndex; index++) {
  //   const currentOffset = getItemMetadata(props, index, instanceProps).offset
  //   if (currentOffset >= offset) {
  //     return index
  //   }
  // }

  return 0
}

function findNearestBinarySearch(props, instanceProps, high, low, offset) {
  while (low <= high) {
    const middle = low + Math.floor((high - low) / 2)
    const currentOffset = getItemMetadata(props, middle, instanceProps).offset

    if (currentOffset === offset) {
      return middle
    } else if (currentOffset < offset) {
      low = middle + 1
    } else if (currentOffset > offset) {
      high = middle - 1
    }
  }
  if (low > 0) {
    return low - 1
  } else {
    return 0
  }
}

function findNearestExponentialSearch(props, instanceProps, index, offset) {
  const { itemCount } = props
  let interval = 1
  while (
    index < itemCount &&
    getItemMetadata(props, index, instanceProps).offset < offset
  ) {
    index += interval
    interval *= 2
  }

  return findNearestBinarySearch(
    props,
    instanceProps,
    Math.min(index, itemCount - 1),
    Math.floor(index / 2),
    offset
  )
}

// 获取每个条目对应的元数据
function getItemMetadata(props, index, instanceProps) {
  const { itemSize } = props
  const { itemMetadataMap, lastMeasuredIndex } = instanceProps
  if (index > lastMeasuredIndex) {
    let offset = 0
    if (lastMeasuredIndex >= 0) {
      const itemMetadata = itemMetadataMap[lastMeasuredIndex]
      offset = itemMetadata.offset + itemMetadata.size
    }
    for (let i = lastMeasuredIndex + 1; i <= index; i++) {
      const size = itemSize(i)
      itemMetadataMap[i] = { offset, size }
      offset += size
    }
    instanceProps.lastMeasuredIndex = index
  }
  return itemMetadataMap[index]
}

export default VariableSizeList
