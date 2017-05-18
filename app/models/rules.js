import DS from 'ember-data'

export default DS.Model.extend({
  admname: DS.attr('string'),
  rulename: DS.attr('string'),
  protocol: DS.attr('string'),
  fromdate: DS.attr('date'),
  minfromtime: DS.attr('date'),
  todate: DS.attr('date'),
  maxtotime: DS.attr('date'),
  srcprefix: DS.attr('string'),
  destprefix: DS.attr('string'),
  action: DS.attr('string'),
  portsaff: DS.attr('number'),
  maxpktlength: DS.attr('number'),
  totduration: {
    years: DS.attr('number'),
    months: DS.attr('number'),
    days: DS.attr('number'),
    hours: DS.attr('number'),
    minutes: DS.attr('number'),
    seconds: DS.attr('number')
  },
  isactive: DS.attr('boolean'),
  isexpired: DS.attr('boolean')
})
