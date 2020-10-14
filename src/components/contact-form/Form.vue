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
<<<<<<< HEAD
              :disabled="(form.displayErrors && !isValid) || form.disabled"
=======
              :disabled="form.displayErrors && !isValid"
>>>>>>> 65b6c87a8a2c6b9e9fad20c31c029684be7b3d25
              type="submit"
              class="btn-square negative"
              @click="handleSubmit"
            >
<<<<<<< HEAD
              <span>{{ buttonText }}</span>
=======
              <span>Send inn</span>
>>>>>>> 65b6c87a8a2c6b9e9fad20c31c029684be7b3d25
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
<<<<<<< HEAD
import Vue from "vue";
import { VueReCaptcha } from "vue-recaptcha-v3";
=======
>>>>>>> 65b6c87a8a2c6b9e9fad20c31c029684be7b3d25
import { FormControl, Form } from "./utils/formControl.es6";
import { submit } from "./utils/submit";
import Select from "./inputs/Select.vue";
import Input from "./inputs/Input.vue";
import Textarea from "./inputs/Textarea.vue";
import Checkbox from "./inputs/Checkbox.vue";
import Attachment from "./inputs/Attachment.vue";
import Radio from "./inputs/Radio.vue";

export default {
  name: "Form",
  data: () => ({
<<<<<<< HEAD
    controls: [],
    buttonText: "Send inn"
=======
    controls: []
>>>>>>> 65b6c87a8a2c6b9e9fad20c31c029684be7b3d25
  }),
  components: {
    Select,
    Input,
    Textarea,
    Checkbox,
    Attachment,
    Radio
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
    reciever: {
      type: [String, Boolean],
      default: false
    },
    form: {
      type: Object,
<<<<<<< HEAD
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
=======
      default: () => new Form()
    }
  },
  created() {
>>>>>>> 65b6c87a8a2c6b9e9fad20c31c029684be7b3d25
    this.mapControls();
  },
  methods: {
    handleSubmit() {
      this.updateControls();
<<<<<<< HEAD
      this.$nextTick(async () => {
        if (!this.isValid) {
          this.form.displayErrors = true;
        } else {
          const token = await this.$recaptcha("login");
          if (token && this.server) {
            submit(this.server, { controls: this.controls, token: token })
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
=======
      this.$nextTick(() => {
        if (!this.isValid) {
          this.form.displayErrors = true;
        } else {
          const submitButton = this.$refs.submit;
          submit("http://localhost:3000/submit", this.controls, null)
            .then((res) => {
              console.log(res.status === 200 ? "Hooray" : "Hmm....");
              submitButton.disabled = true;
              setTimeout(() => {
                submitButton.innerHTML = "Sendt";
              }, 850);
            })
            .catch((err) => {
              console.log(err);
              submitButton.disabled = false;
            });
>>>>>>> 65b6c87a8a2c6b9e9fad20c31c029684be7b3d25
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
<<<<<<< HEAD
      this.controls = this.fields && this.fields.map(
        (field, index) => new FormControl({
          ...field,
          id: this.form.id,
          name: index,
          form: this.form
        })
      );
=======
      this.controls = this.fields
        && this.fields.map(
          (field, index) => new FormControl({
            ...field,
            id: this.form.id,
            name: index,
            form: this.form
          })
        );
>>>>>>> 65b6c87a8a2c6b9e9fad20c31c029684be7b3d25
    }
  },
  computed: {
    isValid() {
      return this.controls.find((ctrl) => !ctrl.valid) === undefined;
    }
  }
};
</script>
