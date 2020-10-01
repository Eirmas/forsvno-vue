<template>
    <div
      v-if="data.index !== undefined"
      class="contact-form__form-element"
    >
        <label>{{ data.inputHeading }}{{ data.required ? "*" : "" }}</label>
        <textarea
          v-model="model"
          ref="_input"
          :data-text="data.inputHeading"
          :data-required="data.required"
          :name="data.index"
          :pattern="data.options.advanced.regex"
          :maxlength="data.options.advanced.maxLength"
          :minlength="data.options.advanced.minLength"
          rows="10"
          @focus="blurOthers"
        />
        <span
          v-if="data.options.advanced.maxLength"
          class="contact-form__letter-counter"
        >
          {{ model.length }} / {{ data.options.advanced.maxLength }}
        </span>
      <p v-if="error" class="ontact-form__error-text">Feltet er obligatorisk</p>
    </div>
</template>
<script>
import EventBus from "../../../event-bus.es6";

export default {
  name: "Textarea",
  data: () => ({
    model: ""
  }),
  props: {
    error: null,
    data: {
      index: {
        type: [Number, Boolean],
        default: false
      },
      id: {
        type: [String, Boolean],
        default: false
      },
      inputHeading: {
        type: String,
        default: ""
      },
      required: {
        type: Boolean,
        default: false
      },
      options: {
        advanced: {
          regex: {
            type: [String, Boolean],
            default: false
          },
          maxLength: {
            type: [Number, Boolean],
            default: false
          },
          minLength: {
            type: [Number, Boolean],
            default: false
          }
        }
      }
    }
  },
  methods: {
    blurOthers() {
      EventBus.$emit("blur", this.data.id);
    }
  },
  watch: {
    model: function () {
      if (this.data.options.advanced.regex) {
        const re = new RegExp(this.data.options.advanced.regex);
        const input = this.$refs._input;
        input.classList.toggle("contact-form__error", this.model.length === 0 ? false : !re.test(this.model));
      }
    }
  }
};
</script>
