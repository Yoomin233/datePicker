import React, {Component} from 'react'

import DatePicker from './components/DatePicker'

import './style.css'

class App extends Component {
  render () {
    return (
      <div className='app-root'>
        <DatePicker 
          onSelect={data => console.log(data)}
        />
      </div>
    )
  }
}

export default App