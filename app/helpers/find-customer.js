import Ember from 'ember'

export function findCustomer ([value, ...rest]) {
  var co = [
    {
      id: 0,
      name: 'DeiC'
    },
    {
      id: 1,
      name: 'Statens Arkiver'
    },
    {
      id: 2,
      name: 'It\'s learning'
    },
    {
      id: 3,
      name: 'CERT'
    },
    {
      id: 5,
      name: 'i2'
    }
  ]
  var cid
  co.map(function (e) {
    if (e.name.toLowerCase() === value.toLowerCase()) {
      cid = e.id
    }
  })
  return cid
}

export default Ember.Helper.helper(findCustomer)
