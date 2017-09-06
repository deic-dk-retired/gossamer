import DS from 'ember-data'

export default DS.Model.extend({
  customerid: DS.attr('number'),
  name: DS.attr('string'),
  kind: DS.attr('string'),
  net: DS.attr('string'),
  description: DS.attr('string'),
  customer: DS.belongsTo('customer', {async: true})
})
