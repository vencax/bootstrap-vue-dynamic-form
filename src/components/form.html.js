export default `
<ValidationObserver v-slot="{ invalid }">
  <form @submit.prevent="handleSubmit">

    <div v-for="i in config.form" v-bind:key="i.name">
      <mytextinput :config="i" :data="data">
      </mytextinput>
    </div>

    <b-button type="submit" class="mt-3" block :disabled="invalid">
      Save
    </b-button>
  </form>
</ValidationObserver>
`