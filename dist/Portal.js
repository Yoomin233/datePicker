import React, {Component} from 'react'
import {createPortal} from 'react-dom'

class Portal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false
    }
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleMouseClick = this.handleMouseClick.bind(this)
  }
  componentDidMount () {
    const {onEscClose, onBodyClickClose} = this.props
    if (onEscClose) {
      document.body.addEventListener('keyup', this.handleKeyPress, false)
    }
    if (onBodyClickClose) {
      document.body.addEventListener('click', this.handleMouseClick, false)
    }
  }
  handleKeyPress (e) {
    if (e.keyCode === 27) {
      this.props.onClose()
    }
  }
  handleMouseClick (e) {
    if (e.path.includes(this.defaultNode)) {
      console.log('contain!')
    } else {
      console.log('close!')
      this.props.onClose()
    }
  }
  componentWillUnmount () {
    // wipe ass
    document.body.removeEventListener('keyup', this.handleKeyPress)
    document.body.removeEventListener('click', this.handleMouseClick)
    document.body.removeChild(this.defaultNode)
    this.defaultNode = null
  }
  render () {
    if (typeof window === undefined && !window.document && !window.document.createElement) {
      return null
    }
    if (!this.defaultNode) {
      this.defaultNode = document.createElement('div')
      document.body.appendChild(this.defaultNode)
    }
    return createPortal(
      this.props.children,
      this.defaultNode
    )
  }
}

Portal.defaultProps = {
  onClose: () => {},
  onOpen: () => {}
}

export default Portal