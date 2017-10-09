import DS from 'ember-data'

export default DS.JSONAPISerializer.extend({
  serialize (snapshot, options) {
    let json = this._super(...arguments)
    json = {
      coid: json.data.attributes.customerid,
      netname: json.data.attributes.name,
      netkind: json.data.attributes.kind,
      netaddr: json.data.attributes.net,
      netdesc: json.data.attributes.description
    }
    return json
  }
})
