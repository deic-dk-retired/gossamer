import ApplicationSerializer from './application'

export default ApplicationSerializer.extend({
  serialize () {
    let json = this._super(...arguments)
    json = {
      ruleuuid: json.data.attributes.ruleuuid,
      couuid: json.data.attributes.couuid,
      userid: json.data.attributes.userid,
      fmnuuid: json.data.attributes.fmnuuid,
      validfrom: json.data.attributes.validfrom,
      validto: json.data.attributes.validto,
      isactive: json.data.attributes.isactive,
      isexpired: json.data.attributes.isexpired,
      destip: json.data.attributes.destprefix,
      destport: json.data.attributes.destport,
      protocol: json.data.attributes.ipprotocol,
      icmptype: json.data.attributes.icmptype,
      icmpcode: json.data.attributes.icmpcode,
      tcpflags: json.data.attributes.tcpflags,
      pktlen: json.data.attributes.pktlen,
      fragenc: json.data.attributes.fragenc,
      description: json.data.attributes.description,
      action: json.data.attributes.action
    }
    return json
  }
})
