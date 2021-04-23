import { getOptions } from './utils.js'

export default {
  data: () => {
    return {
      value: [],
      selected: '',
      options: []
    }
  },
  computed: {
    availableOptions () {
      return this.$data.options.filter(opt => {
        return this.value.indexOf(opt.value) === -1
      })
    }
  },
  async created () {
    const v = this.$props.data[this.$props.config.name]
    this.$data.value = v ? v.split(',') : []
    this.$data.options = await getOptions(this.$props.config)
  },
  props: ['config', 'disabled', 'data'],
  methods: {
    selectedOptions (tags) {
      return this.$data.options.filter(opt => {
        return this.value.indexOf(opt.value) >= 0
      })
    },
    onRemoveTag: function (tag, removeTag) {
      removeTag(tag.value)
    },
    onOptionClick: function (option, addTag) {
      addTag(option)
      this.$data.selected = ''
    }
  },
  watch: {
    value (newValue, oldValue) {
      this.$props.data[this.$props.config.name] = newValue.join(',')
    }
  },
  template: `
<validation-provider v-bind:rules="config.rules" v-slot="{ errors }">
  <b-form-group
    :state="errors.length === 0"
    :label="config.label"
    :invalid-feedback="errors[0]"
  >
    <b-form-tags v-model="value" size="lg" class="mb-2" add-on-change no-outer-focus>

      <template v-slot="{ tags, addTag, removeTag, disabled }">
        <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
          <li v-for="tag in selectedOptions(tags)" :key="tag.value" class="list-inline-item">
            <b-form-tag
              @remove="onRemoveTag(tag, removeTag)"
              :title="tag.value"
              :disabled="disabled"
            >{{ tag.text }}</b-form-tag>
          </li>
        </ul>

        <b-form-select
          @change="(value) => onOptionClick(value, addTag)"
          :disabled="disabled || availableOptions.length === 0"
          :options="availableOptions"
          v-model="selected"
        >
          <template #first>
            <option disabled value="">{{ config.placeholder || 'Choose a tag...' }}</option>
          </template>
        </b-form-select>
      </template>

    </b-form-tags>

  </b-form-group>
</validation-provider>
  `
}
