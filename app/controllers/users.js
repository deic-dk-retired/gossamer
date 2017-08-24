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
  isActive: false,

  init () {
    this._super(...arguments)

    this.errors = []
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
    //   isDisabled: '',
    //   isActive: false
    // })
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
        companyname: null,
        name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        act: 'Add',
        buttonico: 'add user',
        isDisabled: '',
        isActive: false
      })
      Ember.$('.card').removeClass('active')
    },

    showUser (id, username, customerid, companyname, kind, name, email, phone) {
      // console.log(this.get('username'))
      // console.log(username)
      if (this.get('username') !== username) {
        Ember.$('.card').removeClass('active')
        Ember.$('.usr-' + username).addClass('active')
      }
      if (this.get('username') === username) {
        Ember.$('.card').removeClass('active')
      }
      this.set('isDisabled', 'disabled')
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

    lookupCustomer (coname) {
      // console.log(coname)
      var co = [
        {
          id: 0,
          name: 'DeiC'
        },
        {
          id: 1,
          name: 'Statens Arkiver'
        },
        {
          id: 2,
          name: 'It\'s learning'
        },
        {
          id: 3,
          name: 'CERT'
        },
        {
          id: 5,
          name: 'i2'
        }
      ]
      var cid
      co.map(function (e) {
        if (e.name.toLowerCase() === coname.toLowerCase()) {
          cid = e.id
        }
      })
      return cid
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
        // console.log("user.get('customerid'): " + user.get('customerid'))
        // console.log(customerid)
        user.set('customerid', customerid)
        user.set('kind', kind)
        user.set('name', name)
        user.set('phone', phone)
        user.set('email', email)
        user.set('username', username)
        user.set('password', password)
        user.changedAttributes()
        user.save()
      })
    },

    createUser () {
      // console.log(this.get('kind'))
      // console.log(this.send('lookupCustomer', this.get('customerid')))
      // console.log(this.get('name'))
      // console.log(this.get('phone'))
      // console.log(this.get('email'))
      // console.log(this.get('username'))
      // console.log(this.get('password'))
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
