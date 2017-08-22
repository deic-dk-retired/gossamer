import DS from 'ember-data'

export default DS.Model.extend({
  customerid: DS.attr('number'),
  companyname: DS.attr('string'),
  kind: DS.attr('string'),
  name: DS.attr('string'),
  phone: DS.attr('string'),
  username: DS.attr('string'),
  password: DS.attr('string'),
  email: DS.attr('string'),
  lastlogin: DS.attr('date'),
  lastpasswordchange: DS.attr('date')
})
