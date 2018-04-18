import Ember from 'ember'

export default Ember.Component.extend({
  // session: Ember.inject.service('session'),
  tagName: '',
  someList: [
    {
      title: 'discard',
      url: 'rules/19954',
      description: '0c:c4:7a:31:7c:c2'
    },
    {
      title: 'discard',
      url: 'http://10.33.1.97:4242/api/rules/19953',
      description: '0c:c4:7a:31:7c:c2'
    }
  ],

  isHide: true,

  actions: {
    togglesidebar () {
      this.toggleProperty('isHide')
      Ember.$('.toc')
      Ember.Logger.info('show')
    },

    invalidateSession () {
      let session = this.get('session')
      if (session.get('isAuthenticated')) {
        session.invalidate()
      }
    }
  }
})
