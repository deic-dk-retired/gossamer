import ApplicationSerializer from './application'

export default ApplicationSerializer.extend({
  serialize () {
    let json = this._super(...arguments)
    json = {
      couuid: json.data.attributes.couuid,
      coid: json.data.attributes.customerid,
      kind: json.data.attributes.kind,
      valid: json.data.attributes.valid,
      netids: json.data.attributes.usrnets
    }
    return json
  }
})
