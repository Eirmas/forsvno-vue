<template>
    <div
      v-if="index !== undefined"
      class="contact-form__form-element"
    >
        <label>{{ inputHeading }}</label>
        <input
          :name="index"
          :data-text="inputHeading"
          :type="inputType"
          :required="required"
          @focus="blurOthers"
        >
    </div>
</template>
<script>
import EventBus from "../../../event-bus.es6";

export default {
  name: "Input",
  props: {
    index: {
      type: [Number, Boolean],
      default: false
    },
    inputHeading: {
      type: String,
      default: ""
    },
    inputType: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    options: {
      value: {
        type: String,
        default: ""
      },
      text: {
        type: String,
        default: ""
      }
    },
    id: {
      type: [String, Boolean],
      default: false
    }
  },
  methods: {
    blurOthers() {
      EventBus.$emit("blur", this.id);
    }
  }
};
</script>
