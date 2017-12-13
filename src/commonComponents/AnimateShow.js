import React, {Component} from 'react'

class AnimateShow extends Component {
  componentWillMount () {
    this.setState({
      displayStyle: {
        'display': 'none'
      }
    })
  }
  componentWillReceiveProps (nextProps, nextState) {
    if (!this.props.relativeElem && nextProps.relativeElem || this.props.relativeElem === document.body && nextProps.relativeElem !== document.body) {
      const {
        top,
        left,
        width,
        height
      } = nextProps.relativeElem.getBoundingClientRect()
      this.setState({
        positionInfo: {
          top: top + height + 2,
          left: left + width / 4,
          position: 'absolute'
        }
      })
    }
    if (!this.props.show && nextProps.show) {
      this.setState({
        className: 'app-animate-before-enter',
        displayStyle: {
          display: 'block'
        }
      })
      setTimeout(() => {
        this.setState({
          className: 'app-animate-entered'
        })
      }, 0)
    } else if (this.props.show && !nextProps.show) {
      this.setState({
        className: 'app-animate-left'
      })
      const self = this
      this.animateElem.addEventListener('transitionend', function anony (e) {
        self.animateElem.removeEventListener('transitionend', anony)
        self.setState({
          displayStyle: {
            'display': 'none'
          }
        })
      })
    }
  }
  render () {
    const {
      className,
      displayStyle,
      positionInfo
    } = this.state
    return (
      <div className={`${className || ''} app-animate-container`} ref={elem => this.animateElem = elem} style={{
        ...displayStyle,
        ...positionInfo
      }}>
        {this.props.children}
      </div>
    )
  }
}

AnimateShow.defaultProps = {
  show: false,
  relativeElem: document.body
}

export default AnimateShow