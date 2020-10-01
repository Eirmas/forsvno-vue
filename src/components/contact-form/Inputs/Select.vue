<template>
  <div
    v-if="data.index !== undefined"
    class="contact-form__form-element"
  >
    <label>{{ data.inputHeading }}</label>
    <div
      class="contact-form__options"
    >
      <div
        v-click-outside="hide"
        class="dropdown align"
      >
          <button
            :value="value"
            :data-text="data.inputHeading"
            :name="(data.isEmail) ? -1 : data.index"
            aria-controls="dropdown-menu-options"
            type="button"
            class="dropdown__toggle"
            @focus="blurOthers"
            @click="optionsOpen = !optionsOpen"
          >
              <div
                ref="label"
                class="dropdown__label"
              >
                  <span>{{ text }}</span>
              </div>
              <div
                v-if="data.caret"
                class="dropdown__caret"
              >
                  <img
                    ref="caret"
                    :src="data.caret"
                    alt="Caret"
                  >
              </div>
          </button>
          <div
            ref="options"
            class="dropdown__menu"
          >
              <ul
                ref="list"
                tabindex="-1"
                role="listbox"
                aria-labelledby="filter-Avdeling"
                class="dropdown__options"
              >
                  <li
                      v-for="(option, i) in data.options"
                      :key="option.value"
                      :id="i"
                      aria-selected="false"
                      role="option"
                      class="dropdown__item"
                      tabindex="0"
                      @mousedown="selectOption(option, $event)"
                      @keyup.enter.prevent="selectOption(option)"
                      @keydown.enter.prevent
                  >
                      <span>{{ option.text }}</span>
                  </li>
              </ul>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import ClickOutside from "vue-click-outside";
import EventBus from "../../../event-bus.es6";

export default {
  name: "Select",
  data: () => ({
    optionsOpen: false,
    text: "Velg",
    value: ""
  }),
  props: {
    data: {
      isEmail: {
        type: Boolean,
        default: false
      },
      index: {
        type: [Number, Boolean],
        default: false
      },
      id: {
        type: [String, Boolean],
        default: false
      },
      caret: {
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
  created() {
    EventBus.$on("blur", (id) => {
      if (this.data.id === id) this.hide();
    });
  },
  methods: {
    selectOption(option) {
      if (this.$refs.list && this.$refs.label) {
        this.$refs.list.children.forEach((item) => item.setAttribute("aria-selected", item.id === option.value));
        this.value = option.value;
        this.text = this.$refs.label.innerHTML = option.text;
        this.hide();
      }
    },
    hide() {
      this.optionsOpen = false;
    },
    blurOthers() {
      EventBus.$emit("blur", this.data.id);
    }
  },
  watch: {
    optionsOpen: function () {
      if (this.$refs.options && this.$refs.caret) {
        this.$refs.options.style.display = (this.optionsOpen) ? "block" : "none";
        this.$refs.caret.style.transform = (this.optionsOpen) ? "rotate(180deg)" : "rotate(0deg)";
      }
    }
  },
  directives: {
    ClickOutside
  }
};
</script>
