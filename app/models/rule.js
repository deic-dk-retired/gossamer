import DS from 'ember-data'

export default DS.Model.extend({
  custid: DS.attr('number'),
  rname: DS.attr('string'),
  adminid: DS.attr('number'),
  direct: DS.attr('string'),
  validfrom: DS.attr('date'),
  validto: DS.attr('date'),
  duration: DS.attr(),
  fmnid: DS.attr('number'),
  isactive: DS.attr('boolean'),
  isexpired: DS.attr('boolean'),
  destprefix: DS.attr('string'),
  srcprefix: DS.attr('string'),
  ipprotocol: DS.attr('string'),
  destport: DS.attr('string'),
  srcportt: DS.attr('string'),
  pktlen: DS.attr('string'),
  action: DS.attr('string')
})
