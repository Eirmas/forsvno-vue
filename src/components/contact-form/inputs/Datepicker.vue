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
            v-model="date.day"
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
            aria-maxlength="2"
          >
          <p>.</p>
          <input
            v-model="date.month"
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
            aria-maxlength="2"
          >
          <p>.</p>
          <input
            v-model="date.year"
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
            aria-maxlength="4"
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
    date: {
      day: null,
      month: null,
      year: null
    }
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
    if (this.field.value && typeof this.field.value.split === "function") {
      const [year, month, day] = this.field.value.split("/");
      this.date = {
        day: day,
        month: month,
        year: year
      };
    }
    this.validate();
  },
  methods: {
    keyup(e) {
      const value = e.target.value.toString().length;
      const max = parseInt(e.target.getAttribute("aria-maxlength"));
      if (value === max) {
        this.focus(e.target.getAttribute("aria-next"));
      } else if (value === 0 && e.code === "Backspace") {
        this.focus(e.target.getAttribute("aria-prev"));
      }
    },
    sanitizeDate(value, min, max, year = false) {
      let string = (value || "").toString();
      const maxlength = max.toString().length;

      if (year && string.length < maxlength) {
        return string;
      }

      string = string.slice(0, maxlength);

      if (value > max) {
        string = year ? max : string.slice(0, maxlength - 1);
      } else if (value < min - 1) {
        string = min;
      }
      return string;
    },
    getDaysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    },
    focus(id) {
      const e = document.getElementById(id);
      if (e) e.focus();
    }
  },
  watch: {
    date: {
      handler() {
        const { day, month, year } = this.date;
        this.date.month = this.sanitizeDate(month, 1, 12);
        this.date.year = this.sanitizeDate(year, this.field.settings.minLength || 1800, this.field.settings.maxLength || 2100, true);
        this.date.day = this.sanitizeDate(day, 1, 31);

        const days = this.getDaysInMonth(month, year);
        if (day > days && year.toString().length >= 4) this.date.day = days;
        this.field.value = `${year}/${month}/${day}`;
      },
      deep: true
    }
  }
};
</script>
