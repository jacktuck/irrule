const irrule = require('../lib/irrule.js')
const moment = require('moment')
const _ = require('lodash')
const chai = require('chai')
const expect = chai.expect


describe('DAILY', function () {
  describe(`
    DTSTART;TZID=US-Eastern:19970902T090000
    FREQ=DAILY;BYHOUR=9,10,11,12,13,14,15,16;BYMINUTE=0,20,40
  `, function () {
    it('Recurring every 20 minutes from 9:00 AM to 4:40 PM every day', function () {
      let occurances = new irrule({
        freq: 'daily',
        byHour: [9,10,11,12,13,14,15,16],
        byMinute: [0,20,40]
      })



      console.log(occurances.iter())


      // let gen = occurances.next()(moment("1997-09-02T09:00:00.000"))

      // console.log('gen', gen)

      // _.times(25, gen.next.bind(gen))

      // console.log('BANG', gen.next().value)

      // expect(gen.next().value).to.equal(moment("1997-09-02T09:00:00.000").toString())
      // expect(gen.next().value).to.equal(moment("1997-09-02T09:20:00.000").toString())
      // expect(gen.next().value).to.equal(moment("1997-09-02T09:40:00.000").toString())
      // expect(gen.next().value).to.equal(moment("1997-09-02T10:00:00.000").toString())
      //


      // check we get onto the next day by iterating by 24hrs (24 * 4)
    })
  })
})
