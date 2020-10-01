<template>
    <div
      class="contact-form__form-element"
    >
      <input
        :name="data.index"
        :value="model.join(', ')"
        :data-text="data.inputHeading"
        type="hidden"
      />
        <label>{{ data.inputHeading }}</label>
        <div
          class="checkbox__wrapper"
        >
          <label
            v-for="option in data.options"
            :key="option.value"
            :for="`contact-form__checkbox-${option.value}`"
            class="checkbox__container"
          >
            <span>{{ option.text }}</span>
            <input
              v-model="model"
              :id="`contact-form__checkbox-${option.value}`"
              :data-text="data.inputHeading"
              :value="option.value"
              tabindex="-1"
              type="checkbox"
              @focus="blurOthers"
            >
            <span
              @keyup.enter.prevent="select(option.value)"
              class="checkbox__checkmark"
              tabindex="0"
            />
          </label>
        </div>
    </div>
</template>
<script>
import EventBus from "../../../event-bus.es6";

export default {
  name: "Checkbox",
  data: () => ({
    model: []
  }),
  props: {
    data: {
      id: {
        type: [String, Boolean],
        default: false
      },
      index: {
        type: [Number, Boolean],
        default: false
      },
      inputHeading: {
        type: String,
        default: ""
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
      }
    }
  },
  methods: {
    select(id) {
      document.getElementById(id).checked = !document.getElementById(id).checked;
    },
    blurOthers() {
      EventBus.$emit("blur", this.data.id);
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
