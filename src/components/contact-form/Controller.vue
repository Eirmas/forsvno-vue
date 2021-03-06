<template>
  <div>
    <div
      v-if="forms.length > 1"
      class="contact-form__form-inner col-md-12"
    >
      <Select
        :field="emailField"
        :value="currentSchema"
      />
    </div>
    <Form
      :id="id"
      :key="currentSchema.index"
      :icons="icons"
      :fields="form.fields"
      :form="controller"
      :reciever="((this.form) ? this.form.receiver.value : '')"
      :site-key="siteKey"
      :server="server"
    />
  </div>
</template>

<script>
import * as validators from "./utils/validators";
import Select from "./inputs/Select.vue";
import {
  FormControl, Form as Controller, FormOption, FormSettings, FormValidation
} from "./utils/formControl.es6";
import Form from "./Form.vue";

export default {
  name: "Controller",
  data: () => ({
    currentSchema: {
      index: 0
    },
    controller: undefined
  }),
  components: {
    Select,
    Form
  },
  props: {
    id: {
      type: String,
      default: "0"
    },
    icons: {
      type: [Object, Boolean],
      default: false
    },
    forms: {
      type: [Array, Boolean],
      default: false
    },
    siteKey: {
      type: String,
      default: ""
    },
    server: {
      type: String,
      default: ""
    }
  },
  created() {
    this.mapController();
  },
  methods: {
    mapController: function () {
      this.controller = new Controller({
        id: this.id,
        icons: this.icons
      });
    }
  },
  computed: {
    processedForms: function () {
      return this.forms.map((form) => ({
        receiver: form.receiver,
        fields: form.fields.map((field) => new FormControl({
          component: field.component,
          type: field.text,
          label: field.label,
          placeholder: field.placeholder,
          cols: field.cols,
          validations: field.validations.map((validation) => new FormValidation(validators[validation.name](validation.value), validation.text)),
          settings: (field.settings) ? new FormSettings({
            required: field.settings.required,
            minLength: field.settings.minLength,
            cc: field.settings.cc,
            maxLength: field.settings.maxLength,
            accept: field.settings.accept,
            multiple: field.settings.multiple,
            maxSize: field.settings.maxSize
          }) : null,
          options: (field.options) ? field.options.map((opt) => new FormOption({
            text: opt.text,
            value: opt.value,
            picked: opt.picked
          })) : null,
          value: field.value
        }))
      }));
    },
    form: function () {
      if (this.processedForms[this.currentSchema.index]) {
        return this.processedForms[this.currentSchema.index];
      }
      return null;
    },
    emailField: function () {
      return new FormControl({
        id: `contact-form__${this.id}`,
        name: "email",
        form: this.controller,
        isEmail: true,
        label: "Hvem ønsker du å kontakte?",
        options: this.processedForms.map((form, index) => ({
          text: form.receiver.text,
          value: index
        }))
      });
    }
  },
  watch: {
    "currentSchema.index": function () {
      this.controller.displayErrors = false;
      this.controller.disabled = false;
      this.controller.activeElement = undefined;
    }
  }
};
</script>
