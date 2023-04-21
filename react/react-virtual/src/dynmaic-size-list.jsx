import { FixedSizeList, VariableSizeList } from './react-window'
import './fixed-size-list.css'

const items = []

for (let i = 0; i < 1000; i++) {
  const height = 30 + Math.floor(Math.random() * 20) + 'px'
  const style = {
    width: '100%',
    height: height,
    backgroundColor: i % 2 ? 'green' : 'blue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  items.push(<div style={style}>Row{i}</div>)
}

const Row = ({ index }) => items[index]

function DynmaicSize() {
  return (
    <div>
      <VariableSizeList
        className="list"
        height={200}
        width={200}
        // itemSize={50}
        itemCount={1000}
        isDynmaic={true}
      >
        {Row}
      </VariableSizeList>
    </div>
  )
}

export default DynmaicSize
