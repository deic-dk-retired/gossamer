import DS from 'ember-data'

export default DS.JSONAPISerializer.extend({
  serialize (snapshot, options) {
    let json = this._super(...arguments)
    json = {
      coid: json.data.attributes.customerid,
      coname: json.data.attributes.name,
      cokind: json.data.attributes.kind,
      conet: json.data.attributes.net,
      codesc: json.data.attributes.description
    }
    return json
  }
})
