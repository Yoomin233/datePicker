import React, { Component } from 'react'

import Portal from '../commonComponents/Portal'
import AnimateShow from '../commonComponents/AnimateShow'

class DatePicker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false
    }
  }
  componentWillMount () {
    const notTime = new Date()
    this.setDate({
      year: notTime.getFullYear(),
      month: notTime.getMonth() + 1
    })
  }
  componentDidMount () {
    const {
      top,
      left,
      width,
      height
    } = this.dataPickerInput.getBoundingClientRect()
    this.setState({
      pickerElemObj: {
        top: top + height + 2,
        left: left + width / 4,
        position: 'absolute'
      }
    })
  }
  setDate ({year, month}) {
    const now = new Date()
    const currentMonth = new Date(`${year}-${month}-01`)

    // used to determine current month's day count
    const tempDate = new Date(`${year}-${month}-01`)
    // set to next month
    tempDate.setMonth(tempDate.getMonth() + 1)
    // set to prev month's date
    tempDate.setDate(0)

    this.setState({
      now,
      today: {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        date: now.getDate(),
        day: now.getDay()
      },
      currentYear: year,
      currentMonth: month,
      currentDate: now.getDate(),
      currentMonthDateCount: tempDate.getDate(),
      currentMonthFirstDateDay: new Date(tempDate.setDate(1)).getDay(),
      prevMonthDateCount: new Date(tempDate.setDate(0)).getDate()
    })
  }
  switchShowState () {
    this.setState(({active}) => ({active: !active}))
  }
  render () {
    const {
      now,
      today,
      currentYear,
      currentMonth,
      currentDate,
      currentMonthFirstDateDay,
      currentMonthDateCount,
      prevMonthDateCount
    } = this.state
    const {
      active,
      pickerElemObj
    } = this.state
    return (
      [
        <input type="text" key='input' ref={elem => this.dataPickerInput = elem}/>,
        <button onClick={e => this.switchShowState()} key='button'>switch!</button>,
        // this is portal rendered to document.body
        <Portal key='picker' style='position: absolute; left: 0; top: 0; width: 100%;'>
          {/* this is animation component */}
          <AnimateShow show={active} style={pickerElemObj}>
            <div className="app-calendar-root">
              <p className="app-calendar-control-row">
                <span onClick={e => {
                  this.setDate({
                    year: currentYear - 1,
                    month: currentMonth
                  })
                }}>&#60;&#60;</span>
                <span onClick={e => {
                  this.setDate({
                    year: currentMonth === 1 ? (currentYear - 1) : currentYear,
                    month: currentMonth === 1 ? 12 : currentMonth - 1
                  })
                }}>&#60;</span>
                <span>{currentYear}.{currentMonth}</span>
                <span onClick={e => {
                  this.setDate({
                    year: currentMonth === 12 ? (currentYear + 1) : currentYear,
                    month: currentMonth === 12 ? 1 : currentMonth + 1
                  })
                }}>&#62;</span>
                <span onClick={e => {
                  this.setDate({
                    year: currentYear + 1,
                    month: currentMonth
                  })
                }}>&#62;&#62;</span>
              </p>
              <p className="app-calendar-weekday-row">
                <span>S</span>
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
              </p>
              <div className="app-calendar-date-cell-outer-container">
                <p className="app-calendar-date-cell-inner-container">
                  {
                    Array.from({length: currentMonthFirstDateDay})
                    .reduceRight((prev, next, index, arr) => prev.concat(
                      <span 
                      key={index} 
                      className='prevMonthDateCell'
                      onClick={e => {
                        const output = {
                          year: currentMonth === 1 ? currentYear - 1 : currentYear,
                          month: currentMonth === 1 ? 12 : currentMonth - 1,
                          date: prevMonthDateCount - index
                        }
                        this.props.onSelect(output)
                      }}
                    >{prevMonthDateCount - index}</span>), [])
                  }
                  {
                    Array.from({length: currentMonthDateCount})
                    .map((item, index) => <span 
                      key={31 + index} 
                      className={`dateCell ${
                        currentYear === today.year &&
                        currentMonth === today.month &&
                        index + 1 === today.date ? 'isToday' : ''
                      }`}
                      onClick={e => {
                      const output = {
                        year: currentYear,
                        month: currentMonth,
                        date: index + 1
                      }
                      this.props.onSelect(output)
                    }}>{index + 1}</span>)
                  }
                  {
                    (currentMonthDateCount - (7 - currentMonthFirstDateDay)) % 7 ? 
                    Array.from({ length: 7 - (currentMonthDateCount - (7 - currentMonthFirstDateDay)) % 7})
                    .map((item, index) => 
                    <span 
                      key={62 + index} 
                      className='nextMonthDateCell'
                        onClick={e => {
                        const output = {
                          year: currentMonth === 12 ? currentYear + 1 : currentYear,
                          month: currentMonth === 12 ? 1 : currentMonth + 1,
                          date: index + 1
                        }
                        this.props.onSelect(output)
                      }}
                    >{index + 1}</span>)
                    : null
                  }
                </p>
              </div>
            </div>
          </AnimateShow>
        </Portal>
      ]
    )
  }
}

DatePicker.defaultProps = {
  onSelect: console.log.bind(console)
}

export default DatePicker