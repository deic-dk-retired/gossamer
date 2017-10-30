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
  username: '',
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
        isDisabled: 'disabled',
        changePass: 'disabled',
        isActive: false
      })
      Ember.$('.card').removeClass('blue')
      Ember.$('.togDisabled').addClass('disabled')
      // remove edit screen
      // if (Ember.$('.editcard').length > 0) {
      //   Ember.$('.editcard').remove()
      // }
    },

    toggleActive (set, toSet) {
      if (set !== toSet) {
        Ember.$('.card').removeClass('blue')
        Ember.$('.usr-' + toSet).addClass('blue')
        Ember.$('.togDisabled').removeClass('disabled')
        // enter edit screen
        // if (Ember.$('.editcard').length === 0) {
        //   Ember.$('.pusher')
        //     .parent()
        //     .prepend('<div class="editcard"></div>')
        //   Ember.$('.editcard')
        //    .append(`<button class="ui animated fade button grey" type="reset" {{action resetForm}}>
        //   <div class="visible content">Cancel</div>
        //   <div class="hidden content"><i class="cancel icon"></i></div>
        // </button>`)
        //   Ember.$('.editcard').addClass('show')
        // }
      }
    },

    openModal (name) {
      Ember.$('.ui.' + name + '.modal').modal('show')
    },

    showUser (uid, username) {
      let user = this.get('store').peekRecord('user', uid)
      let customer = this.get('store').peekRecord('customer', parseInt(user.get('customerid')))
      this.send('toggleActive', this.get('username'), username)
      this.setProperties({
        userid: parseInt(user.get('id')),
        kind: user.get('kind'),
        customerid: parseInt(customer.get('id')),
        companyname: customer.get('companyname'),
        netnames: user.get('networks').get('content.relationship.members.list'),
        name: user.get('name'),
        firstname: user.get('firstname'),
        username: username
      })
    },

    saveUser () {
      if (this.get('act') === 'Save') {
        this.send('updateUser')
      }
    },

    deactivateUser (uid) {
      let self = this
      this.get('store').findRecord('user', parseInt(uid))
      .then(function (user) {
        Ember.Logger.info(user.changedAttributes())
        user.set('valid', 'inactive')
        user.save()
        .then((response) => {
          self.set('responseMessage', `User ${response.get('store').peekRecord('user', response.get('id')).get('firstname')} was deactivated`)
          Ember.Logger.info(self.get('responseMessage'))
        })
        .catch((adapterError) => {
          Ember.Logger.info(user.get('errors'))
          Ember.Logger.info(user.get('errors.name'))
          Ember.Logger.info(user.get('errors').toArray())
          Ember.Logger.info(user.get('isValid'))
          Ember.Logger.info(adapterError)
        })
      })
    },

    activateUser (uid) {
      let self = this
      this.get('store').findRecord('user', parseInt(uid))
      .then(function (user) {
        Ember.Logger.info(user.changedAttributes())
        user.set('valid', 'active')
        user.save()
        .then((response) => {
          self.set('responseMessage', `User ${response.get('store').peekRecord('user', response.get('id')).get('firstname')} was activated`)
          Ember.Logger.info(self.get('responseMessage'))
        })
        .catch((adapterError) => {
          Ember.Logger.info(user.get('errors'))
          Ember.Logger.info(user.get('errors.name'))
          Ember.Logger.info(user.get('errors').toArray())
          Ember.Logger.info(user.get('isValid'))
          Ember.Logger.info(adapterError)
        })
      })
    },

    updateUser () {
      let uid = this.get('userid')
      let kind = this.get('kind')
      let cuid = this.get('customerid')
      let couuid = this.get('store').peekRecord('customer', parseInt(cuid)).get('couuid')
      let nets = this.get('netids')

      Ember.Logger.info(nets)

      let self = this

      this.get('store').findRecord('user', parseInt(uid))
      .then(function (user) {
        user.set('customerid', parseInt(cuid))
        user.set('couuid', couuid)
        user.set('kind', kind)

        user.set('nets', nets)

        Ember.Logger.info(user.changedAttributes())
        user.save()
        .then((response) => {
          self.set('responseMessage', `User ${response.get('store').peekRecord('user', response.get('id')).get('firstname')} was updated`)
        })
        .catch((adapterError) => {
          Ember.Logger.info(user.get('errors'))
          Ember.Logger.info(user.get('errors.name'))
          Ember.Logger.info(user.get('errors').toArray())
          Ember.Logger.info(user.get('isValid'))
          Ember.Logger.info(adapterError)
        })
      })

      // delete all networks for this user and
      // create nnew etwork records using netids
    }

  }

})
