import Ember from 'ember'

export function formatPhone (params/*, hash */) {
  if (params[0].length > 4) {
    return params[0].substr(0, 4) + ' - ' + params[0].substr(4)
  } else {
    return params[0]
  }
}

export default Ember.Helper.helper(formatPhone)
