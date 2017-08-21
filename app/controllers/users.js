import Ember from 'ember'

export default Ember.Controller.extend({
  userid: null,
  kind: '',
  customerid: null,
  customer: '',
  name: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  pre_checked: true,

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

    showUser (id, username, custid, customer, accesstype, name, email, phone) {
      this.setProperties({
        userid: id,
        kind: accesstype,
        customerid: custid,
        customer: customer,
        name: name,
        username: username,
        email: email,
        phone: phone
      })
    },

    updateUser () {
      var userid = this.get('userid')
      var kind = this.get('kind')
      var customerid = this.get('customerid')
      var name = this.get('name')
      var email = this.get('email')
      var phone = this.get('phone')
      var password = this.get('password')
      this.get('store').findRecord('user', userid)
      .then(function (user) {
        user.set('custid', customerid)
        user.set('accesstype', kind)
        user.set('name', name)
        user.set('phone', phone)
        user.set('email', email)
        user.set('password', password)
        user.save()
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
