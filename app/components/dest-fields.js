import Ember from 'ember'
import { default as nc } from 'npm:node-cidr'

export default Ember.Component.extend({
  tagName: '',

  // userNetworksPopup: Ember.computed('usrNetworks', function () {
  //   let p = `<div class="ui small header">Assigned Networks</div>
  //     <div class="ui relaxed list">`
  //   let un = this.get('usrNetworks')
  //   un.forEach((e) => {
  //     p += `<div class="item">
  //             <i class="fork icon"></i>
  //             <div class="content">
  //               <div class="header">
  //                 ${e}
  //               </div>
  //             </div>
  //           </div>`
  //   })
  //   return p
  // }),

  didReceiveAttrs () {
    // Ember.Logger.info('check all fields')
    // this.validateDestInfo()
    // this.get('validDestFields') ? this.set('validated', true) : this.set('validated', false)
  },

  actions: {
    validatePrefix (prxinp) {
      this.sendAction('validatePrefix', prxinp)
    },
    validatePort (portid) {
      this.sendAction('validatePort', portid)
    }
  }
})
