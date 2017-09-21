import Ember from 'ember'
// import Cryptojs from '/node_modules/crypto-js'

export default Ember.Controller.extend({
  userid: null,
  kind: '',
  customerid: null,
  companyname: '',
  netnames: [],
  netids: Ember.computed('netnames', function () {
    if (this.get('netnames').length !== 0) {
      return this.get('netnames').map((e) => { return parseInt(e.id) }).map((e) => { return parseInt(e) })
    }
    if (this.get('netnames').length === 0) {
      return []
    }
  }),
  name: '',
  firstname: Ember.computed('name', function () {
    return `${this.get('name').split(' ')[0]}`
  }),
  phone: '',
  uphone: Ember.computed('phone', function () {
    if (this.get('phone').length > 4) {
      return `${this.get('phone').substr(0, 4) + '-' + this.get('phone').substr(4)}`
    } else {
      return `${this.get('phone')}`
    }
  }),
  username: '',
  password: '',
  isDisabled: 'disabled',
  changePass: 'disabled',
  isActive: false,
  isData: true,
  datavalue: 'data-value',
  responseMessage: '',

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
        netnames: [],
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
    },

    showUser (uid, username) {
      var user = this.get('store').peekRecord('user', uid)
      var customer = this.get('store').peekRecord('customer', parseInt(user.get('customerid')))
      this.send('toggleActive', this.get('username'), username)
      this.setProperties({
        userid: parseInt(user.get('id')),
        kind: user.get('kind'),
        customerid: parseInt(customer.get('id')),
        companyname: customer.get('companyname'),
        netnames: user.get('networks').get('content.relationship.members.list'),
        name: user.get('name'),
        phone: user.get('phone'),
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
      let uid = this.get('userid')
      let kind = this.get('kind')
      let cuid = this.get('customerid')
      let coname = this.get('store').peekRecord('customer', parseInt(cuid)).get('companyname')
      let pwd = this.get('password')

      this.get('store').findRecord('user', parseInt(uid))
      .then(function (user) {
        user.set('customerid', parseInt(cuid))
        user.set('companyname', coname)
        user.set('kind', kind)
        user.set('password', pwd)
        Ember.Logger.info(user.changedAttributes())
        user.save()
        .then((response) => {
          this.set('responseMessage', `User ${response.get('id').name} was updated`)
        })
        .catch((adapterError) => {
          Ember.Logger.info(user.get('errors'))
          Ember.Logger.info(user.get('errors.name'))
          Ember.Logger.info(user.get('errors').toArray())
          Ember.Logger.info(user.get('isValid'))
          Ember.Logger.info(adapterError)
        })
      })
    }

  }

})
