import DS from 'ember-data'

export default DS.RESTAdapter.extend({
  host: 'http://10.33.1.97:4242',
  namespace: 'api'
})
