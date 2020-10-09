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
              :disabled="form.displayErrors && !isValid"
              type="submit"
              class="btn-square negative"
              @click="handleSubmit"
            >
              <span>Send inn</span>
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
    controls: []
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
      default: () => new Form()
    }
  },
  created() {
    this.mapControls();
  },
  methods: {
    handleSubmit() {
      this.updateControls();
      this.$nextTick(() => {
        if (!this.isValid) {
          this.form.displayErrors = true;
        } else {
          console.log(this.controls);
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
              console.log("Oops...", err);
              submitButton.disabled = false;
            });
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
      this.controls = this.fields
        && this.fields.map(
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
