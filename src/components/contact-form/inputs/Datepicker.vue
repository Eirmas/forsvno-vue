<!--
 *
 * Created:   01.10.2020
 *
 * (c) Copyright Forsvaret / Norwegian Armed Forces
 *
 *
 * Datepicker.vue
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
          :disabled="field.disabled || field.form.disabled"
          :class="(!field.valid && field.form.displayErrors) ? 'contact-form__error': ''"
          :autocomplete="field.settings.cc || false"
          type="date"
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
        </div>
    </div>
</template>
<script>
import { FormControl } from "../utils/formControl.es6";
import { ControlMixin } from "../mixin/control";
/**
 * Input - type datepicker
 */
/**
 *
 *
 *   Experimental class
 *   Not production ready
 *
 *
 *
 *
 *
 */
export default {
  name: "Datepicker",
  mixins: [ControlMixin],
  props: {
    /**
     * This field
     *
     * @values {
     *     component: "Datepicker",
     *     label: string,
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
