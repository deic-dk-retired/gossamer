import Ember from 'ember'
// import Cryptojs from '/node_modules/crypto-js'

export default Ember.Controller.extend({
  userid: null,
  kind: '',
  customerid: null,
  companyname: '',
  netnames: '',
  name: '',
  username: '',
  password: '',
  isDisabled: 'disabled',
  changePass: 'disabled',
  isActive: false,
  isData: true,
  datavalue: 'data-value',

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

    resetForm () {
      this.setProperties({
        userid: null,
        kind: '',
        customerid: null,
        companyname: '',
        networkid: null,
        netnames: '',
        name: '',
        username: '',
        password: '',
        isDisabled: 'disabled',
        changePass: 'disabled',
        isActive: false
      })
      Ember.$('.card').removeClass('active')
      Ember.$('.togDisabled').addClass('disabled')
    },

    toggleActive (set, toSet) {
      if (set !== toSet) {
        Ember.$('.card').removeClass('active')
        Ember.$('.usr-' + toSet).addClass('active')
        Ember.$('.togDisabled').removeClass('disabled')
      }
      if (set === toSet) {
        // this.send('resetForm')
        // Ember.$('.card').removeClass('active')
      }
    },

    toEdit () {
      // this.set('isDisabled', '')
      // this.set('changePass', 'disabled')
    },

    // list network ids and names based on customerid
    findNetworks (netid, custid) {

    },

    showUser (id, username, customerid, companyname, kind, name, email, phone) {
      this.send('toggleActive', this.get('username'), username)
      this.setProperties({
        userid: id,
        kind: kind,
        customerid: customerid,
        companyname: this.get('store').peekRecord('customer', customerid).get('companyname'),
        networkid: null,
        netnames: '', // ['n1', 'n2', ...]
        name: name,
        username: username
      })
    },

    // called from template
    saveUser () {
      // patch to update
      if (this.get('act') === 'Save') {
        this.send('updateUser')
      }
    },

    updateUser () {
      // console.log('update')
      var userid = this.get('userid')
      var kind = this.get('kind')
      var customerid = this.get('customerid')
      var companyname = this.get('store').peekRecord('customer', customerid).get('companyname')
      var password = this.get('password')

      this.get('store').findRecord('user', userid)
      .then(function (user) {
        // console.log("user.get('customerid'): " + user.get('customerid'))
        // console.log(customerid)
        user.set('customerid', customerid)
        user.set('companyname', companyname)
        user.set('kind', kind)

        user.set('password', password)
        console.log(user.changedAttributes())
        user.save()
      })
    }

  }

})
