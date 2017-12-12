import React, {Component} from 'react'
import {createPortal} from 'react-dom'

class Portal extends Component {
  componentWillUnmount () {
    document.body.removeChild(this.defaultNode)
    this.defaultNode = null
  }
  render () {
    if (typeof window === undefined && !window.document && !window.document.createElement) {
      return null
    }
    if (!this.defaultNode) {
      this.defaultNode = document.createElement('div')
      this.props.style && this.defaultNode.setAttribute('style', this.props.style)
      document.body.appendChild(this.defaultNode)
    }
    return createPortal(
      this.props.children,
      this.defaultNode
    )
  }
}

export default Portal