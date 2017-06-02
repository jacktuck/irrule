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
      wkst: joi.string().valid('su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'),
      bySecond: joi.array().items(joi.number().min(0).max(59)),
      byMinute: joi.array().items(joi.number().min(0).max(59)),
      byHour: joi.array().items(joi.number().min(0).max(59)),
      byDay: joi.array().items(joi.string().valid('su', 'mo', 'tu', 'we', 'th', 'fr', 'sa')),
      byMonthDay: joi.array().items(joi.number().min(-31).max(31)),
      byYearDay: joi.array().items(joi.number().min(1).max(366)),
      byWeekNo: joi.array().items(joi.number().min(1).max(53)),
      byMonth: joi.array().items(joi.number().min(1).max(12)),
      bySetPos: joi.array().items(joi.number().min(-366).max(366))
    })

    this.props = joi.attempt(props, schema)

    return this
  }

  iter (max = 500) {
    let occurances = []

    let turns = 0

    for (let gen = this.next(), curr = gen.next().value; max && curr; max-- ) {
      console.log('ITERATION', curr)

      occurances.push(curr)
      curr = gen.next().value
    }

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

  * nextDay (lastDay) {
    console.log('reached nextDay')
    console.log('lastDay', lastDay)

    let v = moment(lastDay)

    console.log('this.props', this.props)

    let hours = _.castArray(this.props.byHour)
    let minutes = _.castArray(this.props.byMinute)

    for (let hour of this.props.byHour) {
      v.set('hour', hour)

      for (let minute of this.props.byMinute) {
        if (minute !== null) v.set('minute', minute)

        yield v.toString()
      }
    }

    v = moment(lastDay).add(this.props.interval, 'day')

    return v
  }



}

module.exports = irrule
