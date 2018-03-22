import ApplicationSerializer from './application'

export default ApplicationSerializer.extend({
  serialize () {
    let json = this._super(...arguments)
    json = {
      netuuid: json.data.attributes.netuuid,
      couuid: json.data.attributes.couuid,
      coid: json.data.attributes.customerid,
      netname: json.data.attributes.name,
      netkind: json.data.attributes.kind,
      netaddr: json.data.attributes.net,
      netdesc: json.data.attributes.description
    }
    return json
  }
})
