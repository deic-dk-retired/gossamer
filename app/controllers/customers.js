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
    this.buttonico = 'save'
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
      Ember.$('.card').removeClass('active')
      Ember.$('.togDisabled').addClass('disabled')
    },

    saveCustomer () {
      if (this.get('act') === 'Edit') {
        this.send('updateCustomer')
      }
    },

    toggleActive (set, toSet) {
      if (set !== toSet) {
        Ember.$('.card').removeClass('active')
        Ember.$('.co-' + toSet).addClass('active')
        Ember.$('.togDisabled').removeClass('disabled')
      }
    },

    showCustomer (cid, cvr) {
      let co = this.get('store').peekRecord('customer', cid)

      this.send('toggleActive', this.get('cvr'), cvr)

      this.setProperties({
        coid: parseInt(cid),
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
      Ember.Logger.info('update customer ' + this.get('coname'))
    },

    addNetwork (cid, ...params) {
      let network = this.get('store').createRecord('network', {
        customerid: parseInt(cid),
        name: params[0],
        kind: params[1],
        net: params[2],
        description: params[3]
      })

      network.save()
    },

    removeNetwork (netid) {
      this.get('store').findRecord('network', netid, { backgroundReload: false }).then(function (network) {
        network.destroyRecord()
      })
    }

  }
})
