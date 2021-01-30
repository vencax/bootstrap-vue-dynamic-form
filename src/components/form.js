/* global Vue, axios, API, _, moment */
import texti from './input/text.js'
import template from './form.html.js'

export default {
  
  components: {
    'mytextinput': texti
  },
  props: ['config', 'data'],
  methods: {
    handleSubmit () { alert('ahj') }
  },
  template
}
