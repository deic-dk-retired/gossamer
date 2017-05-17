import DS from 'ember-data'

export default DS.Model.extend({
  flowspecruleid: DS.attr('number'),
  rule_name: DS.attr('string'),
  administratorid: DS.attr('number'),
  direction: DS.attr('string'),
  validfrom: DS.attr('date'),
  validto: DS.attr('date'),
  fastnetmoninstanceid: DS.attr('number'),
  isactivated: DS.attr('boolean'),
  isexpired: DS.attr('boolean'),
  destinationprefix: DS.attr('string'),
  sourceprefix: DS.attr('string'),
  ipprotocol: DS.attr('string'),
  srcordestport: DS.attr('string'),
  destinationport: DS.attr('string'),
  sourceport: DS.attr('number'),
  icmptype: DS.attr('string'),
  icmpcode: DS.attr('number'),
  tcpflags: DS.attr('string'),
  packetlength: DS.attr('number'),
  dscp: DS.attr('string'),
  fragmentencoding: DS.attr('string'),
  description: DS.attr('string'),
  customerid: DS.attr('number'),
  action: DS.attr('string')
})
