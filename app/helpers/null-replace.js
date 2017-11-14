import Ember from 'ember'

export function nullReplace (params/*, hash */) {
  let fill = params[0]
  if (params[0] === null) {
    fill = '...'
  }
  return fill
}

export default Ember.Helper.helper(nullReplace)
