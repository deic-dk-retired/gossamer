import DS from 'ember-data'

export default DS.Model.extend({
  status: DS.attr(),
  data: DS.attr(),
  size: DS.attr(),
  message: DS.attr()
})
