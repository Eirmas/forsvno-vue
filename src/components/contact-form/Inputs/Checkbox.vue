<template>
    <div class="contact-form__form-element">
        <label>{{ inputHeading }}</label>
        <div class="checkbox__wrapper">
          <label v-for="option in options" :key="option.value" :for="option.value" class="checkbox__container">
            {{ option.text }}
            <input @focus="blurOthers" type="checkbox" :id="option.value" :name="option.text" :value="option.value" tabindex="-1">
            <span @keydown.space.prevent="select(option.value)" class="checkbox__checkmark" tabindex="0"></span>
          </label>
        </div>
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
    options: {
      value: String,
      text: String
    }
  },
  methods: {
    select(id) {
      document.getElementById(id).checked = !document.getElementById(id).checked;
    },
    blurOthers() {
      EventBus.$emit("blur", this.id);
    }

  }
};
</script>
<style lang="scss">
.checkbox__wrapper {
  display: flex;
  flex-direction: column;
  .checkbox__container {
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
      height: 0;
      width: 0;
    }
    .checkbox__checkmark {
      position: absolute;
      top: 50%;
      left: 0;
      height: 20px;
      width: 20px;
      border: 2px solid #191B21;
      transform: translateY(-50%)
    }
    .checkbox__checkmark:after {
      content: "";
      position: absolute;
      display: none;
    }
    input:checked ~ .checkbox__checkmark:after {
      display: block;
    }
    .checkbox__checkmark:after {
      left: 3px;
      top: 3px;
      width: 10px;
      height: 10px;
      background: #191B21;
    }
  }
  .checkbox__container:hover input ~ .checkbox__checkmark:after {
    display: block;
  }
}
</style>
