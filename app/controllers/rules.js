import Ember from 'ember'

export default Ember.Controller.extend({
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
      Ember.Logger.info(rid)
      let rule = this.get('store').peekRecord('rule', rid)
      this.send('toggleActive', this.get('rid'), rid)
      this.setProperties({
        rid: parseInt(rid),
        fnm: rule.get('fnmid'),
        coid: rule.get('custid'),
        rname: rule.get('rname'),
        uid: rule.get('adminid'),
        way: rule.get('direct'),
        active: rule.get('isactive'),
        expired: rule.get('isexpired'),
        proto: rule.get('ipprotocol'),
        action: rule.get('action')
      })
    }

  }
})
