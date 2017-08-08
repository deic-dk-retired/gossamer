import Ember from 'ember'

export function formatPorts ([value, ...rest]) {
  return value.replace(/={1,}/g, '')
}

export default Ember.Helper.helper(formatPorts)
