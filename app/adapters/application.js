import DS from 'ember-data'

export default DS.JSONAPIAdapter.extend({
  host: 'http://10.33.1.97:4242',
  namespace: 'api',
  headers: {
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
