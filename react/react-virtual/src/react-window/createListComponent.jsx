import React, { Component, createRef } from 'react'

function createListComponent({
  getEstimatedTotalSize,
  getItemSize,
  getItemOffset,
  getStartIndexForOffset, // 根据向上卷去的高度计算开始索引
  getStopIndexForStartIndexOffset, // 根据开始索引和容器高地计算结束索引

  initInstanceProps,
}) {
  return class extends Component {
    constructor(props) {
      super(props)
      this.instanceProps = initInstanceProps && initInstanceProps(this.props)
      this.state = {
        scrollOffset: 0, // 状态值为向上卷去的高度
      }
      this.itemStyleCache = new Map() // 存放每个条目样式的缓存

      this.outerRef = createRef()

      this.firstRef = createRef()
      this.lastRef = createRef()

      this.oldFirstRef = createRef()
      this.oldLastRef = createRef()
    }

    static defaultProps = {
      overscanCount: 2,
    }

    getItemStyle = (index) => {
      let style
      if (this.itemStyleCache.has(index)) {
        style = this.itemStyleCache.get(index)
      } else {
        style = {
          position: 'absolute',
          width: '100%',
          height: getItemSize(this.props, index, this.instanceProps),
          top: getItemOffset(this.props, index, this.instanceProps),
        }

        this.itemStyleCache.set(index, style)
      }

      return style
    }

    getRangeToRender = () => {
      const { scrollOffset } = this.state
      const { overscanCount, itemCount } = this.props
      const startIndex = getStartIndexForOffset(
        this.props,
        scrollOffset,
        this.instanceProps
      )
      const endIndex = getStopIndexForStartIndexOffset(
        this.props,
        startIndex,
        scrollOffset,
        this.instanceProps
      )

      return [
        Math.max(0, startIndex - overscanCount),
        Math.min(itemCount - 1, endIndex + overscanCount),
        startIndex,
        endIndex,
      ]
    }

    onScroll = () => {
      const { scrollTop } = this.outerRef.current
      this.setState({ scrollOffset: scrollTop })
    }

    componentDidMount() {
      // 初次渲染
      this.observe((this.oldFirstRef.current = this.firstRef.current))
      this.observe((this.oldLastRef.current = this.lastRef.current))
    }

    componentDidUpdate() {
      if (this.oldFirstRef.current !== this.firstRef.current) {
        this.oldFirstRef.current = this.firstRef.current
        this.observe(this.oldFirstRef.current)
      }
      if (this.oldLastRef.current !== this.lastRef.current) {
        this.oldLastRef.current = this.lastRef.current
        this.observe(this.oldLastRef.current)
      }
    }

    observe = (dom) => {
      const io = new IntersectionObserver(
        (entries) => {
          this.onScroll()
        },
        { root: this.outerRef.current }
      )

      io.observe(dom)
    }

    render() {
      const { className, width, height, itemCount, children: Row } = this.props

      const containerStyle = {
        position: 'relative',
        width,
        height,
        overflow: 'auto',
        willChange: 'transform',
      }

      const contentStyle = {
        width: '100%',
        height: getEstimatedTotalSize(this.props, this.instanceProps),
      }

      const items = []

      if (itemCount > 0) {
        const [startIndex, endIndex, originStartIndex, originEndIndex] =
          this.getRangeToRender()
        for (let i = startIndex; i <= endIndex; i++) {
          const style = this.getItemStyle(i)
          if (i === originStartIndex) {
            items.push(
              <React.Fragment key={i}>
                <span
                  ref={this.firstRef}
                  style={{ ...style, width: 0, height: 0 }}
                ></span>
                <Row index={i} key={i} style={style} />
              </React.Fragment>
            )
          } else if (i === originEndIndex) {
            items.push(
              <React.Fragment key={i}>
                <span
                  ref={this.lastRef}
                  style={{ ...style, width: 0, height: 0 }}
                ></span>
                <Row index={i} key={i} style={style} />
              </React.Fragment>
            )
          } else {
            items.push(<Row index={i} key={i} style={style} />)
          }
        }
      }
      return (
        <div
          className={className}
          style={containerStyle}
          // onScroll={this.onScroll}
          ref={this.outerRef}
        >
          <div style={contentStyle}>{items}</div>
        </div>
      )
    }
  }
}

export default createListComponent
