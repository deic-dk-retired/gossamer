import Ember from 'ember'
// import Cryptojs from '/node_modules/crypto-js'

export default Ember.Controller.extend({
  id: null,
  kind: '',
  customerid: null,
  companyname: null,
  name: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  act: 'Add',
  buttonico: 'add user',
  isDisabled: '',
  // isActive: '',

  init () {
    this._super(...arguments)

    this.errors = []
  },

  // didUpdateAttrs () {
  //   this._super(...arguments)
  //   this.set('errors', [])
  // },

  actions: {
    required (event) {
      if (!event.target.value) {
        this.get('errors').pushObject({message: `${event.target.name} is required`})
      }
    },

    reset () {
      // this.setProperties({
      //   id: null,
      //   kind: '',
      //   customerid: null,
      //   companyname: null,
      //   name: '',
      //   username: '',
      //   email: '',
      //   phone: '',
      //   password: '',
      //   act: 'Add',
      //   buttonico: 'add user',
      //   isDisabled: ''
      // })
    },

    showUser (id, username, customerid, companyname, kind, name, email, phone) {
      // this.set('isDisabled', 'disabled')
      this.set('act', 'Edit')
      this.set('buttonico', 'edit')
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

    saveUser () {
      if (this.get('act') === 'Add') {
        this.set('isDisabled', '')
        this.send('createUser')
      }
      if (this.get('act') === 'Edit') {
        this.send('updateUser')
      }
    },

    updateUser () {
      // console.log('update')
      var id = this.get('id')
      var kind = this.get('kind')
      var customerid = this.get('customerid')
      var name = this.get('name')
      var email = this.get('email')
      var phone = this.get('phone')
      var username = this.get('username')
      var password = this.get('password')

      this.get('store').findRecord('user', id)
      .then(function (user) {
        console.log(user.get('id'))
        console.log(user.get('kind'))
        console.log(user.get('customerid'))
        console.log(user.get('companyname'))
        console.log(user.get('name'))
        console.log(user.get('phone'))
        console.log(user.get('email'))
        console.log(user.get('username'))
        console.log(user.get('password'))
        user.set('customerid', customerid)
        user.set('kind', kind)
        user.set('name', name)
        user.set('phone', phone)
        user.set('email', email)
        user.set('username', username)
        user.set('password', password)
        user.save()
        console.log(id)
        console.log(kind)
        console.log(customerid)
        console.log(name)
        console.log(email)
        console.log(phone)
        console.log(username)
        console.log(password)
      })
    },

    createUser () {
      console.log(this.get('kind'))
      console.log(this.get('customerid'))
      console.log(this.get('name'))
      console.log(this.get('phone'))
      console.log(this.get('email'))
      console.log(this.get('username'))
      console.log(this.get('password'))
      let user = this.get('store').createRecord('user', {
        kind: this.get('kind'),
        customerid: this.get('customerid'),
        name: this.get('name'),
        username: this.get('username'),
        email: this.get('email'),
        phone: this.get('phone'),
        password: this.get('password')
      })
      user.save()
    }
  }

})
