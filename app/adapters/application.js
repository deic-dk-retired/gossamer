import DS from 'ember-data'

export default DS.JSONAPIAdapter.extend({
  host: 'http://10.33.1.97:4242',
  namespace: 'api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    // 'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE'
    // 'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override'
  }

  // serialize (snapshot) {
  //   const json = this._super(...arguments)
  //   const changedAttributes = snapshot.changedAttributes()
  //   snapshot.eachAttribute((name, meta) => {
  //     const record = snapshot.record

  //     const isChanged = !!changedAttributes[name] ||
  //       (record.get('isNew') && record.get(name) === meta.options.defaultValue)

  //     if (!isChanged || meta.options.readOnly) {
  //       const key = this.keyForAttribute(name)
  //       delete json.data.attributes[key]
  //     }
  //   })

  //   if (json.data.relationships) {
  //     snapshot.eachRelationship((name, meta) => {
  //       if (meta.options.readOnly) {
  //         const key = this.keyForAttribute(name)
  //         delete json.data.relationships[key]
  //       }
  //     })
  //   }

  //   return json
  // }
})
