<!--
 *
 * Created:   01.10.2020
 *
 * (c) Copyright Forsvaret / Norwegian Armed Forces
 *
 *
 * Checkbox.vue
 *
-->
<template>
    <div
      class="contact-form__form-element"
      :style="!standalone ? { padding: 0 } : ''"
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
              @focus="setActive"
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
/**
 * Input - type checkboxes
 */
export default {
  name: "Checkbox",
  mixins: [ControlMixin],
  props: {
    /**
     * Object that contains all data for the current field
     *
     * @values {
     *     component: "Checkbox",
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
     *       multiple: true, if this is false, then Radio component is selected
     *       required: boolean
     *     },
     *     cols: integer default 12
     *   }
     */
    field: {
      type: Object,
      default: () => new FormControl({})
    },
    /**
     * Determines if this component is dependant in other components
     * Ex. The Select component includes this component if "multiple" setting
     * is selected
     *
     * @values boolean
     */
    standalone: {
      type: Boolean,
      default: true
    },
    /**
     * Search string used when not standalone
     */
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
    /**
     * Filters options based on searchTerm
     *
     * @returns array
     */
    options: function () {
      if (this.searchTerm === null) {
        return this.field.options;
      }
      return this.field.options.filter((option) => option.text.includes(this.searchTerm) || option.text.includes(this.searchTerm));
    }
  },
  methods: {
    /**
     * Updates checked status of boxes when picked status changes in FormControl class.
     * Is triggered by the change in field.options.
     */
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
