<!--
 *
 * Created:   01.10.2020
 *
 * (c) Copyright Forsvaret / Norwegian Armed Forces
 *
 *
 * Radio.vue
 *
-->
<template>
    <div
      class="contact-form__form-element"
    >
        <label>{{ field.label }} {{ field.settings.required ? "*" : "" }}</label>
        <div
          :class="[(!field.valid && field.form.displayErrors) ? 'contact-form__error': '', 'contact-form__radio-wrapper']"
        >
          <label
            v-for="(option, i) in field.options"
            :key="i"
            class="contact-form__radio-container"
          >

            <input
              v-model="field.value"
              :id="`${field.name}-radio-${i}`"
              :value="option.value"
              :name="field.name"
              :disabled="field.disabled || field.form.disabled"
              type="radio"
              @focus="setActive"
            >
            <span class="contact-form__radio-text">{{ option.text }}</span>
            <span
              class="contact-form__radio-checkmark"
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
/**
 * Input - type radio buttons
 */
export default {
  name: "Radio",
  mixins: [ControlMixin],
  props: {
    /**
     * Object that contains all data for the current field
     *
     * @values {
     *     component: "Radio",
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
     *     options: [
     *       {
     *         text: string,
     *         value: string
     *       }
     *     ],
     *     validations: [
     *       {
     *         name: string,
     *         text: string,
     *         value: number
     *       }
     *     ],
     *     settings: {
     *       multiple: false, if this is true, then Checkbox component is selected
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
