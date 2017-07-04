import DS from 'ember-data'

export default DS.Model.extend({
  type: DS.attr('string'),
  codeid: DS.attr('number'),
  code: DS.attr('string')
})
