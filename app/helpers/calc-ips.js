import Ember from 'ember'
import cidr from 'npm:cidr-range'
import { formatPrefix } from 'd3'

export function calcIps (params/*, hash */) {
  let f = formatPrefix(',.1', 1e3)
  let l = cidr(params[0]).length
  return l > 999 ? f(l) : l
}

export default Ember.Helper.helper(calcIps)
