<!--
 *
 * Created:   01.10.2020
 *
 * (c) Copyright Forsvaret / Norwegian Armed Forces
 *
 *
 * Attachment.vue
 *
-->
<template>
    <div
      class="contact-form__form-element"
    >
        <label>{{ field.label }} {{ field.settings.required ? "*" : "" }}</label>
        <p v-if="field.settings.maxSize">Vedleggene kan ikke overskride {{ formatBytes(field.settings.maxSize) }} samlet</p>
        <div
          class="contact-form__attachment-wrapper"
        >
          <label
            class="contact-form__attachment-file-input"
          >
            <input
              :name="field.name"
              :multiple="field.settings.multiple"
              :accept="field.settings.accept"
              :disabled="field.disabled || field.form.disabled"
              ref="input"
              type="file"
              tabindex="0"
              @change="addFiles"
              @focus="setActive"
            >
            <span :class="(!field.valid && field.form.displayErrors) ? 'contact-form__error': ''" >Velg fil</span>
            <span v-if="field.value.length !== 0 && field.value.length > 1" class="input-info">Totalt: {{ totalSize }}</span>
          </label>
          <div
            class="contact-form__attachment-info"
          >
            <div
              v-for="(file, i) in field.value"
              :key="i"
              class="contact-form__attachment-list"
            >
              <button
                @click="!(field.disabled || field.form.disabled) ? removeFile(file.name) : null"
                :disabled="field.disabled || field.form.disabled"
              >
                <img
                  v-if="field.form.icons.close"
                  :src="field.form.icons.close"
                  class="contact-form__attachment-remove-file"
                  alt="Fjern vedlagt fil(er)"
                >
              </button>
              <span>{{ file.name }} ({{ formatBytes(file.size) }})</span>
            </div>
          </div>
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
 * Input - type file/attachment
 */
export default {
  name: "Attachment",
  mixins: [ControlMixin],
  props: {
    /**
     * This field
     *
     * @values {
     *     component: "Attachment",
     *     label: string,
     *     validations: [
     *       {
     *         name: string,
     *         text: string,
     *         value: number
     *       }
     *     ],
     *     settings: {
     *       multiple: boolean,
     *       accept: string,
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
  },
  computed: {
    /**
     * Computes the size of all selected files
     */
    totalSize: function () {
      return this.formatBytes(this.field.value.reduce((a, b) => a + b.size, 0));
    }
  },
  methods: {
    /**
     * Adds file to value
     *
     * @param e: Event
     */
    addFiles(e) {
      if (e.target.files) {
        e.target.files.forEach((file) => {
          if (!this.field.value.find((x) => x.name === file.name)) {
            this.field.value.push(file);
          }
        });
      }
    },
    /**
     * Removes file from value
     *
     * @param name: string
     */
    removeFile(name) {
      const file = this.field.value.find((x) => x.name === name);
      if (file) {
        this.field.value.splice(this.field.value.indexOf(file), 1);
      }
    },
    /**
     * Formats bytes to more readable format
     *
     * @param bytes: integer
     * @param digits: integer = 2
     * @returns string
     */
    formatBytes(bytes, digits = 2) {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / (k ** i)).toFixed(digits))} ${sizes[i]}`;
    }
  }
};
</script>
