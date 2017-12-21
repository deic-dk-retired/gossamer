import Ember from 'ember'
import Base from 'ember-simple-auth/authenticators/base'

const { RSVP: { Promise }, $: { ajax }, run } = Ember

export default Base.extend({
  serverTokenEndpoint: 'http://10.33.1.97:4242/api/auth',
  user: null,
  pwd: null,

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
    // Ember.Logger.info(creds)
    this.user = creds.username
    this.pwd = creds.password

    const requestOptions = {
      url: this.serverTokenEndpoint,
      method: 'POST',
      type: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        'username': this.get('user'),
        'password': this.get('pwd')
      })
    }

    return new Promise((resolve, reject) => {
      // Ember.Logger.info(requestOptions)
      ajax(requestOptions).then((res) => {
        Ember.Logger.info(res)
        const { jwt } = res
        // Wrapping aync operation in Ember.run
        run(() => {
          resolve({
            token: jwt,
            uid: res.data[0].id,
            uuid: res.data[0].attributes.useruuid,
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
