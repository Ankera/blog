import { FixedSizeList, VariableSizeList } from './react-window'
import './fixed-size-list.css'

const rowSizes = new Array(1000)
  .fill(true)
  .map(() => 25 + Math.round(Math.random() * 55))

const getItemSize = (index) => rowSizes[index]

const Row = ({ index, style, forwardRef }) => {
  return (
    <div
      className={index % 2 ? 'odd' : 'even'}
      index={index}
      ref={forwardRef}
      style={style}
    >
      row {index}
    </div>
  )
}

function FixedSize() {
  return (
    <div>
      <FixedSizeList
        className="list"
        height={200}
        width={200}
        // itemSize={getItemSize}
        itemSize={50}
        itemCount={1000}
      >
        {Row}
      </FixedSizeList>
    </div>
  )
}

export default FixedSize
