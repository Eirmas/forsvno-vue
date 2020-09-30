<template>
    <div
      v-if="index !== undefined"
      class="contact-form__form-element"
    >
        <label>{{ inputHeading }}</label>
        <textarea
          :data-text="inputHeading"
          :name="index"
          :required="required"
          cols="30"
          rows="10"
          @focus="blurOthers"
        />
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
