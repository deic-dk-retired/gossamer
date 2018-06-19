import Ember from 'ember'

export default Ember.Component.extend({
  tagName: '',
  didInsertElement () {
    Ember.$('#destip').keyup(function (e) {
      (e.key === '.') ? Ember.Logger.info(e.key) : null
      // if keyed in . start verifying ips
      // find matching network and first 200 ips
      // 130.xxx.xxx.xxx/4
      // 130.255.xxx.xxx/
    })
    Ember.$('#destip').blur(function () {
      Ember.Logger.info('check cidr validity')
      Ember.Logger.info('check network validity')
    })
  }
})
