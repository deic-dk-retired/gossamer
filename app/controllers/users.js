import Ember from 'ember'
// import Cryptojs from '/node_modules/crypto-js'

export default Ember.Controller.extend({
  userid: null,
  kind: '',
  customerid: null,
  companyname: '',
  netnames: [],
  netids: Ember.computed('netnames', function () {
    var netarr = this.get('netnames')
    var ids = []
    if (netarr.length !== 0) {
      ids = netarr.map((e) => { return parseInt(e.id) })
    }
    if (netarr.length === 0) {
      ids = []
    }
    return ids
  }),
  name: '',
  firstname: Ember.computed('name', function () {
    return `${this.get('name').split(' ')[0]}`
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

    showUser (uid, username, customerid, companyname, kind, name) {
      this.send('toggleActive', this.get('username'), username)
      this.setProperties({
        userid: uid,
        kind: kind,
        customerid: customerid,
        companyname: this.get('store').peekRecord('customer', customerid).get('companyname'),
        netnames: this.get('store').peekRecord('user', uid).get('networks').get('content.relationship.members.list'),
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
      var userid = this.get('userid')
      var kind = this.get('kind')
      var customerid = this.get('customerid')
      var companyname = this.get('store').peekRecord('customer', customerid).get('companyname')
      var password = this.get('password')

      this.get('store').findRecord('user', userid)
      .then(function (user) {
        user.set('customerid', customerid)
        user.set('companyname', companyname)
        user.set('kind', kind)
        user.set('password', password)
        console.info(user.changedAttributes())
        user.save()
        .then((response) => {
          this.set('responseMessage', `User ${response.get('id').name} was updated`)
        })
        .catch((adapterError) => {
          console.info(user.get('errors'))
          console.info(user.get('errors.name'))
          console.info(user.get('errors').toArray())
          console.info(user.get('isValid'))
          console.info(adapterError)
        })
      })
    }

  }

})
