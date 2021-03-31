export default {
  data: () => {
    return {
      date: null,
      time: false,
      datetime: null
    }
  },
  props: ['config', 'disabled', 'data'],
  created () {
    const m = moment(this.$props.data[this.$props.config.name])
    const valid = m.isValid()
    this.$data.datetime = valid ? m : moment()
    this.$data.date = valid ? m.format("YYYY-MM-DD") : null
    this.$data.time = valid ? m.format("HH:mm") : null
  },
  methods: {
    onTime(val) {
      const parts = val.split(':')
      this.$data.datetime.set('hour', parts[0])
      this.$data.datetime.set('minute', parts[1])
      this.$data.datetime.set('second', parts[2])
      this.$props.data[this.$props.config.name] = this.$data.datetime.toISOString()
    },
    onDate(val) {
      const parts = val.split('-')
      this.$data.datetime.set('year', parts[0])
      this.$data.datetime.set('month', Number(parts[1]) - 1)
      this.$data.datetime.set('date', parts[2])
      this.$props.data[this.$props.config.name] = this.$data.datetime.toISOString()
    }
  },
  template: `
<validation-provider v-bind:rules="config.rules" v-slot="{ errors }">
  <b-form-group
    :state="errors.length === 0"
    :label="config.label"
    :invalid-feedback="errors[0]"
  >
    <div class="row">

      <div class="col-sm-6">

        <b-form-datepicker
          v-model="date"
          @input="onDate"
          :state="errors.length === 0"
          :options="config.options"
          :disabled="disabled">
        </b-form-datepicker>

      </div>

      <div class="col-sm-6">

        <b-form-timepicker
          v-model="time"
          :locale="config.locale || 'cs'"
          @input="onTime"
          :state="errors.length === 0"
          :disabled="disabled">
        </b-form-timepicker>

      </div>
    </div>
  </b-form-group>
</validation-provider>
  `
}
