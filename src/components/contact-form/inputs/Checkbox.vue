<template>
    <div
      class="contact-form__form-element"
    >
        <label>{{ field.label }} {{ field.settings.required ? "*" : "" }}</label>
        <div
          :class="[(!field.valid && field.form.displayErrors) ? 'contact-form__error': '', 'contact-form__checkbox-wrapper']"
        >
          <label
            v-for="(option, i) in field.options"
            :key="i"
            :for="`${field.name}-checkbox-${i}`"
            class="contact-form__checkbox-container"
          >
            <span>{{ option.text }}</span>
            <input
              v-model="option.picked"
              :id="`${field.name}-checkbox-${i}`"
              :value="option.value"
              :disabled="field.disabled || field.form.disabled"
              type="checkbox"
            >
            <span
              class="contact-form__checkbox-checkmark"
            />
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
    }
  },
  created() {
    this.updateValues();
    this.validate();
  },
  methods: {
    updateValues: function () {
      this.field.value = this.field.options.filter((opt) => opt.picked).map((opt) => opt.value);
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
