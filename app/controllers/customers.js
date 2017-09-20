import Ember from 'ember'

export default Ember.Controller.extend({
  coid: null,
  coname: '',
  add1: '',
  add2: '',
  add3: '',
  add4: '',
  coemail: '',
  cophone: '',
  cocvr: '',
  coean: '',
  accname: '',
  accemail: '',
  accphone: '',
  accrate: null,
  fee: null,
  discount: null,

  act: 'Edit',
  isDisabled: 'disabled',
  changePass: 'disabled',
  isActive: false,
  isData: true,
  datavalue: 'data-value',
  responseMessage: '',

  init () {
    this._super(...arguments)
    this.errors = []
    this.act = 'Save'
    this.buttonico = 'save'
  },

  actions: {
    required (event) {
      if (!event.target.value) {
        this.get('errors').pushObject({message: `${event.target.name} is required`})
      }
    },

    showCustomer (coid) {
      var co = this.get('store').peekRecord('customer', coid)
      this.setProperties({
        coname: co.get('companyname'),
        add1: co.get('companyadr1'),
        add2: co.get('companyadr2'),
        add3: co.get('companyadr3'),
        add4: co.get('companyadr4'),
        coemail: co.get('mainmail'),
        cophone: co.get('mainphone'),
        cocvr: co.get('cvr'),
        coean: co.get('ean'),
        accname: co.get('accountantname'),
        accemail: co.get('accountantemail'),
        accphone: co.get('accountantphone'),
        accrate: co.get('hourlyrate'),
        fee: co.get('subscriptionfeee'),
        discount: co.get('deductionpct')
      })
    }
  }
})
