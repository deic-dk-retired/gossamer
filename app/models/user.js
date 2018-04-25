import Ember from 'ember'
import DS from 'ember-data'

export default DS.Model.extend({
  // useruuid: DS.attr('string'),
  couuid: DS.attr('string'),
  customerid: DS.attr('number'),
  companyname: DS.attr('string', {readonly: true}),
  kind: DS.attr('string'),
  name: DS.attr('string', {readonly: true}),
  phone: DS.attr('string', {readonly: true}),
  username: DS.attr('string', {readonly: true}),
  email: DS.attr('string', {readonly: true}),
  lastlogin: DS.attr('date', {readonly: true}),
  lastpasswordchange: DS.attr('date', {readonly: true}),
  valid: DS.attr('string'),
  usrnets: DS.attr(),

  firstname: Ember.computed('name', function () {
    let fn = this.get('name').split(' ')[0]
    fn = fn.replace(fn.charAt(0), fn.charAt(0).toUpperCase())
    return `${fn}`
  })
})
