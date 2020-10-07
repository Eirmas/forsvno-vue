<template>
    <div
      class="contact-form__form-element"
    >
        <label>{{ field.label }} {{ field.settings.required ? "*" : "" }}</label>
        <p>Vedleggene kan ikke overskride 20.00 MB samlet</p>
        <div
          class="contact-form__attachment-wrapper"
        >
          <label class="contact-form__attachment-file-input">
            <span :class="(!field.valid && field.form.displayErrors) ? 'contact-form__error': ''">Velg fil</span>
            <input
              :name="field.name"
              :multiple="field.settings.multiple"
              :accept="field.settings.accept"
              ref="input"
              type="file"
              hidden
              @change="field.value.push($event.target.files)"
            >
          </label>
          <div
            class="contact-form__attachment-info"
          >
            <div
              v-for="(file, i) in fileNames"
              :key="i"
            >
              <button
                @click="removeFile(file.name)"
              >
                <img
                  v-if="field.form.icons.close"
                  :src="field.form.icons.close"
                  alt="Fjern vedlagt fil(er)"
                >
              </button>
              <span>{{ file.name }} {{ formatBytes(file.size) }}</span>
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
import { FormControl } from "@/components/contact-form/utils/formControl.es6";
import { ControlMixin } from "@/components/contact-form/mixin/control";

export default {
  name: "Attachment",
  mixins: [ControlMixin],
  props: {
    field: {
      type: Object,
      default: () => new FormControl({})
    }
  },
  data: () => ({
    fileNames: []
  }),
  watch: {
    "field.value": {
      handler: "updateFiles",
      deep: true
    }
  },
  created() {
    this.validate();
  },
  methods: {
    updateFiles() {
      this.fileNames = [];
      if (this.field.value) {
        this.field.value.forEach((fileList) => {
          fileList.forEach((file) => {
            this.fileNames.push({
              name: file.name,
              size: file.size
            });
          });
        });
      }
    },
    removeFile(name) {
      const dt = new DataTransfer();
      const input = this.$refs.input;
      if (input && input.files && input.files.length > 0) {
        input.files.forEach((file) => {
          if (file.name !== name) {
            dt.items.add(file);
          }
        });
        input.files = dt.files;
        input.dispatchEvent(new Event("change"));
      }
    },
    formatBytes(bytes) {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `(${parseFloat((bytes / (k ** i)).toFixed(0))} ${sizes[i]})`;
    }
  }
};
</script>
