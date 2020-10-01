<template>
    <div
      v-if="data.index !== undefined"
      class="contact-form__form-element"
    >
        <label>{{ data.inputHeading }}</label>
        <textarea
          v-model="model"
          :data-text="data.inputHeading"
          :name="data.index"
          :required="data.required"
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
  }
};
</script>
