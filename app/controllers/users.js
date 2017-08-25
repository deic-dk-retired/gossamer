import Ember from 'ember'
// import Cryptojs from '/node_modules/crypto-js'

export default Ember.Controller.extend({
  id: null,
  kind: '',
  customerid: null,
  companyname: '',
  name: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  act: 'Add',
  buttonico: 'add user',
  isDisabled: '',
  changePass: '',
  isActive: false,
  isData: true,
  datavalue: 'data-value',

  init () {
    this._super(...arguments)
    this.errors = []
  },

  actions: {
    required (event) {
      if (!event.target.value) {
        this.get('errors').pushObject({message: `${event.target.name} is required`})
      }
    },

    resetForm () {
      this.setProperties({
        id: null,
        kind: '',
        customerid: null,
        companyname: '',
        name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        act: 'Add',
        buttonico: 'add user',
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
      this.set('act', 'Edit')
      this.set('buttonico', 'edit')
    },

    showUser (id, username, customerid, companyname, kind, name, email, phone) {
      this.send('toggleActive', this.get('username'), username)
      this.send('toEdit')
      this.setProperties({
        id: id,
        kind: kind,
        customerid: customerid,
        companyname: this.get('store').peekRecord('customer', customerid).get('companyname'),
        name: name,
        username: username,
        email: email,
        phone: phone
      })
    },

    // called from template
    saveUser () {
      // post to create
      if (this.get('act') === 'Add') {
        this.set('isDisabled', '')
        this.send('createUser')
      }
      // patch to update
      if (this.get('act') === 'Edit') {
        this.send('updateUser')
      }
    },

    updateUser () {
      // console.log('update')
      var id = this.get('id')
      var kind = this.get('kind')
      var customerid = this.get('customerid')
      var companyname = this.get('store').peekRecord('customer', customerid).get('companyname')
      var name = this.get('name')
      var email = this.get('email')
      var phone = this.get('phone')
      var username = this.get('username')
      var password = this.get('password')

      this.get('store').findRecord('user', id)
      .then(function (user) {
        user.set('customerid', customerid)
        user.set('companyname', companyname)
        user.set('kind', kind)
        user.set('name', name)
        user.set('phone', phone)
        user.set('email', email)
        user.set('username', username)
        user.set('password', password)
        console.log(user.changedAttributes())
        user.save()
      })
    },

    createUser () {
      var id = this.get('id')
      var kind = this.get('kind')
      var customerid = this.get('customerid')
      var companyname = this.get('store').peekRecord('customer', customerid).get('companyname')
      var name = this.get('name')
      var email = this.get('email')
      var phone = this.get('phone')
      var username = this.get('username')
      var password = this.get('password')

      console.log(kind)
      console.log(customerid)
      console.log(companyname)
      console.log(name)
      console.log(phone)
      console.log(email)
      console.log(username)
      console.log(password)

      let user = this.get('store').createRecord('user', {
        id: id,
        kind: kind,
        customerid: customerid,
        companyname: companyname,
        name: name,
        username: username,
        email: email,
        phone: phone,
        password: password
      })

      user.validate()
      .then(({ validations }) => {
        if (validations.get('isValid')) {
          user.save()
        }
      })
      user.save()
    }
  }

})
