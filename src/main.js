/* global Vue, VueMarkdown, VeeValidate, VeeValidateRules */
import './vuecustoms.js'
import store from './store.js'
import C from './components/form.js'

Vue.use(VueMarkdown)
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)
Vue.component('ValidationProvider', VeeValidate.ValidationProvider)
Vue.component('ValidationObserver', VeeValidate.ValidationObserver)

VeeValidate.extend('required', VeeValidateRules.required)

new Vue({
  store,
  components: { mycomponent: C },
  template: `
  <mycomponent></mycomponent>
  `
}).$mount('#app')
