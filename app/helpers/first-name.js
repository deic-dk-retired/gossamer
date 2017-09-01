import Ember from 'ember'

export function firstName ([value, ...rest]/*, hash */) {
  return value.split(' ')[0]
}

export default Ember.Helper.helper(firstName)
