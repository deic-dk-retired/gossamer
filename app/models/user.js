import DS from 'ember-data'

export default DS.Model.extend({
  custid: DS.attr('number'),
  accessType: DS.attr('string'),
  name: DS.attr('string'),
  username: DS.attr('string')
})
