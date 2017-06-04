const irrule = require('../lib/irrule.js')
const moment = require('moment')
const _ = require('lodash')
const chai = require('chai')
const expect = chai.expect


describe('DAILY', function () {
  describe(`
    DTSTART;TZID=US-Eastern:19970902T090000
    FREQ=DAILY;BYHOUR=9,10,11,12,13,14,15,16;BYMINUTE=0,20,40;BYSECOND=30,40;COUNT=5
  `, function () {
    it('Recurring every 20 minutes from 9:00 AM to 4:40 PM every day', function () {
      let rrule = new irrule({
        freq: 'daily',
        byHour: [9,10,11,12,13,14,15,16],
        byMinute: [0,20,40],
        bySecond: [30, 40],
        until: 'Wed Sep 03 1997 09:40:50 GMT+0100'
      })



      let occurances = rrule.all("1997-09-02T09:00:00.000")
      let expected = [
        'Tue Sep 02 1997 09:00:30 GMT+0100',
        'Tue Sep 02 1997 09:00:40 GMT+0100',
        'Tue Sep 02 1997 09:20:30 GMT+0100',
        'Tue Sep 02 1997 09:20:40 GMT+0100',
        'Tue Sep 02 1997 09:40:30 GMT+0100',
        'Tue Sep 02 1997 09:40:40 GMT+0100',
        'Tue Sep 02 1997 10:00:30 GMT+0100',
        'Tue Sep 02 1997 10:00:40 GMT+0100',
        'Tue Sep 02 1997 10:20:30 GMT+0100',
        'Tue Sep 02 1997 10:20:40 GMT+0100',
        'Tue Sep 02 1997 10:40:30 GMT+0100',
        'Tue Sep 02 1997 10:40:40 GMT+0100',
        'Tue Sep 02 1997 11:00:30 GMT+0100',
        'Tue Sep 02 1997 11:00:40 GMT+0100',
        'Tue Sep 02 1997 11:20:30 GMT+0100',
        'Tue Sep 02 1997 11:20:40 GMT+0100',
        'Tue Sep 02 1997 11:40:30 GMT+0100',
        'Tue Sep 02 1997 11:40:40 GMT+0100',
        'Tue Sep 02 1997 12:00:30 GMT+0100',
        'Tue Sep 02 1997 12:00:40 GMT+0100',
        'Tue Sep 02 1997 12:20:30 GMT+0100',
        'Tue Sep 02 1997 12:20:40 GMT+0100',
        'Tue Sep 02 1997 12:40:30 GMT+0100',
        'Tue Sep 02 1997 12:40:40 GMT+0100',
        'Tue Sep 02 1997 13:00:30 GMT+0100',
        'Tue Sep 02 1997 13:00:40 GMT+0100',
        'Tue Sep 02 1997 13:20:30 GMT+0100',
        'Tue Sep 02 1997 13:20:40 GMT+0100',
        'Tue Sep 02 1997 13:40:30 GMT+0100',
        'Tue Sep 02 1997 13:40:40 GMT+0100',
        'Tue Sep 02 1997 14:00:30 GMT+0100',
        'Tue Sep 02 1997 14:00:40 GMT+0100',
        'Tue Sep 02 1997 14:20:30 GMT+0100',
        'Tue Sep 02 1997 14:20:40 GMT+0100',
        'Tue Sep 02 1997 14:40:30 GMT+0100',
        'Tue Sep 02 1997 14:40:40 GMT+0100',
        'Tue Sep 02 1997 15:00:30 GMT+0100',
        'Tue Sep 02 1997 15:00:40 GMT+0100',
        'Tue Sep 02 1997 15:20:30 GMT+0100',
        'Tue Sep 02 1997 15:20:40 GMT+0100',
        'Tue Sep 02 1997 15:40:30 GMT+0100',
        'Tue Sep 02 1997 15:40:40 GMT+0100',
        'Tue Sep 02 1997 16:00:30 GMT+0100',
        'Tue Sep 02 1997 16:00:40 GMT+0100',
        'Tue Sep 02 1997 16:20:30 GMT+0100',
        'Tue Sep 02 1997 16:20:40 GMT+0100',
        'Tue Sep 02 1997 16:40:30 GMT+0100',
        'Tue Sep 02 1997 16:40:40 GMT+0100',
        'Wed Sep 03 1997 09:00:30 GMT+0100',
        'Wed Sep 03 1997 09:00:40 GMT+0100',
        'Wed Sep 03 1997 09:20:30 GMT+0100',
        'Wed Sep 03 1997 09:20:40 GMT+0100',
        'Wed Sep 03 1997 09:40:30 GMT+0100',
        'Wed Sep 03 1997 09:40:40 GMT+0100'
      ]

      expect(occurances).to.deep.equal(expected)
    })
  })
})
