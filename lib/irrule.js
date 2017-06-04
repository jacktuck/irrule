const joi = require('joi')
const moment = require('moment')
const _ = require('lodash')

class irrule {
  constructor (props) {
    const schema = joi.object().keys({
      freq: joi.string().valid('daily', 'weekly', 'monthly', 'yearly').required(),
      interval: joi.number().default(1),
      count: joi.number(),
      until: joi.date(),
      wkst: joi.string().valid('su', 'mo', 'tu', 'we', 'th', 'fr', 'sa').default([null]),
      bySecond: joi.array().single().items(joi.number().min(0).max(59)).default([null]),
      byMinute: joi.array().single().items(joi.number().min(0).max(59)).default([null]),
      byHour: joi.array().single().items(joi.number().min(0).max(59)).default([null]),
      byDay: joi.array().single().items(joi.string().valid('su', 'mo', 'tu', 'we', 'th', 'fr', 'sa')).default([null]),
      byMonthDay: joi.array().single().items(joi.number().min(-31).max(31)).default([null]),
      byYearDay: joi.array().single().items(joi.number().min(1).max(366)).default([null]),
      byWeekNo: joi.array().single().items(joi.number().min(1).max(53)).default([null]),
      byMonth: joi.array().single().items(joi.number().min(1).max(12)).default([null]),
      bySetPos: joi.array().single().items(joi.number().min(-366).max(366)).default([null])
    })

    this.props = joi.attempt(props, schema)

    return this
  }

  all (last, max = 500) {
    let occurances = []

    let gen = this.next(last)
    let curr

    while ((curr = gen.next().value) && max--) {
      console.log('curr', curr)

      occurances.push(curr)
    }

    console.log('occurances', occurances)

    return occurances
  }

  next (last) {
    let gen

    switch (this.props.freq) {
      case 'daily':
        gen = this.nextDay(last)
        break
      case 'weekly':
        gen = this.nextWeek(last)
        break
      case 'monthly':
        gen = this.nextMonth(last)
        break
      case 'yearly':
        gen = this.nextYear(last)
        break
    }

    return gen
  }

  * nextDay (startDay) {
    console.log('reached nextDay')
    console.log('startDay', startDay)

    let v = moment(startDay)

    console.log('this.props', this.props)

    let hours = _.castArray(this.props.byHour)
    let minutes = _.castArray(this.props.byMinute)

    let i = 0
    let last

    while (true) {
      for (let hour of this.props.byHour) {
        if (hour !== null) v.set('hour', hour)

        for (let minute of this.props.byMinute) {
          if (minute !== null) v.set('minute', minute)

          for (let second of this.props.bySecond) {
            if (second !== null) v.set('second', second)

            last = v
            i++

            let pastCount = !!this.props.count && i > this.props.count
            let pastUntil = (last && this.props.until) && last.isAfter(this.props.until)

            console.log('i', i)

            console.log('this.props.count', this.props.count)
            console.log('this.props.until', this.props.until)

            console.log('pastCount', pastCount)
            console.log('pastUntil', pastUntil)


            if (pastCount || pastUntil) yield undefined
            else yield v.toString()
          }
        }

      }

      v.add(1, 'day')
    }
  }
}

module.exports = irrule
