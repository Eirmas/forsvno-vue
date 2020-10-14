<template>
    <div
      class="contact-form__form-element"
    >
        <label>{{ field.label }} {{ field.settings.required ? "*" : "" }}</label>
        <input
          v-model="field.value"
          :name="field.name"
          :placeholder="field.placeholder"
          :disabled="field.disabled || field.form.disabled"
          :class="(!field.valid && field.form.displayErrors) ? 'contact-form__error': ''"
          :autocomplete="field.settings.cc || false"
          :maxlength="field.settings.maxLength || false"
          type="text"
          @focus="setActive"
        >
        <div
          class="contact-form__input-info"
        >
          <span
            v-if="field.settings.maxLength && field.value"
            class="contact-form__letter-counter"
          >
            {{ field.value.length }} / {{ field.settings.maxLength }}
          </span>
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
    </div>
</template>
<script>
import { FormControl } from "../utils/formControl.es6";
import { ControlMixin } from "../mixin/control";

export default {
  name: "Input",
  mixins: [ControlMixin],
  props: {
    field: {
      type: Object,
      default: () => new FormControl({})
    }
  },
  created() {
    this.validate();
  }
};
</script>
