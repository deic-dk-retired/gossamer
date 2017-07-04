import DS from 'ember-data'

export default DS.Model.extend({
  flag: DS.attr('string'),
  desc: DS.attr('string')
})
