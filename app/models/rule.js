import Ember from 'ember'
import DS from 'ember-data'
import moment from 'moment'
// import { buildValidations, validator } from 'ember-cp-validations'

// const Validations = buildValidations(
//   {
//     ipprotocol: {
//       description: 'Protocol',
//       validators: [
//         validator('presence', true)
//       ]
//     },
//     srcprefix: {
//       description: 'Source Host/CIDR',
//       validators: [
//         validator('presence', true),
//         validator('format', {
//           regex: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b|\/\d{1,2}\b/,
//           message:
//             '{description} must be a valid cidr or ip address'
//         })
//       ]
//     },
//     destprefix: {
//       description: 'Destination Host/CIDR',
//       validators: [
//         validator('presence', true),
//         validator('format', {
//           regex: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b|\/\d{1,2}\b/,
//           message:
//             '{description} must be a valid cidr or ip address'
//         })
//       ]
//     },
//     destport: {
//       description: 'Destination Port',
//       validators: [
//         validator('presence', true)
//       ]
//     }
//   },
//   {
//     debounce: 500
//   }
// )

export default DS.Model.extend({
  ruleuuid: DS.attr('string'),
  couuid: DS.attr('string'),
  userid: DS.attr('string'),
  fmnuuid: DS.attr('string', {readonly: true}),
  rname: DS.attr('string', {readonly: true}),
  direct: DS.attr('string', {readonly: true}),
  validfrom: DS.attr(),
  validto: DS.attr(),
  duration: DS.attr({readonly: true}),
  isactive: DS.attr({readonly: true}),
  isexpired: DS.attr({readonly: true}),
  srcprefix: DS.attr('string'),
  srcport: DS.attr('string'),
  destprefix: DS.attr('string'),
  destport: DS.attr('string'),
  ipprotocol: DS.attr('string'),
  icmptype: DS.attr('string'),
  icmpcode: DS.attr('string'),
  tcpflags: DS.attr('string'),
  pktlen: DS.attr('string'),
  description: DS.attr('string'),
  fragenc: DS.attr('string'),
  action: DS.attr('string'),

  totdur: Ember.computed('validfrom', 'validto', function () {
    let b = parseInt(moment(this.get('validfrom')).format('x'))
    let a = parseInt(moment(this.get('validto')).format('x'))
    let tot = moment(a).diff(b)
    return `${tot}`
  })
})
