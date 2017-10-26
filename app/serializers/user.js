import ApplicationSerializer from './application'

export default ApplicationSerializer.extend({
  serialize (snapshot, options) {
    let json = this._super(...arguments)
    json = {
      useruuid: json.data.attributes.useruuid,
      couuid: json.data.attributes.couuid,
      coid: json.data.attributes.customerid,
      kind: json.data.attributes.kind,
      valid: json.data.attributes.valid
    }
    return json
  }
})
