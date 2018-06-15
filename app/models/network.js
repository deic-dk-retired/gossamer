import DS from 'ember-data'
export default DS.Model.extend({
  netuuid: DS.attr('string'),
  couuid: DS.attr('string'),
  customerid: DS.attr('number'),
  name: DS.attr('string'),
  kind: DS.attr('string'),
  net: DS.attr(),
  description: DS.attr('string'),
  customer: DS.belongsTo('customer'),
  user: DS.belongsTo('user')
})
