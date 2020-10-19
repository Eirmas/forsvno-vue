<template>
    <form
      name="contact-form"
      @submit.prevent
    >
        <div
          ref="form"
          v-for="field in controls"
          :key="field.name"
          :class="['contact-form__form-inner', `col-md-${field.cols}`]"
        >
            <component
              :is="field.component"
              :field="field"
            />
        </div>
        <div class="contact-form__form-inner col-md-12">
          <div
            class="contact-form__form-element"
          >
            <div
              class="contact-form__divider"
            />
            <p>Felt markert med * må fylles ut.</p>
            <button
              ref="submit"
              :disabled="(form.displayErrors && !isValid) || form.disabled"
              type="submit"
              class="btn-square negative"
              @click="handleSubmit"
            >
              <span>{{ buttonText }}</span>
            </button>
            <div
              v-if="form.displayErrors && !isValid"
              class="contact-form__error-text"
              style="padding: 1rem 0"
            >
              <span>Ett eller flere felt mangler eller er ikke korrekt utfylt</span>
            </div>
          </div>
        </div>
    </form>
</template>
<script>
import Vue from "vue";
import { VueReCaptcha } from "vue-recaptcha-v3";
import { FormControl, Form } from "./utils/formControl.es6";
import { submit } from "./utils/submit";
import Select from "./inputs/Select.vue";
import Input from "./inputs/Input.vue";
import Textarea from "./inputs/Textarea.vue";
import Checkbox from "./inputs/Checkbox.vue";
import Attachment from "./inputs/Attachment.vue";
import Radio from "./inputs/Radio.vue";
import Datepicker from "./inputs/Datepicker.vue";

export default {
  name: "Form",
  data: () => ({
    controls: [],
    buttonText: "Send inn"
  }),
  components: {
    Select,
    Input,
    Textarea,
    Checkbox,
    Attachment,
    Radio,
    Datepicker
  },
  props: {
    id: {
      type: [String, Boolean],
      default: false
    },
    icons: {
      type: [Object, Boolean],
      default: false
    },
    fields: {
      type: [Array, Boolean],
      default: false
    },
    receiver: {
      type: [String, Boolean],
      default: false
    },
    form: {
      type: Object,
      default: () => new Form({})
    },
    siteKey: {
      type: String,
      default: ""
    },
    server: {
      type: String,
      default: ""
    }
  },
  created() {
    Vue.use(VueReCaptcha, { siteKey: this.siteKey });
    this.$recaptchaLoaded().then(() => this.$recaptchaInstance.hideBadge());
    this.mapControls();
  },
  methods: {
    handleSubmit() {
      this.updateControls();
      this.$nextTick(async () => {
        if (!this.isValid) {
          this.form.displayErrors = true;
        } else {
          const token = await this.$recaptcha("login");
          if (token && this.server) {
            submit(this.server, { receiver: this.receiver, controls: this.controls, token: token })
              .then(() => {
                this.form.disabled = true;
                this.buttonText = "Takk! Ditt skjema er nå sendt";
              })
              .catch(() => {
                this.form.disabled = true;
                this.buttonText = "En feil har oppstått. Prøv igjen senere";
              });
          } else {
            this.form.disabled = true;
            this.buttonText = "En feil har oppstått. Prøv igjen senere";
          }
        }
      });
    },
    updateControls() {
      this.controls = this.controls.map((field) => new FormControl({
        ...field,
        form: this.form
      }));
    },
    mapControls() {
      this.controls = this.fields && this.fields.map(
        (field, index) => new FormControl({
          ...field,
          id: this.form.id,
          name: index,
          form: this.form
        })
      );
    }
  },
  computed: {
    isValid() {
      return this.controls.find((ctrl) => !ctrl.valid) === undefined;
    }
  }
};
</script>
