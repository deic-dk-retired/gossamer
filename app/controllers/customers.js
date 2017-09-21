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
    this.act = 'Edit'
    this.buttonico = 'edit'
  },

  actions: {
    required (event) {
      if (!event.target.value) {
        this.get('errors').pushObject({message: `${event.target.name} is required`})
      }
    },

    resetForm () {
      this.setProperties({
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
        isDisabled: 'disabled',
        isActive: false
      })
      Ember.$('.item').removeClass('active')
      Ember.$('.togDisabled').addClass('disabled')
    },

    saveCustomer () {
      if (this.get('act') === 'Save') {
        this.send('updateCustomer')
      }
    },

    toggleActive (set, toSet) {
      if (set !== toSet) {
        Ember.$('.item').removeClass('active')
        Ember.$('.co-' + toSet).addClass('active')
        Ember.$('.togDisabled').removeClass('disabled')
      }
    },

    showCustomer (coid, cvr) {
      let co = this.get('store').peekRecord('customer', coid)

      this.send('toggleActive', this.get('cvr'), cvr)

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
    },

    updateCustomer () {

    }

  }
})
