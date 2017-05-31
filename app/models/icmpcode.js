import DS from 'ember-data'

export default DS.Model.extend({
  typeid: DS.belongsTo('icmptype'),
  value: DS.attr('string')
})
