import Ember from 'ember'
// import Cryptojs from '/node_modules/crypto-js'

export default Ember.Controller.extend({
  userid: null,
  kind: '',
  customerid: null,
  companyname: '',
  netnames: '',
  name: '',
  // username: '',
  // email: '',
  // phone: '',
  password: '',
  // act: 'Add',
  // buttonico: 'add user',
  isDisabled: '',
  changePass: '',
  isActive: false,
  isData: true,
  datavalue: 'data-value',

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
        userid: null,
        kind: '',
        customerid: null,
        companyname: '',
        netnames: '',
        name: '',
        // username: '',
        // email: '',
        // phone: '',
        password: '',
        // act: 'Add',
        // buttonico: 'add user',
        isDisabled: '',
        changePass: '',
        isActive: false
      })
      Ember.$('.card').removeClass('active')
    },

    toggleActive (set, toSet) {
      if (set !== toSet) {
        Ember.$('.card').removeClass('active')
        Ember.$('.usr-' + toSet).addClass('active')
      }
      if (set === toSet) {
        Ember.$('.card').removeClass('active')
      }
    },

    toEdit () {
      this.set('isDisabled', 'disabled')
      this.set('changePass', 'disabled')
      // this.set('act', 'Edit')
      // this.set('buttonico', 'edit')
    },

    showUser (id, username, customerid, companyname, kind, name, email, phone) {
      this.send('toggleActive', this.get('username'), username)
      this.send('toEdit')
      this.setProperties({
        userid: id,
        kind: kind,
        customerid: customerid,
        companyname: this.get('store').peekRecord('customer', customerid).get('companyname'),
        netnames: [24, 26],
        name: name
        // username: username,
        // email: email,
        // phone: phone
      })
    },

    // called from template
    saveUser () {
      // post to create

      // patch to update
      if (this.get('act') === 'Edit') {
        this.send('updateUser')
      }
    },

    updateUser () {
      // console.log('update')
      var userid = this.get('userid')
      var kind = this.get('kind')
      var customerid = this.get('customerid')
      var companyname = this.get('store').peekRecord('customer', customerid).get('companyname')
      // var name = this.get('name')
      // var email = this.get('email')
      // var phone = this.get('phone')
      // var username = this.get('username')
      var password = this.get('password')

      this.get('store').findRecord('user', userid)
      .then(function (user) {
        // console.log("user.get('customerid'): " + user.get('customerid'))
        // console.log(customerid)
        user.set('customerid', customerid)
        user.set('companyname', companyname)
        user.set('kind', kind)
        // user.set('name', name)
        // user.set('phone', phone)
        // user.set('email', email)
        // user.set('username', username)
        user.set('password', password)
        console.log(user.changedAttributes())
        user.save()
      })
    }

  }

})
