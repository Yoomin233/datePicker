import React, { Component } from 'react'

import Portal from '../../commonComponents/Portal'
import AnimateShow from '../../commonComponents/AnimateShow'

import './style.css'

class DatePicker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showCalendar: false,
      inputValue: '',
      whichPanel: 'date' // date, month, year
    }
  }
  componentWillMount () {
    const nowTime = new Date()
    this.setDate({
      year: nowTime.getFullYear(),
      month: nowTime.getMonth() + 1,
    })
  }
  // componentDidMount () {
  //   const {
  //     top,
  //     left,
  //     width,
  //     height
  //   } = this.dataPickerInput.getBoundingClientRect()
  //   this.setState({
  //     pickerElemObj: {
  //       top: top + height + 2,
  //       left: left + width / 4,
  //       position: 'absolute'
  //     }
  //   })
  // }
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
  switchShowState (e) {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    this.setState(({showCalendar}) => ({showCalendar: !showCalendar}))
  }
  clickDateCell (month, index) {
    const {
      currentMonth,
      currentYear,
      prevMonthDateCount,
    } = this.state
    let output
    if (month === -1) {
      output = {
        year: currentMonth === 1 ? currentYear - 1 : currentYear,
        month: currentMonth === 1 ? 12 : currentMonth - 1,
        date: prevMonthDateCount - index
      }
    } else if (month === 0) {
      output = {
        year: currentYear,
        month: currentMonth,
        date: index + 1
      }
    } else if (month === 1) {
      output = {
        year: currentMonth === 12 ? currentYear + 1 : currentYear,
        month: currentMonth === 12 ? 1 : currentMonth + 1,
        date: index + 1
      }
    }
    this.props.onSelect(output)
    this.setState({
      showCalendar: false,
      inputValue: `${output.year}-${output.month}-${output.date}`
    })
  }
  switchPanel () {
    const panelList = ['date', 'month', 'year']
    const {whichPanel} = this.state
    const nextPanel = panelList[(panelList.indexOf(whichPanel) + 1) % panelList.length]
    this.setState({
      whichPanel: nextPanel
    })
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
      showCalendar,
      inputValue,
      whichPanel
    } = this.state
    return (
      [
        <div className="app-calendar-input-wrapper" key='input'>
          <input type="input" ref={elem => this.dataPickerInput = elem} value={inputValue} onChange={e => {
            this.setState({inputValue: e.target.value})
          }}/>
          <svg viewBox='0 0 33 33' onClick={e => this.switchShowState(e)}>
            <path d="M10 12h4v4h-4zM16 12h4v4h-4zM22 12h4v4h-4zM4 24h4v4h-4zM10 24h4v4h-4zM16 24h4v4h-4zM10 18h4v4h-4zM16 18h4v4h-4zM22 18h4v4h-4zM4 18h4v4h-4zM26 0v2h-4v-2h-14v2h-4v-2h-4v32h30v-32h-4zM28 30h-26v-22h26v22z"></path>
          </svg>
          {
            inputValue ?
            <span onClick={e => {
              e.preventDefault()
              this.setState({inputValue: ''})}
            }>x</span> :
            null
          }
        </div>,
        // this is portal rendered to document.body
        <Portal key='picker' onClose={() => this.setState({ showCalendar: false })} onEscClose>
          {/* this is animation component */}
          <AnimateShow show={showCalendar} relativeElem={this.dataPickerInput}>
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
                <span onClick={e => this.switchPanel()}>{currentYear}.{currentMonth}</span>
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
              {
                whichPanel === 'date' &&
                <p className="app-calendar-weekday-row">
                  <span>S</span>
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
                  <span>S</span>
                </p>
              }
              <div className="app-calendar-date-cell-outer-container">
                {
                  whichPanel === 'date' &&
                  <p className="app-calendar-date-cell-inner-container">
                    {
                      Array.from({length: currentMonthFirstDateDay})
                      .reduceRight((prev, next, index, arr) => prev.concat(
                        <span 
                        key={index} 
                        className='prevMonthDateCell'
                        onClick={e => this.clickDateCell(-1, index)}
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
                      onClick={e => this.clickDateCell(0, index)}>{index + 1}</span>)
                    }
                    {
                      (currentMonthDateCount - (7 - currentMonthFirstDateDay)) % 7 ? 
                      Array.from({ length: 7 - (currentMonthDateCount - (7 - currentMonthFirstDateDay)) % 7})
                      .map((item, index) => 
                      <span 
                      key={62 + index} 
                      className='nextMonthDateCell'
                      onClick={e => this.clickDateCell(1, index)}
                      >{index + 1}</span>)
                      : null
                    }
                  </p>
                }
                {
                  whichPanel === 'month' && 
                  <p className="app-calendar-date-cell-inner-container">
                    {
                      ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((item, index) => 
                      <span className='monthCell' key={item} onClick={e => {
                        this.setState({
                          currentMonth: index + 1,
                          whichPanel: 'date'
                        })
                      }}>{item}</span>)
                    }
                  </p>
                }
                {
                  whichPanel === 'year' && 
                  <p className='app-calendar-date-cell-year-container'>
                    {
                      Array.from({length: 24})
                      .map((item, index) => (
                        <span className='yearCell' key={index} onClick={e => {
                          this.setState({
                            currentYear: index + currentYear - 12,
                            whichPanel: 'date'
                          })
                        }}>
                          {index + currentYear - 12}
                        </span>
                      ))
                    }
                  </p>
                }
              </div>
            </div>
          </AnimateShow>
        </Portal>
      ]
    )
  }
}

DatePicker.defaultProps = {
  onSelect: () => {}
}

export default DatePicker