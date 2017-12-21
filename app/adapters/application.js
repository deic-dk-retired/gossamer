import DS from 'ember-data'
import config from '../config/environment'
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin'

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  host: `${config.APP.HOST}`,
  namespace: `${config.APP.API}`,
  headers: {
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  authorizer: 'authorizer:jwt'

})
