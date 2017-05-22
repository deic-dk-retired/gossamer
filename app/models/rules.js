import DS from 'ember-data'

export default DS.Model.extend({
  admname: DS.attr(),
  rulename: DS.attr(),
  protocol: DS.attr(),
  fromdate: DS.attr(),
  minfromtime: DS.attr(),
  todate: DS.attr(),
  maxtotime: DS.attr(),
  srcprefix: DS.attr(),
  destprefix: DS.attr(),
  action: DS.attr(),
  portsaff: DS.attr(),
  maxpktlength: DS.attr(),
  totduration: {
    years: DS.attr(),
    months: DS.attr(),
    days: DS.attr(),
    hours: DS.attr(),
    minutes: DS.attr(),
    seconds: DS.attr()
  },
  isactive: DS.attr(),
  isexpired: DS.attr()
})
