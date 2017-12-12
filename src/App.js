import React from 'react'
import ReactDOM from 'react-dom'

import Image from './img.png'
import './style.css'

import DatePicker from './components/Calendar'

export default () => <div className='app-root'>
  <DatePicker onSelect={dateObject => console.log(dateObject) } />
</div>