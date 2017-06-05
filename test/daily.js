const irrule = require('../lib/irrule.js')
const moment = require('moment')
const _ = require('lodash')
const chai = require('chai')
const expect = chai.expect


// describe('DAILY', function () {
//   describe(`
//     RRULE:FREQ=DAILY;BYHOUR=9,10,11,12,13,14,15,16;BYMINUTE=0,20,40;BYSECOND=30,40;UNTIL=Tue Sep 03 1997 16:40:40 GMT+0100
//   `, function () {
//     it('Recur every 20 minutes from 9:00 AM to 4:40 PM every day - until Tue Sep 03', function () {
//       let rrule = new irrule({
//         freq: 'daily',
//         byHour: [9,10,11,12,13,14,15,16],
//         byMinute: [0,20,40],
//         bySecond: [30, 40],
//         until: 'Tue Sep 03 1997 16:40:40 GMT+0100'
//       })
//
//
//
//       let occurances = rrule.all('1997-09-02T09:00:00.000')
//       let expected = [
//         'Tue Sep 02 1997 09:00:30 GMT+0100',
//         'Tue Sep 02 1997 09:00:40 GMT+0100',
//         'Tue Sep 02 1997 09:20:30 GMT+0100',
//         'Tue Sep 02 1997 09:20:40 GMT+0100',
//         'Tue Sep 02 1997 09:40:30 GMT+0100',
//         'Tue Sep 02 1997 09:40:40 GMT+0100',
//         'Tue Sep 02 1997 10:00:30 GMT+0100',
//         'Tue Sep 02 1997 10:00:40 GMT+0100',
//         'Tue Sep 02 1997 10:20:30 GMT+0100',
//         'Tue Sep 02 1997 10:20:40 GMT+0100',
//         'Tue Sep 02 1997 10:40:30 GMT+0100',
//         'Tue Sep 02 1997 10:40:40 GMT+0100',
//         'Tue Sep 02 1997 11:00:30 GMT+0100',
//         'Tue Sep 02 1997 11:00:40 GMT+0100',
//         'Tue Sep 02 1997 11:20:30 GMT+0100',
//         'Tue Sep 02 1997 11:20:40 GMT+0100',
//         'Tue Sep 02 1997 11:40:30 GMT+0100',
//         'Tue Sep 02 1997 11:40:40 GMT+0100',
//         'Tue Sep 02 1997 12:00:30 GMT+0100',
//         'Tue Sep 02 1997 12:00:40 GMT+0100',
//         'Tue Sep 02 1997 12:20:30 GMT+0100',
//         'Tue Sep 02 1997 12:20:40 GMT+0100',
//         'Tue Sep 02 1997 12:40:30 GMT+0100',
//         'Tue Sep 02 1997 12:40:40 GMT+0100',
//         'Tue Sep 02 1997 13:00:30 GMT+0100',
//         'Tue Sep 02 1997 13:00:40 GMT+0100',
//         'Tue Sep 02 1997 13:20:30 GMT+0100',
//         'Tue Sep 02 1997 13:20:40 GMT+0100',
//         'Tue Sep 02 1997 13:40:30 GMT+0100',
//         'Tue Sep 02 1997 13:40:40 GMT+0100',
//         'Tue Sep 02 1997 14:00:30 GMT+0100',
//         'Tue Sep 02 1997 14:00:40 GMT+0100',
//         'Tue Sep 02 1997 14:20:30 GMT+0100',
//         'Tue Sep 02 1997 14:20:40 GMT+0100',
//         'Tue Sep 02 1997 14:40:30 GMT+0100',
//         'Tue Sep 02 1997 14:40:40 GMT+0100',
//         'Tue Sep 02 1997 15:00:30 GMT+0100',
//         'Tue Sep 02 1997 15:00:40 GMT+0100',
//         'Tue Sep 02 1997 15:20:30 GMT+0100',
//         'Tue Sep 02 1997 15:20:40 GMT+0100',
//         'Tue Sep 02 1997 15:40:30 GMT+0100',
//         'Tue Sep 02 1997 15:40:40 GMT+0100',
//         'Tue Sep 02 1997 16:00:30 GMT+0100',
//         'Tue Sep 02 1997 16:00:40 GMT+0100',
//         'Tue Sep 02 1997 16:20:30 GMT+0100',
//         'Tue Sep 02 1997 16:20:40 GMT+0100',
//         'Tue Sep 02 1997 16:40:30 GMT+0100',
//         'Tue Sep 02 1997 16:40:40 GMT+0100',
//         'Wed Sep 03 1997 09:00:30 GMT+0100',
//         'Wed Sep 03 1997 09:00:40 GMT+0100',
//         'Wed Sep 03 1997 09:20:30 GMT+0100',
//         'Wed Sep 03 1997 09:20:40 GMT+0100',
//         'Wed Sep 03 1997 09:40:30 GMT+0100',
//         'Wed Sep 03 1997 09:40:40 GMT+0100',
//         'Wed Sep 03 1997 10:00:30 GMT+0100',
//         'Wed Sep 03 1997 10:00:40 GMT+0100',
//         'Wed Sep 03 1997 10:20:30 GMT+0100',
//         'Wed Sep 03 1997 10:20:40 GMT+0100',
//         'Wed Sep 03 1997 10:40:30 GMT+0100',
//         'Wed Sep 03 1997 10:40:40 GMT+0100',
//         'Wed Sep 03 1997 11:00:30 GMT+0100',
//         'Wed Sep 03 1997 11:00:40 GMT+0100',
//         'Wed Sep 03 1997 11:20:30 GMT+0100',
//         'Wed Sep 03 1997 11:20:40 GMT+0100',
//         'Wed Sep 03 1997 11:40:30 GMT+0100',
//         'Wed Sep 03 1997 11:40:40 GMT+0100',
//         'Wed Sep 03 1997 12:00:30 GMT+0100',
//         'Wed Sep 03 1997 12:00:40 GMT+0100',
//         'Wed Sep 03 1997 12:20:30 GMT+0100',
//         'Wed Sep 03 1997 12:20:40 GMT+0100',
//         'Wed Sep 03 1997 12:40:30 GMT+0100',
//         'Wed Sep 03 1997 12:40:40 GMT+0100',
//         'Wed Sep 03 1997 13:00:30 GMT+0100',
//         'Wed Sep 03 1997 13:00:40 GMT+0100',
//         'Wed Sep 03 1997 13:20:30 GMT+0100',
//         'Wed Sep 03 1997 13:20:40 GMT+0100',
//         'Wed Sep 03 1997 13:40:30 GMT+0100',
//         'Wed Sep 03 1997 13:40:40 GMT+0100',
//         'Wed Sep 03 1997 14:00:30 GMT+0100',
//         'Wed Sep 03 1997 14:00:40 GMT+0100',
//         'Wed Sep 03 1997 14:20:30 GMT+0100',
//         'Wed Sep 03 1997 14:20:40 GMT+0100',
//         'Wed Sep 03 1997 14:40:30 GMT+0100',
//         'Wed Sep 03 1997 14:40:40 GMT+0100',
//         'Wed Sep 03 1997 15:00:30 GMT+0100',
//         'Wed Sep 03 1997 15:00:40 GMT+0100',
//         'Wed Sep 03 1997 15:20:30 GMT+0100',
//         'Wed Sep 03 1997 15:20:40 GMT+0100',
//         'Wed Sep 03 1997 15:40:30 GMT+0100',
//         'Wed Sep 03 1997 15:40:40 GMT+0100',
//         'Wed Sep 03 1997 16:00:30 GMT+0100',
//         'Wed Sep 03 1997 16:00:40 GMT+0100',
//         'Wed Sep 03 1997 16:20:30 GMT+0100',
//         'Wed Sep 03 1997 16:20:40 GMT+0100',
//         'Wed Sep 03 1997 16:40:30 GMT+0100',
//         'Wed Sep 03 1997 16:40:40 GMT+0100',
//       ]
//
//       expect(occurances).to.deep.equal(expected)
//     })
//   })
//
//
//   describe(`
//     RRULE:FREQ=DAILY;INTERVAL=2
//   `, function () {
//     it('Recur every other day - for 5 occurances', function () {
      let rrule = new irrule({
        freq: 'daily',
        interval: 2,
        count: 50,
        byMonth: [0,1]
      })

      let occurances = rrule.all('1997-09-02T09:00:00.000')

      console.log('occurances', occurances)
//       let expected = [
//         "Tue Sep 02 1997 09:00:00 GMT+0100",
//         "Wed Sep 03 1997 09:00:00 GMT+0100",
//         "Thu Sep 04 1997 09:00:00 GMT+0100",
//         "Fri Sep 05 1997 09:00:00 GMT+0100",
//         "Sat Sep 06 1997 09:00:00 GMT+0100"
//       ]
//
//       expect(occurances).to.deep.equal(expected)
//     })
//   })
// })
