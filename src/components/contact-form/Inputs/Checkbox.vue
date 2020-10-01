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
            <span>{{ option.value }}</span>
            <input
              v-model="model"
              :id="`contact-form__checkbox-${option.value}`"
              :data-text="data.inputHeading"
              :value="option.value"
              type="checkbox"
              @focus="blurOthers"
            >
            <span
              class="checkbox__checkmark"
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
      width: 0;
      height: 0;
      opacity: 0;
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
    input:focus ~ .checkbox__checkmark:after {
      display: block;
      background: #191B2180;
    }
    input:checked ~ .checkbox__checkmark:after {
      display: block;
      background: #191B21;
    }
    .checkbox__checkmark:after {
      left: 3px;
      top: 3px;
      width: 10px;
      height: 10px;
    }
    &:hover input:not(:checked) ~ .checkbox__checkmark:after {
      display: block;
      background: #191B2180;
    }
  }
  .checkbox__container:hover input ~ .checkbox__checkmark:after {
    display: block;
  }
}
</style>
