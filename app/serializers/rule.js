import ApplicationSerializer from './application'

export default ApplicationSerializer.extend({
  serialize (snapshot, options) {
    let json = this._super(...arguments)
    json = {
      ruleuuid: json.data.attributes.ruleuuid,
      couuid: json.data.attributes.couuid,
      useruuid: json.data.attributes.useruuid,
      fmnuuid: json.data.attributes.fmnuuid,
      rname: json.data.attributes.rname,
      direct: json.data.attributes.direct,
      validfrom: json.data.attributes.validfrom,
      validto: json.data.attributes.validto,
      isactive: json.data.attributes.isactive,
      isexpired: json.data.attributes.isexpired,
      destprefix: json.data.attributes.destprefix,
      srcprefix: json.data.attributes.srcprefix,
      ipprotocol: json.data.attributes.ipprotocol,
      destport: json.data.attributes.destport,
      srcportt: json.data.attributes.srcportt,
      pktlen: json.data.attributes.pktlen,
      action: json.data.attributes.action
    }
    return json
  }
})
