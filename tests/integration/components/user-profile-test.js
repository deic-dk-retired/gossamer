import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

const profile = {
  companyname: 'DeiC',
  couuid: 'f561067e-10e3-44ed-ab12-9caed904d8d9',
  customerid: 0,
  email: 'fastnetmon-dev@deic.dk',
  kind: 'globaladmin',
  lastlogin: 'Wed May 09 2018 09:02:17 GMT+0200 (CEST)',
  lastpasswordchange: 'Fri Apr 21 2017 13:23:58 GMT+0200 (CEST)',
  name: 'Fastnetmon Developer',
  phone: '35888233',
  username: 'fastnetmon-dev',
  usrnets: [25, 26, 27, 28, 29],
  valid: 'active'
}

moduleForComponent('user-profile', 'Integration | Component | user profile', {
  integration: true
})

test('it renders last login label', function (assert) {
  this.set('u', profile)
  this.render(hbs`{{user-profile u=u}}`)
  assert.equal(this.$().text().trim().split(/\n/)[0].slice(0, 6), 'global')
})
