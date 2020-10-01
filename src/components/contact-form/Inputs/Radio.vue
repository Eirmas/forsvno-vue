<template>
    <div
      class="contact-form__form-element"
    >
        <label>{{ inputHeading }}</label>
        <div
          class="radiobutton__wrapper"
        >
          <label
            v-for="option in options"
            :key="option.value"
            for="et_fornuftig_men_unikt_name"
            class="radiobutton__container"
            tabindex="-1"
          >
            {{ option.text }}
            <input
              :id="option.value"
              :value="option.value"
              type="radio"
              name="et_fornuftig_men_unikt_name"
              tabindex="0"
              @focus="blurOthers"
            >
            <span
              class="radiobutton__checkmark"
            >
            </span>
          </label>
        </div>
    </div>
</template>
<script lang="es6">
import EventBus from "../../../event-bus.es6";

export default {
  name: "Radiobutton",
  components: {
  },
  props: {
    inputHeading: String,
    options: {
      value: String,
      text: String
    }
  },
  methods: {
    blurOthers() {
      EventBus.$emit("blur", this.id);
    }

  }
};
</script>
<style lang="scss">
.radiobutton__wrapper {
  display: flex;
  flex-direction: column;
  .radiobutton__container {
    position: relative;
    display: block;
    cursor: pointer;
    padding-left: 36px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      width: 0;
      height: 0;
      pointer-events: none;
    }
    input:checked ~ .radiobutton__checkmark:after{
      display: block;
      background: #191B21 !important;
    }
    input:focus ~ .radiobutton__checkmark:after {
      display: block;
      background: #191B2180;
    }
    .radiobutton__checkmark {
      position: absolute;
      top: 50%;
      left: 0;
      height: 20px;
      width: 20px;
      border: 2px solid #191B21;
      border-radius: 50%;
      transform: translateY(-50%)
    }
    .radiobutton__checkmark:after {
      content: "";
      position: absolute;
      display: none;
    }
    input:checked ~ .radiobutton__checkmark:after {
      display: block;
    }
    .radiobutton__checkmark:after {
      left: 3px;
      top: 3px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #191B21;
    }
  }
  .radiobutton__container:hover input ~ .radiobutton__checkmark:after {
    display: block;
    background: #191B2180;
  }
}
</style>
