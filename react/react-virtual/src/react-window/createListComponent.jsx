import React, { Component, createRef } from 'react'

class ListItem extends Component {
  constructor(props) {
    super(props)
    this.domRef = createRef()
    this.resizeObserver = null
  }

  componentDidMount() {
    if (this.domRef.current) {
      const domNode = this.domRef.current.firstChild
      const { index, onSizeChange } = this.props
      this.resizeObserver = new ResizeObserver(() => {
        onSizeChange(index, domNode)
      })

      this.resizeObserver.observe(domNode)
    }
  }

  componentWillUnmount() {
    if (this.resizeObserver && this.domRef.current.firstChild) {
      this.resizeObserver.unobserve(this.domRef.current.firstChild)
    }
  }

  render() {
    const { style, index, ComponentType } = this.props

    return (
      <div style={style} ref={this.domRef}>
        <ComponentType index={index} />
      </div>
    )
  }
}

function createListComponent({
  getEstimatedTotalSize,
  getItemSize,
  getItemOffset,
  getStartIndexForOffset, // 根据向上卷去的高度计算开始索引
  getStopIndexForStartIndexOffset, // 根据开始索引和容器高地计算结束索引

  initInstanceProps,
  getOffsetForIndex,
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

    scrollToItem = (index) => {
      const { itemCount } = this.props
      index = Math.min(index, itemCount - 1)

      const offset = getOffsetForIndex(this.props, index)
      this.scrollTo(offset)
    }

    scrollTo = (scrollOffset) => {
      this.setState({ scrollOffset: scrollOffset })
    }

    componentDidMount() {
      // 初次渲染
      if (this.props.isDynmaic) {
        this.observe((this.oldFirstRef.current = this.firstRef.current))
        this.observe((this.oldLastRef.current = this.lastRef.current))
      }
    }

    componentDidUpdate() {
      if (this.props.isDynmaic) {
        if (this.oldFirstRef.current !== this.firstRef.current) {
          this.oldFirstRef.current = this.firstRef.current
          this.observe(this.oldFirstRef.current)
        }
        if (this.oldLastRef.current !== this.lastRef.current) {
          this.oldLastRef.current = this.lastRef.current
          this.observe(this.oldLastRef.current)
        }
      }

      const { scrollOffset } = this.state
      this.outerRef.current.scrollTop = scrollOffset
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

    onSizeChange = (index, domNode) => {
      const height = domNode.offsetHeight
      const { itemMetadataMap, lastMeasuredIndex } = this.instanceProps
      const itemMetadata = itemMetadataMap[index]
      itemMetadata.size = height //改成真实的高度
      let offset = 0
      for (let i = 0; i < lastMeasuredIndex; i++) {
        const itemMetadata = itemMetadataMap[i]
        itemMetadata.offset = offset
        offset = offset + itemMetadata.size
      }
      this.itemStyleCache.clear()
      this.forceUpdate()
    }

    render() {
      const {
        className,
        width,
        height,
        itemCount,
        children: ComponentType,
        isDynmaic,
      } = this.props

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
          if (isDynmaic) {
            const style = this.getItemStyle(i)
            if (i === originStartIndex) {
              items.push(
                <React.Fragment key={i}>
                  <span
                    ref={this.firstRef}
                    style={{ ...style, width: 0, height: 0 }}
                  ></span>
                  <ListItem
                    index={i}
                    style={style}
                    ComponentType={ComponentType}
                    onSizeChange={this.onSizeChange}
                  />
                </React.Fragment>
              )
            } else if (i === originEndIndex) {
              items.push(
                <React.Fragment key={i}>
                  <span
                    ref={this.lastRef}
                    style={{ ...style, width: 0, height: 0 }}
                  ></span>
                  <ListItem
                    index={i}
                    style={style}
                    ComponentType={ComponentType}
                    onSizeChange={this.onSizeChange}
                  />
                </React.Fragment>
              )
            } else {
              items.push(
                <ListItem
                  index={i}
                  style={style}
                  key={i}
                  ComponentType={ComponentType}
                  onSizeChange={this.onSizeChange}
                />
              )
            }
          } else {
            const style = this.getItemStyle(i)
            if (i === originStartIndex) {
              items.push(
                <React.Fragment key={i}>
                  <span
                    ref={this.firstRef}
                    style={{ ...style, width: 0, height: 0 }}
                  ></span>
                  <ComponentType index={i} style={style} />
                </React.Fragment>
              )
            } else if (i === originEndIndex) {
              items.push(
                <React.Fragment key={i}>
                  <span
                    ref={this.lastRef}
                    style={{ ...style, width: 0, height: 0 }}
                  ></span>
                  <ComponentType index={i} style={style} />
                </React.Fragment>
              )
            } else {
              items.push(<ComponentType index={i} key={i} style={style} />)
            }
          }
        }
      }
      return (
        <div
          className={className}
          style={containerStyle}
          onScroll={this.onScroll}
          ref={this.outerRef}
        >
          <div style={contentStyle}>{items}</div>
        </div>
      )
    }
  }
}

export default createListComponent
