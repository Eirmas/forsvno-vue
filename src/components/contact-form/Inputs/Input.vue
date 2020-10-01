<template>
    <div
      v-if="data.index !== undefined"
      class="contact-form__form-element"
    >
        <label>{{ data.inputHeading }}</label>
        <input
          :name="data.index"
          :data-text="data.inputHeading"
          :type="data.inputType"
          :required="data.required"
          @focus="blurOthers"
        >
    </div>
</template>
<script>
import EventBus from "../../../event-bus.es6";

export default {
  name: "Input",
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
      inputType: {
        type: String,
        default: ""
      },
      required: {
        type: Boolean,
        default: false
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
