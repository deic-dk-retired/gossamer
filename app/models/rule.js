import DS from 'ember-data'

export default DS.Model.extend({
  custid: DS.attr('number'),
  rname: DS.attr('string'),
  adminid: DS.attr('number'),
  direct: DS.attr('string'),
  validfrom: DS.attr('date'),
  validto: DS.attr('date'),
  duration: {
    years: DS.attr('number'),
    months: DS.attr('number'),
    days: DS.attr('number'),
    hours: DS.attr('number'),
    minutes: DS.attr('number'),
    seconds: DS.attr('number')
  },
  fmnId: DS.attr('number'),
  isActive: DS.attr('boolean'),
  isExpired: DS.attr('boolean'),
  destprefix: DS.attr('string'),
  srcprefix: DS.attr('string'),
  ipprotocol: DS.attr('string'),
  destport: DS.attr('string'),
  srcportt: DS.attr('string'),
  pktlen: DS.attr('number'),
  action: DS.attr('string')
})
