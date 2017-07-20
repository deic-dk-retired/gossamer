import DS from 'ember-data'

export default DS.Model.extend({
  custid: DS.attr('number'),
  rname: DS.attr('string'),
  adminid: DS.attr('number'),
  direct: DS.attr('string'),
  validfrom: DS.attr('date'),
  validto: DS.attr('date'),
  duration: DS.attr(),
  fmnId: DS.attr('number'),
  isActive: DS.attr('boolean'),
  isExpired: DS.attr('boolean'),
  destprefix: DS.attr('string'),
  srcprefix: DS.attr('string'),
  ipprotocol: DS.attr('string'),
  destport: DS.attr('string'),
  srcportt: DS.attr('string'),
  pktlen: DS.attr('string'),
  action: DS.attr('string'),
  meta: DS.attr()
})
