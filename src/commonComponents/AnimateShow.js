import React, {Component} from 'react'

class AnimateShow extends Component {
  componentWillMount () {
    this.setState({
      styleObj: this.props.show ? {
        'display': 'block'
      } : {
          'display': 'none'
        }
    })
  }
  componentWillReceiveProps (nextProps, nextState) {
    this.setState({
      styleObj: nextProps.show ? {
        'display': 'block'
      } : {
          'display': 'none'
        }
    })
  }
  enterAnimate () {

  }
  render () {
    const {
      styleObj
    } = this.state
    return (
      <div style={styleObj}>
        {this.props.children}
      </div>
    )
  }
}

AnimateShow.defaultProps = {
  show: false
}

export default AnimateShow