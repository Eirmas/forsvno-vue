<template>
    <form
      name="contact-form"
      @submit.prevent="handleSubmit"
    >
        <div
          ref="form"
          v-for="field in controls"
          :key="field.name"
          class="contact-form__form-inner"
        >
            <component
              :is="field.component"
              :field="field"
            />
        </div>
        <div class="contact-form__form-inner">
          <div
            class="contact-form__form-element"
          >
            <div
              class="contact-form__divider"
            />
            <h6>Felt markert med * må fylles ut.</h6>
            <button
              type="submit"
              class="btn-square negative"
            >
              <span>Send inn</span>
            </button>
          </div>
        </div>
    </form>
</template>
<script>
import { FormControl, Form } from "./utils/formControl.es6";
import Select from "./inputs/Select.vue";
import Input from "./inputs/Input.vue";
import Textarea from "./inputs/Textarea.vue";
import Checkbox from "./inputs/Checkbox.vue";
import Attachment from "./inputs/Attachment.vue";
import Radio from "./inputs/Radio.vue";

export default {
  name: "Form",
  data: () => ({
    controls: [],
    form: undefined
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
    }
  },
  created() {
    this.mapForm();
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
        }
      });
    },
    updateControls() {
      this.controls = this.controls.map((field) => new FormControl({
        ...field,
        form: this.form
      }));
    },
    mapForm() {
      this.form = new Form({
        id: this.id,
        icons: this.icons
      });
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
      const control = this.controls.find((ctrl) => !ctrl.valid);
      return control ? control.valid : true;
    }
  }
};
</script>
