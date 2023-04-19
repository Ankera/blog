import React, { Component } from 'react'

function createListComponent({
  getEstimatedTotalSize,
  getItemSize,
  getItemOffset,
  getStartIndexForOffset, // 根据向上卷去的高度计算开始索引
  getStopIndexForOffset, // 根据开始索引和容器高地计算结束索引
}) {
  return class extends Component {
    static defaultProps = {
      overscanCount: 2,
    }

    state = {
      scrollOffset: 0, // 状态值为向上卷去的高度
    }

    getItemStyle = (index) => {
      const style = {
        position: 'absolute',
        width: '100%',
        height: getItemSize(this.props, index),
        top: getItemOffset(this.props, index),
      }

      return style
    }

    getRangeToRender = () => {
      const { scrollOffset } = this.state
      const { overscanCount, itemCount } = this.props
      const startIndex = getStartIndexForOffset(this.props, scrollOffset)

      const endIndex = getStopIndexForOffset(this.props, startIndex)
      return [
        Math.max(0, startIndex - overscanCount),
        Math.min(itemCount - 1, endIndex + overscanCount),
      ]
    }

    onScroll = (event) => {
      const { scrollTop } = event.currentTarget
      this.setState({ scrollOffset: scrollTop })
    }

    render() {
      const {
        className,
        width,
        height,
        itemCount,
        children: ComponentType,
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
        height: getEstimatedTotalSize(this.props),
      }

      const items = []

      if (itemCount > 0) {
        const [startIndex, endIndex] = this.getRangeToRender()
        for (let i = startIndex; i <= endIndex; i++) {
          items.push(
            <ComponentType index={i} key={i} style={this.getItemStyle(i)} />
          )
        }
      }
      return (
        <div
          className={className}
          style={containerStyle}
          onScroll={this.onScroll}
        >
          <div style={contentStyle}>{items}</div>
        </div>
      )
    }
  }
}

export default createListComponent
