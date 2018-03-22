import ApplicationSerializer from './application'

export default ApplicationSerializer.extend({
  serialize () {
    let json = this._super(...arguments)
    json = {
      couuid: json.data.attributes.couuid,
      coname: json.data.attributes.companyname,
      coadd1: json.data.attributes.companyadr1,
      coadd2: json.data.attributes.companyadr2,
      coadd3: json.data.attributes.companyadr3,
      coadd4: json.data.attributes.companyadr4,
      coaccname: json.data.attributes.accountantname,
      coaccemail: json.data.attributes.accountantemail,
      coaccphone: json.data.attributes.accountantphone,
      coaccrate: json.data.attributes.hourlyrate,
      subfee: json.data.attributes.subscriptionfee,
      discount: json.data.attributes.deductionpct,
      coemail: json.data.attributes.mainmail,
      cophopne: json.data.attributes.mainphone,
      coweb: json.data.attributes.mainurl,
      cocvr: json.data.attributes.cvr,
      coean: json.data.attributes.ean,
      codesc: json.data.attributes.description
    }
    return json
  }
})
