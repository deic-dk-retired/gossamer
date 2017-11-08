import Ember from 'ember'

export default Ember.Controller.extend({
  notifications: Ember.inject.service('notification-messages'),

  queryParams: ['page'],
  page: 1,

  rid: null,
  fnm: null,
  coid: null,
  rname: null,
  uid: null,
  way: '',
  active: null,
  expired: null,
  proto: '',
  action: '',

  pre_checked: true,

  checkLabel: Ember.computed('pre_checked', function () {
    if (this.get('pre_checked')) {
      return `${'Realtime Off'}`
    } else {
      return `${'Refreshing...'}`
    }
  }),

  init () {
    this._super(...arguments)
    this.errors = []
    this.act = 'Save'
    this.buttonico = 'save'
    this.page = 1
    this.filter = 8
  },

  actions: {
    fetchMore () {
      this.set('page', this.get('page') + 1)
    },

    required (event) {
      if (!event.target.value) {
        this.get('errors').pushObject({message: `${event.target.name} is required`})
      }
    },

    toggleActive (set, toSet) {
      if (set !== toSet) {
        Ember.$('.card').removeClass('active')
        Ember.$('.rule-' + toSet).addClass('active')
        Ember.$('.togDisabled').removeClass('disabled')
      }
    },

    showRule (rid) {
      let rule = this.get('store').peekRecord('rule', rid)
      this.send('toggleActive', this.get('rid'), rid)
      this.setProperties({

      })
    },

    updateRule (rid) {
      let ruleuuid = this.get('store').peekRecord('rule', parseInt(rid)).get('ruleuuid')
      this.get('store').findRecord('rule', parseInt(rid))
      .then(function (rule) {
        rule.set('isexpired', true)
        rule.set('isactive', false)
        if (rule.get('hasDirtyAttributes')) {
          Ember.Logger.info(rule.changedAttributes())
          rule.save()
          .then((response) => {
            this.set('responseMessage', `Rule ${response.get('store').peekRecord('rule', response.get('id')).get('ruleuuid')} was cleared`)
            Ember.Logger.info(this.get('responseMessage'))

            this.get('notifications').clearAll()
            this.get('notifications').info('Rule ' + ruleuuid.substr(0, ruleuuid.indexOf('-')) + ' was cleared!', {
              autoClear: true,
              clearDuration: 8000
            })
          })
          .catch((adapterError) => {
            Ember.Logger.info(rule.get('errors'))
            Ember.Logger.info(rule.get('errors.name'))
            Ember.Logger.info(rule.get('errors').toArray())
            Ember.Logger.info(rule.get('isValid'))
            Ember.Logger.info(adapterError)
          })
        }
      }.bind(this))
    }

  }
})
