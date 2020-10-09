<template>
  <div>
    <div class="contact-form__form-inner col-md-12">
      <Select :field="emailField" :value="currentSchema"/>
    </div>
    <Form
      :id="id"
      :key="currentSchema.index"
      :icons="icons"
      :fields="form.fields"
      :form="controller"
      :reciever="((this.form) ? this.form.receiver.value : '')"
    />
  </div>
</template>

<script>
import Select from "./inputs/Select.vue";
import { FormControl, Form as Controller } from "./utils/formControl.es6";
import Form from "./Form.vue";

export default {
  name: "Controller",
  data: () => ({
    currentSchema: {
      index: 1
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
    form: function () {
      if (this.forms[this.currentSchema.index]) {
        return this.forms[this.currentSchema.index];
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
        options: this.forms.map((form, index) => ({
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
