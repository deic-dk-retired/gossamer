import DS from 'ember-data'

export default DS.Model.extend({
  custid: DS.attr('number'),
  customer: DS.attr('string'),
  accesstype: DS.attr('string'),
  name: DS.attr('string'),
  username: DS.attr('string'),
  lastloggedin: DS.attr('date'),
  pwdlastchangedon: DS.attr('date')
})
