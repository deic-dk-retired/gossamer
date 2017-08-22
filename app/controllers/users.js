import Ember from 'ember'

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

  init () {
    this._super(...arguments)

    this.errors = []
    // this.userid = null
    // this.kind = ''
    // this.customerid = null
    // this.customer = ''
    // this.name = ''
    // this.username = ''
    // this.email = ''
    // this.phone = ''
    // this.password = ''
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

    // setAccess (cid) {
    //   this.set('customerid', cid)
    // },

    showUser (id, username, customerid, companyname, kind, name, email, phone) {
      this.setProperties({
        id: id,
        kind: kind,
        customerid: customerid,
        companyname: companyname,
        name: name,
        username: username,
        email: email,
        phone: phone
      })
    },

    updateUser () {
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
        // console.log(user.get('customerid'))
        // console.log(user.get('kind'))
        // console.log(user.get('name'))
        // console.log(user.get('phone'))
        // console.log(user.get('email'))
        // console.log(user.get('username'))
        // console.log(user.get('password'))
        user.set('customerid', customerid)
        user.set('kind', kind)
        user.set('name', name)
        user.set('phone', phone)
        user.set('email', email)
        user.set('username', username)
        user.set('password', password)
        user.save()
        // console.log(id)
        // console.log(kind)
        // console.log(customerid)
        // console.log(name)
        // console.log(email)
        // console.log(phone)
        // console.log(username)
        // console.log(password)
      })
    },

    createUser () {
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
