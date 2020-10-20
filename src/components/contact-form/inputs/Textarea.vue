<!--
 *
 * Created:   01.10.2020
 *
 * (c) Copyright Forsvaret / Norwegian Armed Forces
 *
 *
 * Textarea.vue
 *
-->
<template>
    <div
      class="contact-form__form-element"
    >
        <label>{{ field.label }} {{ field.settings.required ? "*" : "" }}</label>
        <textarea
          v-model="field.value"
          :name="field.name"
          :placeholder="field.placeholder"
          :disabled="field.disabled || field.form.disabled"
          :class="(!field.valid && field.form.displayErrors) ? 'contact-form__error': ''"
          :maxlength="field.settings.maxLength || false"
          rows="8"
          @focus="setActive"
        />
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
/**
 * Input - type textarea
 */
export default {
  name: "Textarea",
  mixins: [ControlMixin],
  props: {
    /**
     * This field
     *
     * @values {
     *     component: "Textarea",
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
