import Ember from 'ember'

export default Ember.Route.extend({
  redirect () {
    const url = this.router.location.formatURL('/not-found')
    if (window.location.pathname !== url) {
      this.transitionTo('/not-found')
    }
  }
})
