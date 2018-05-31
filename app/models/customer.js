import DS from 'ember-data'

export default DS.Model.extend({
  couuid: DS.attr('string'),
  companyname: DS.attr('string'),
  companyadr1: DS.attr('string'),
  companyadr2: DS.attr('string'),
  companyadr3: DS.attr('string'),
  companyadr4: DS.attr('string'),
  accountantname: DS.attr('string'),
  accountantemail: DS.attr('string'),
  accountantphone: DS.attr('string'),
  hourlyrate: DS.attr('string'),
  subscriptionfee: DS.attr('string'),
  deductionpct: DS.attr('string'),
  mainmail: DS.attr('string'),
  mainphone: DS.attr('string'),
  mainurl: DS.attr('string'),
  cvr: DS.attr('string'),
  ean: DS.attr('string'),
  valid: DS.attr('boolean'),
  description: DS.attr('string'),
  conets: DS.attr(),
  networks: DS.hasMany('network')
})
