import { useRef } from 'react'
import { FixedSizeList, VariableSizeList } from './react-window'
import './fixed-size-list.css'

const rowSizes = new Array(1000)
  .fill(true)
  .map(() => 25 + Math.round(Math.random() * 55))

const getItemSize = (index) => rowSizes[index]

const Row = ({ index, style }) => {
  return (
    <div className={index % 2 ? 'odd' : 'even'} index={index} style={style}>
      row {index}
    </div>
  )
}

function FixedSize() {
  const listRef = useRef()
  return (
    <div>
      <button
        onClick={() => {
          listRef.current.scrollToItem(50)
        }}
      >
        按钮
      </button>
      <FixedSizeList
        className="list"
        height={200}
        width={200}
        // itemSize={getItemSize}
        itemSize={50}
        itemCount={1000}
        ref={listRef}
      >
        {Row}
      </FixedSizeList>
    </div>
  )
}

export default FixedSize
