
export async function getOptions (config) {
  if (_.isString(config.options)) {
    const req = await axios.get(config.options)
    const attrmap = config.attrmap || {}
    return _.map(req.data, i => {
      return {
        value: i[attrmap.value || 'value'].toString(),
        text: i[attrmap.text || 'text']
      }
    })
  } else {
    return config.options
  }
}