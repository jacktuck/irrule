const joi = require('joi')
const moment = require('moment')
const _ = require('lodash')

const
  BYSECOND = Symbol(),
  BYMINUTE = Symbol(),
  BYHOUR = Symbol(),
  BYDAY = Symbol(),
  BYMONTHDAY = Symbol(),
  BYYEARDAY = Symbol(),
  BYWEEKNO = Symbol(),
  BYMONTH = Symbol(),
  BYSETPOS = Symbol()

const
  NEXTDAY = Symbol(),
  NEXTWEEK = Symbol(),
  NEXTMONTH = Symbol(),
  NEXTYEAR = Symbol()

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
      // console.log('curr', curr)

      occurances.push(curr)
    }

    // console.log('occurances', occurances)

    return occurances
  }

  next (last) {
    let gen

    switch (this.props.freq) {
      case 'daily':
        gen = this[NEXTDAY](last)
        break
      case 'weekly':
        gen = this[NEXTWEEK](last)
        break
      case 'monthly':
        gen = this[NEXTMONTH](last)
        break
      case 'yearly':
        gen = this[NEXTYEAR](last)
        break
    }

    return gen
  }

  * [NEXTDAY] (startDay) {
    let v = moment(startDay)

    let hours = _.castArray(this.props.byHour)
    let minutes = _.castArray(this.props.byMinute)

    let i = 0
    let last

    let pastCount, pastUntil

    do {
      for (let hour of this.props.byHour) {
        if (hour !== null) v.set('hour', hour)

        for (let minute of this.props.byMinute) {
          if (minute !== null) v.set('minute', minute)

          for (let second of this.props.bySecond) {
            if (second !== null) v.set('second', second)

            last = v
            i++

            pastCount = !!this.props.count && i > this.props.count
            pastUntil = (last && this.props.until) && last.isAfter(this.props.until)

            if (!pastCount && !pastUntil) yield v.toString()
            else yield undefined
          }
        }

      }

      v.add(1, 'day')

    } while (!pastCount && !pastUntil)
  }

  * [BYMONTH] () {
    const daysInMonth =


     moment().startOf('month').daysInMonth()
  }

  * [BYHOUR] () {

  }

  * [BYMINUTE] () {

  }

  * [BYSECOND] () {

  }
}






module.exports = irrule
