import DS from 'ember-data'

export default DS.Model.extend({
  rname: DS.attr('string'),
  admname: DS.attr('string'),
  protocol: DS.attr('string'),
  fromdate: DS.attr('string'),
  formatted_frmdate: DS.attr('date'),
  maxfromtime: '12:03:50',
  todate: DS.attr('string'),
  sourcepre: DS.attr('string'),
  destpre: DS.attr('string'),
  count: DS.attr('number'),
  maxpktlen: DS.attr('number'),
  active: DS.attr('boolean'),
  totduration: {
    years: DS.attr('number'),
    months: DS.attr('number'),
    days: DS.attr('number'),
    hours: DS.attr('number'),
    minutes: DS.attr('number'),
    seconds: DS.attr('number')
  }
})
