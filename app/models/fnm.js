import DS from 'ember-data'

export default DS.Model.extend({
  fnmid: DS.attr('number', {readonly: true}),
  couuid: DS.attr('string', {readonly: true}),
  coid: DS.attr('string', {readonly: true})
})
