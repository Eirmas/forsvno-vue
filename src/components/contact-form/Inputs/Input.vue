<template>
    <div class="contact-form__form-element">
        <label>{{ inputHeading }}</label>
        <input @focus="blurOthers" :type="inputType" :required="required">
    </div>
</template>
<script lang="es6">
import EventBus from "../../../event-bus.es6";

export default {
  name: "Input",
  components: {
  },
  props: {
    inputHeading: String,
    inputType: String,
    required: Boolean,
    options: {
      value: String,
      text: String
    },
    id: String
  },
  methods: {
    blurOthers() {
      EventBus.$emit("blur", this.id);
    }

  }
};
</script>
