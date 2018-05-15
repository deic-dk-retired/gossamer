import Ember from 'ember'

export function isUserNetwork (params/*, hash */) {
  let isUserNet = false
  if (params[0].indexOf(parseInt(params[1])) !== -1) {
    isUserNet = true
  }
  return isUserNet
}

export default Ember.Helper.helper(isUserNetwork)
