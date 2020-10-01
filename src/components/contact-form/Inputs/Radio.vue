<template>
    <div
      class="contact-form__form-element"
    >
        <input
          :name="data.index"
          :value="model"
          :data-text="data.inputHeading"
          :data-required="data.required"
          type="hidden"
        />
        <label>{{ data.inputHeading }}{{ data.required ? "*" : "" }}</label>
        <div
          class="radiobutton__wrapper"
        >
          <label
            v-for="(option, i) in data.options"
            :key="i"
            class="radiobutton__container"
          >
            {{ option.value }}
            <input
              v-model="model"
              :id="option.value"
              :value="option.value"
              :name="`contact-form__radio-${data.id}-${data.index}`"
              type="radio"
              @focus="blurOthers"
            >
            <span
              class="radiobutton__checkmark"
            />
          </label>
        </div>
    </div>
</template>
<script>
import EventBus from "../../../event-bus.es6";

export default {
  name: "Radio",
  data: () => ({
    model: ""
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
      opacity: 0;
      width: 0;
      height: 0;
      position: absolute;
      cursor: pointer;
      &:focus ~ .radiobutton__checkmark:after {
        display: block;
        background: #191B2180;
      }
      &:checked ~ .radiobutton__checkmark:after{
        display: block;
        background: #191B21;
      }
    }
    .radiobutton__checkmark {
      position: absolute;
      top: 50%;
      left: 0;
      height: 20px;
      width: 20px;
      border: 2px solid #191B21;
      border-radius: 50%;
      transform: translateY(-50%);
      &:after {
        content: "";
        position: absolute;
        display: none;
        left: 3px;
        top: 3px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
    }
    &:hover input:not(:checked) ~ .radiobutton__checkmark:after {
      display: block;
      background: #191B2180;
    }
  }
}
</style>
