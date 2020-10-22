<!--
 *
 * Created:   01.10.2020
 *
 * (c) Copyright Forsvaret / Norwegian Armed Forces
 *
 *
 * Input.vue
 *
-->
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
          <span
            v-if="field.settings.maxLength && field.value"
            class="contact-form__letter-counter"
          >
            {{ field.value.length }} / {{ field.settings.maxLength }}
          </span>
        </div>
    </div>
</template>
<script>
import { FormControl } from "../utils/formControl.es6";
import { ControlMixin } from "../mixin/control";
/**
 * Input - type text field
 */
export default {
  name: "Input",
  mixins: [ControlMixin],
  props: {
    /**
     * Object that contains all data for the current field
     *
     * @values {
     *     component: "Input",
     *     form: object,                          // Form()
     *     id: string,                            // `contact-form__${id}-${name}`
     *     name: string,                          // `contact-form__input-${id}-${name}`;
     *     label: string,
     *     isEmail: boolean,
     *     value: string,
     *     placeholder: string,
     *     disabled: boolean,
     *     errors: array,
     *     valid: boolean,
     *     validations: [
     *       {
     *         name: string,
     *         text: string,
     *         value: number
     *       }
     *     ],
     *     settings: {
     *       required: boolean
     *     },
     *     cols: integer default 12
     *   }
     */
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
