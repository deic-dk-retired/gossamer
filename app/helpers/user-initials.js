import Ember from 'ember'

export function userInitials (params/*, hash */) {
  let inits = params[0].split(' ').map((e) => e.slice(0, 1)).join('')
  return inits.length > 2 ? inits.slice(0, 2).toUpperCase() : inits.toUpperCase()
}

export default Ember.Helper.helper(userInitials)
