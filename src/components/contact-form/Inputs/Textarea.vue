<template>
    <div
      v-if="data.index !== undefined"
      class="contact-form__form-element"
    >
        <label>{{ data.inputHeading }}</label>
        <textarea
          :data-text="data.inputHeading"
          :name="data.index"
          :required="data.required"
          cols="30"
          rows="10"
          @focus="blurOthers"
        />
    </div>
</template>
<script>
import EventBus from "../../../event-bus.es6";

export default {
  name: "Textarea",
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
