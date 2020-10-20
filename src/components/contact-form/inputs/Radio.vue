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
              :id="option.value"
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
     * This field
     *
     * @values {
     *     component: "Radio",
     *     label: string,
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
     *     cols: string
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
