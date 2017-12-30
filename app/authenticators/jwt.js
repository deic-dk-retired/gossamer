import Ember from 'ember'
import crptojs from 'npm:crypto-json'
import config from '../config/environment'
import Base from 'ember-simple-auth/authenticators/base'

const { RSVP: { Promise }, $: { ajax }, run } = Ember

export default Base.extend({
  serverTokenEndpoint: `${config.APP.HOST + '/' + config.APP.API + '/auth'}`,
  user: null,
  pwd: null,
  crypto: null,
  // creds: null,
  scpw: `${config.APP.SCPSS}`,

  restore (data) {
    return new Promise((res, rej) => {
      if (!Ember.isEmpty(data.token)) {
        res(data)
      } else {
        rej()
      }
    })
  },

  authenticate (creds) {
    this.user = creds.username
    this.pwd = creds.password

    let idObj = {
      un: this.get('user'),
      ke: this.get('pwd')
    }

    this.crypto = crptojs.encrypt(idObj, this.get('scpw'), {
      algorithm: 'aes256',
      encoding: 'hex'
    })

    const requestOptions = {
      url: this.serverTokenEndpoint,
      method: 'POST',
      type: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(this.crypto)
    }

    return new Promise((resolve, reject) => {
      ajax(requestOptions)
      .then((res) => {
        const { jwt } = res
        // Wrapping aync operation in Ember.run
        run(() => {
          resolve({
            token: jwt,
            uid: res.data[0].id,
            uuid: res.data[0].attributes.useruuid,
            uname: res.data[0].attributes.username,
            ualias: res.data[0].attributes.useralias,
            role: res.data[0].attributes.usrtype,
            client: res.data[0].attributes.clnt
          })
        })
      }, (error) => {
        // Wrapping aync operation in Ember.run
        run(() => {
          reject(error)
        })
      })
    })
  },

  invalidate (data) {
    return Promise.resolve(data)
  }
})
