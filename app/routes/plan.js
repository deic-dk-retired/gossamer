import Ember from 'ember'
import RSVP from 'rsvp'

export default Ember.Route.extend({
  model () {
    return RSVP.hash({
      icmptypes: this.get('store').findAll('icmptype'),
      icmpcodes: this.get('store').findAll('icmpcode')
    })
  }
})
