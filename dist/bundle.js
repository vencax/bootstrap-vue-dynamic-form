var BSVueDynamicForm = (function () {
  'use strict';

  var text = {
    props: ['config', 'disabled', 'data'],
    template: `
<validation-provider v-bind:rules="config.rules" v-slot="{ errors }">
  <b-form-group
    :state="errors.length === 0"
    :label="config.label"
    :invalid-feedback="errors[0]"
  >
    <b-form-input
      :type="config.inputtype || 'text'"
      :value="data[config.name]"
      @input="v => data[config.name] = v"
      :state="errors.length === 0"
      :disabled="disabled">
    </b-form-input>
  </b-form-group>
</validation-provider>
  `
  };

  async function getOptions (config) {
    if (_.isString(config.options)) {
      const req = await axios.get(config.options);
      const attrmap = config.attrmap || {};
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

  var select = {
    data: () => {
      return {
        options: []
      }
    },
    async created () {
      this.$data.options = await getOptions(this.$props.config);
    },
    props: ['config', 'disabled', 'data'],
    template: `
<validation-provider v-bind:rules="config.rules" v-slot="{ errors }">
  <b-form-group 
    :state="errors.length === 0"
    :label="config.label"
    :invalid-feedback="errors[0]"
  >

    <b-form-select 
      :value="data[config.name]"
      @input="v => data[config.name] = v"
      :state="errors.length === 0" 
      :options="$data.options" 
      :disabled="disabled">
    </b-form-select>

  </b-form-group>
</validation-provider>
  `
  };

  var textarea = {
    props: ['config', 'disabled', 'data'],
    template: `
<validation-provider v-bind:rules="config.rules" v-slot="{ errors }">
  <b-form-group 
    :state="errors.length === 0" 
    :label="config.label"
    :invalid-feedback="errors[0]"
  >
    <b-form-textarea 
      :rows="config.rows || 5"
      :value="data[config.name]"
      @input="v => data[config.name] = v"
      :state="errors.length === 0" 
      :disabled="disabled">
    </b-form-textarea>
  </b-form-group>
</validation-provider>
  `
  };

  var datetime = {
    data: () => {
      return {
        date: null,
        time: false,
        datetime: null
      }
    },
    props: ['config', 'disabled', 'data'],
    created () {
      const m = moment(this.$props.data[this.$props.config.name]);
      const valid = m.isValid();
      this.$data.datetime = valid ? m : moment();
      this.$data.date = valid ? m.format("YYYY-MM-DD") : null;
      this.$data.time = valid ? m.format("HH:mm") : null;
    },
    methods: {
      onTime(val) {
        const parts = val.split(':');
        this.$data.datetime.set('hour', parts[0]);
        this.$data.datetime.set('minute', parts[1]);
        this.$data.datetime.set('second', parts[2]);
        this.$props.data[this.$props.config.name] = this.$data.datetime.toISOString();
      },
      onDate(val) {
        const parts = val.split('-');
        this.$data.datetime.set('year', parts[0]);
        this.$data.datetime.set('month', Number(parts[1]) - 1);
        this.$data.datetime.set('date', parts[2]);
        this.$props.data[this.$props.config.name] = this.$data.datetime.toISOString();
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
  };

  const m = 'Jméno souboru obsahuje diakritiku. Přejmenujete jej a vyberte znovu.';
  VeeValidate.extend('filenameWithoutDiacritics', {
    getMessage: field => m,
    validate: value => {
      const m = value.name.match(/[\w.-]+/g);
      return m && m.length > 0 && m[0] === value.name
    }
  });

  var file = {
    async created () {
      this.$props.config.rules = this.$props.config.rules
        ? this.$props.config.rules + '|filenameWithoutDiacritics'
        : 'filenameWithoutDiacritics';
    },
    computed: {
      m: () => m
    },
    props: ['config', 'disabled', 'data'],
    template: `
<validation-provider :name="config.name" :rules="config.rules" v-slot="{ valid, errors }">
  <b-form-group
    :label="config.label"
    :invalid-feedback="m"
  >
    <b-form-file
      :value="data[config.name]"
      @input="v => data[config.name] = v"
      :state="errors[0] ? false : (valid ? true : null)"
      :disabled="disabled"
      :placeholder="config.placeholder || 'Choose a file or drop it here...'"
    ></b-form-file>

  </b-form-group>
</validation-provider>
  `
  };

  var tags = {
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
      const v = this.$props.data[this.$props.config.name];
      this.$data.value = v ? v.split(',') : [];
      this.$data.options = await getOptions(this.$props.config);
    },
    props: ['config', 'disabled', 'data'],
    methods: {
      selectedOptions (tags) {
        return this.$data.options.filter(opt => {
          return this.value.indexOf(opt.value) >= 0
        })
      },
      onRemoveTag: function (tag, removeTag) {
        removeTag(tag.value);
      },
      onOptionClick: function (option, addTag) {
        addTag(option);
        this.$data.selected = '';
      }
    },
    watch: {
      value (newValue, oldValue) {
        this.$props.data[this.$props.config.name] = newValue.join(',');
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
  };

  var components = {
    'dyn-input': text,
    'dyn-select': select,
    'dyn-textarea': textarea,
    'dyn-datetime': datetime,
    'dyn-fileinput': file,
    'dyn-taginput': tags
  };

  var listForm = {
    data: () => {
      return {
        item: {}
      }
    },
    props: ['config', 'onSubmit', 'original'],
    created () {
      this.$props.original && Object.assign(this.$data.item, this.$props.original);
    },
    methods: {
      cancel () {
        this.$props.onSubmit(null);
      },
      save () {
        this.$props.onSubmit(this.$data.item);
      }
    },
    components: components,
    template: `
    <ValidationObserver v-slot="{ invalid }">
      <fieldset style="padding: 2em;">
        <form @submit.prevent="handleSubmit">
          <component v-for="i in config" :key="i.name" :is="i.component"
            :config="i" :data="item">
          </component>
        </form>
        <b-button-group>
          <b-button variant="primary" @click="save()" :disabled="invalid">save</b-button>
          <b-button variant="secondary" @click="cancel()">cancel</b-button>
        </b-button-group>
      </fieldset>
    </ValidationObserver>
  `
  };

  const defaultRowComponent = {
    props: ['row'],
    template: '<span>{{ row }}</span>'
  };

  var listeditor = {
    data: () => {
      return {
        original: null,
        visible: false
      }
    },
    props: ['config', 'disabled', 'data'],
    methods: {
      edit (item) {
        this.$data.original = item;
        this.$data.visible = true;
      },
      remove (item) {
        const data = this.$props.data[this.$props.config.name];
        const idx = data.indexOf(item);
        data.splice(idx, 1);
      },
      onSubmit (newdata) {
        this.$data.visible = false;
        if (!newdata) return
        if (this.$data.original) {
          const data = this.$props.data[this.$props.config.name];
          const idx = data.indexOf(this.$data.original);
          data[idx] = newdata;
        } else {
          this.$props.data[this.$props.config.name].push(newdata);
        }
        this.$emit('input', this.$props.data[this.$props.config.name]);
      }
    },
    components: { listForm, defaultRowComponent },
    template: `
<validation-provider v-bind:rules="config.rules" v-slot="{ errors }">
  <span>{{ config.label }} <b-button variant="success" v-if="!visible" @click="edit()">+</b-button></span>
  <table class="table table-striped">
    <tbody>
      <tr v-for="(i, idx) in $props.data[config.name]" :key="idx">
        <td>
          <component :is="config.rowcomponent || 'defaultRowComponent'" :row="i"/>
        </td>
        <td>
          <b-button-group>
            <b-button variant="warning" @click="edit(i)">edit</b-button>
            <b-button variant="danger" @click="remove(i)">-</b-button>
          </b-button-group>
        </td>
      </tr>
    </tbody>
  </table>

  <listForm v-if="visible" :onSubmit="onSubmit"
    :original="original" :config="config.form" />

</validation-provider>
  `
  };

  var index = Object.assign(components, {
    'dyn-listeditor': listeditor
  });

  return index;

}());
