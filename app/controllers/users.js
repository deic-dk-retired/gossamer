import Ember from 'ember'

export default Ember.Controller.extend({
  kind: '',
  customerid: null,
  name: '',
  username: '',
  email: '',
  phone: '',
  password: '',
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

    showUser (id, username, custid, accesstype, name, email, phone) {
      this.setProperties({
        kind: accesstype,
        customerid: custid,
        name: name,
        username: username,
        email: email,
        phone: phone
      })
    },

    saveUser (user) {
      console.log(user)
    },

    createUser () {
      // store.createRecord('user', {

      // })
    }
  }

})
