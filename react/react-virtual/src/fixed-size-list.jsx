import { FixedSizeList } from './react-window'
import './fixed-size-list.css'

const Row = ({ index, style }) => {
  return (
    <div className={index % 2 ? 'odd' : 'even'} style={style}>
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
        itemSize={50}
        itemCount={1000}
      >
        {Row}
      </FixedSizeList>
    </div>
  )
}

export default FixedSize
