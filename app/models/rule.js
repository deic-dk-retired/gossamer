import Ember from 'ember'
import DS from 'ember-data'
import moment from 'moment'

export default DS.Model.extend({
  ruleuuid: DS.attr('string'),
  couuid: DS.attr('string'),
  userid: DS.attr('string'),
  fmnuuid: DS.attr('string'),
  rname: DS.attr('string', {readonly: true}),
  direct: DS.attr('string', {readonly: true}),
  validfrom: DS.attr(),
  validto: DS.attr(),
  duration: DS.attr({readonly: true}),
  isactive: DS.attr({readonly: true}),
  isexpired: DS.attr({readonly: true}),
  destprefix: DS.attr('string'),
  srcprefix: DS.attr('string', {readonly: true}),
  ipprotocol: DS.attr('string'),

  icmptype: DS.attr('string'),
  icmpcode: DS.attr('string'),
  tcpflags: DS.attr('string'),

  destport: DS.attr('string'),
  srcport: DS.attr('string', {readonly: true}),
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
