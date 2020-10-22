<!--
 *
 * Created:   15.10.2020
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
        <div class="contact-form__datepicker">
          <input
            v-model="day"
            :id="`${field.id}-day`"
            :aria-next="`${field.id}-month`"
            :disabled="field.disabled || field.form.disabled"
            :class="(!field.valid && field.form.displayErrors) ? 'contact-form__error': ''"
            :autocomplete="field.settings.cc || false"
            type="number"
            @focus="setActive"
            @keyup="keyup"
            class="contact-form__datepicker-day"
            placeholder="dd"
            min="1"
            max="31"
          >
          <p>.</p>
          <input
            v-model="month"
            :id="`${field.id}-month`"
            :aria-next="`${field.id}-year`"
            :aria-prev="`${field.id}-day`"
            :disabled="field.disabled || field.form.disabled"
            :class="(!field.valid && field.form.displayErrors) ? 'contact-form__error': ''"
            :autocomplete="field.settings.cc || false"
            type="number"
            @focus="setActive"
            @keyup="keyup"
            class="contact-form__datepicker-month"
            placeholder="mm"
            min="1"
            max="12"
          >
          <p>.</p>
          <input
            v-model="year"
            :id="`${field.id}-year`"
            :aria-prev="`${field.id}-month`"
            :disabled="field.disabled || field.form.disabled"
            :class="(!field.valid && field.form.displayErrors) ? 'contact-form__error': ''"
            :autocomplete="field.settings.cc || false"
            type="number"
            @focus="setActive"
            @keyup="keyup"
            class="contact-form__datepicker-year"
            placeholder="yyyy"
            min="1"
            max="2100"
          >
          <input
            v-model="field.value"
            :name="field.name"
            :disabled="field.disabled || field.form.disabled"
            :autocomplete="field.settings.cc || false"
            type="text"
            hidden
          >
        </div>
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
  data: () => ({
    day: null,
    month: null,
    year: null
  }),
  props: {
    /**
     * Object that contains all data for the current field
     *
     * @values {
     *     component: "Datepicker",
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
  },
  methods: {
    keyup(e) {
      const value = e.target.value.toString().length;
      const max = e.target.max.toString().length;
      const min = e.target.min.toString().length;
      if (value === max) {
        document.getElementById(e.target.getAttribute("aria-next")).focus();
      } else if (value < min && e.code === "Backspace") {
        document.getElementById(e.target.getAttribute("aria-prev")).focus();
      }
    },
    sanitizeDate(value, min, max, year = false) {
      let newValue = value.toString();
      const maxlength = max.toString().length;

      if (year && newValue.length < maxlength) {
        return newValue;
      }

      newValue = newValue.slice(0, maxlength);

      if (newValue > max) {
        newValue = year ? max : newValue.slice(0, maxlength - 1);
      } else if (newValue < min - 1) {
        newValue = min;
      }
      return newValue;
    }
  },
  watch: {
    day: function () {
      this.day = this.sanitizeDate(this.day, 1, 31);

      this.field.value = `${this.year}/${this.month}/${this.day}`;
    },
    month: function () {
      this.month = this.sanitizeDate(this.month, 1, 12);
      this.field.value = `${this.year}/${this.month}/${this.day}`;
    },
    year: function () {
      this.year = this.sanitizeDate(this.year, 1800, 2100, true);
      this.field.value = `${this.year}/${this.month}/${this.day}`;
    },
    "field.value": function () {
      console.log(this.field.value);
    }
  }
};
</script>
