import React, {Component} from 'react'

class AnimateShow extends Component {
  // componentWillMount () {
  //   this.setState({
  //     styleObj: this.props.show ? {
  //       'display': 'block'
  //     } : {
  //         'display': 'none'
  //       }
  //   })
  // }
  constructor (props) {
    super(props)
    this.state = {
      internalStyle: {
        'display': 'none'
      }
    }
  }
  componentWillReceiveProps (nextProps, nextState) {
    const delay = 5000
    if (!this.props.show && nextProps.show) {
      this.setState({
        className: 'app-animate-before-enter',
        internalStyle: {
          display: 'block'
        }
      })
      setTimeout(() => {
        this.setState({
          className: 'app-animate-entered'
        })
      }, delay)
    } else if (this.props.show && !nextProps.show) {
      this.setState({
        className: 'app-animate-leaving'
      })
      setTimeout(() => {
        this.setState({
          className: 'app-animate-left',
          internalStyle: {
            'display': 'none'
          }
        })
      }, delay)
    }
  }
  render () {
    const {
      className,
      internalStyle
    } = this.state
    const {
      style: externalStyle,
    } = this.props
    return (
      <div className={`${className} app-animate-container`} ref={elem => this.animateElem = elem} style={{
        ...externalStyle,
        ...internalStyle
      }}>
        {this.props.children}
      </div>
    )
  }
}

AnimateShow.defaultProps = {
  show: false
}

export default AnimateShow