import DS from 'ember-data'

export default DS.Model.extend({
  custid: DS.attr(),
  accessType: DS.attr(),
  name: DS.attr(),
  username: DS.attr()
})
