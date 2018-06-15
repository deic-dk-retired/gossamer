import Ember from 'ember'
import * as nc from 'npm:node-cidr'
import { formatPrefix } from 'd3'

export function calcIps (params/*, hash */) {
  let f = formatPrefix(',.1', 1e3)
  let l = nc.default.cidr.ips(params[0]).length
  return l > 999 ? f(l) : l
}

export default Ember.Helper.helper(calcIps)
