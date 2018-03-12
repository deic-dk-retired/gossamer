import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin'
import config from '../config/environment'
import DS from 'ember-data'

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  host: `${config.APP.HOST + ':' + config.APP.PORT}`,
  namespace: `${config.APP.API}`,
  headers: {
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/json'
  },
  authorizer: 'authorizer:jwt'

})
