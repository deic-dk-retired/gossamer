import DS from 'ember-data'

export default DS.Model.extend({
  custid: DS.attr('string'),
  adminid: DS.attr('string'),
  fmnid: DS.attr('string'),
  rname: DS.attr('string'),
  direct: DS.attr('string'),
  validfrom: DS.attr('date'),
  validto: DS.attr('date'),
  duration: DS.attr(),
  isactive: DS.attr(),
  isexpired: DS.attr(),
  destprefix: DS.attr('string'),
  srcprefix: DS.attr('string'),
  ipprotocol: DS.attr('string'),
  destport: DS.attr('string'),
  srcportt: DS.attr('string'),
  pktlen: DS.attr('string'),
  action: DS.attr('string')
})
