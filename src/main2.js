import ReactDOM from 'react-dom'
import React from 'react'

// hot realoading
import { AppContainer } from 'react-hot-loader'

// components
import App from './App'

const render = Component => ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root2')
)

render(App)

if (module.hot) {
  module.hot.accept('./App', () => render(App))
}