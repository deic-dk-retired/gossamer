import Ember from 'ember'

export function formatPhone (params/*, hash */) {
  let formatted = ''
  if (params[0] !== null && params[0].length > 4) {
    formatted = params[0].substr(0, 4) + ' - ' + params[0].substr(4)
  } else {
    formatted = params[0]
  }
  return formatted
}

export default Ember.Helper.helper(formatPhone)
