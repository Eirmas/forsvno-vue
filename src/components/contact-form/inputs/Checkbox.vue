<template>
    <div
      class="contact-form__form-element"
    >
        <label v-if="standalone">{{ field.label }} {{ field.settings.required ? "*" : "" }}</label>
        <div
          :class="[(!field.valid && field.form.displayErrors) ? 'contact-form__error': '', !standalone ? 'contact-form__checkbox-wrapper-not-standalone' : '', 'contact-form__checkbox-wrapper']"
        >
          <label
            v-for="(option, i) in options"
            :key="i"
            :for="`${field.name}-checkbox-${i}`"
            class="contact-form__checkbox-container"
          >

            <input
              v-model="option.picked"
              :id="`${field.name}-checkbox-${i}`"
              :value="option.value"
              :disabled="field.disabled || field.form.disabled"
              type="checkbox"
            >
            <span class="contact-form__checkbox-text">{{ option.text }}</span>
            <span
              class="contact-form__checkbox-checkmark"
            />
            <div v-if="!standalone" :class="`contact-form__select-seperator ${i >= options.length - 1 ? 'hidden' : ''}`"></div>
          </label>
        </div>
        <template
          v-for="(error, i) in field.errors"
        >
          <div
            v-if="field.form.displayErrors"
            :key="i"
            class="contact-form__error-text"
          >
            <span>{{ error.text }}</span>
          </div>
        </template>
    </div>
</template>
<script>
import { FormControl } from "../utils/formControl.es6";
import { ControlMixin } from "../mixin/control";

export default {
  name: "Checkbox",
  mixins: [ControlMixin],
  props: {
    field: {
      type: Object,
      default: () => new FormControl({})
    },
    standalone: {
      type: Boolean,
      default: true
    },
    searchTerm: {
      type: String,
      default: null
    }
  },
  created() {
    this.updateValues();
    this.validate();
  },
  computed: {
    options: function () {
      if (this.searchTerm === null) {
        return this.field.options;
      }
      return this.field.options.filter((option) => option.text.includes(this.searchTerm) || option.text.includes(this.searchTerm));
    }
  },
  methods: {
    updateValues: function () {
      console.log(this.field);
      this.field.value = this.field.options.filter((opt) => opt.picked); /* .map((opt) => opt.value) */
    }
  },
  watch: {
    "field.options": {
      handler: "updateValues",
      deep: true
    }
  }
};
</script>
