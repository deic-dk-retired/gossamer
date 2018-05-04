import DS from 'ember-data'

export default DS.Model.extend({
  fnmid: DS.attr('number', {readonly: true}),
  couuid: DS.attr('string', {readonly: true}),
  coid: DS.attr('string', {readonly: true}),
  netlist: DS.attr('string', {readonly: true}),
  hostname: DS.attr('string', {readonly: true}),
  procintraffic: DS.attr('string', {readonly: true}),
  procouttraffic: DS.attr('string', {readonly: true}),
  status: DS.attr('string', {readonly: true})
})
