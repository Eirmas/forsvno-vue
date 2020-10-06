<template>
  <div
    class="contact-form__form-element"
  >
    <label>{{ field.label }}{{ field.settings.required ? "*" : "" }}</label>
    <div
      class="contact-form__options"
    >
      <div
        v-click-outside="hide"
        class="dropdown align"
      >
          <button
            :name="field.name"
            :class="[(!field.valid && field.form.displayErrors) ? 'contact-form__error': '', 'contact-form__select-toggle']"
            aria-controls="dropdown-menu-options"
            type="button"
            @click="optionsOpen = !optionsOpen"
          >
              <div
                ref="label"
                class="contact-form__select-label"
              >
                  <span>{{ field.value ? field.value[0].text : field.placeholder }}</span>
              </div>
              <div
                v-if="field.form.icons.caret"
                class="contact-form__select-caret"
              >
                  <img
                    ref="caret"
                    :src="field.form.icons.caret"
                    alt="Caret"
                  >
              </div>
          </button>
          <div
            ref="options"
            class="contact-form__select-menu"
          >
              <ul
                ref="list"
                tabindex="-1"
                role="listbox"
                aria-labelledby="filter-Avdeling"
                class="contact-form__select-options"
              >
                  <li
                      v-for="(option, i) in field.options"
                      :key="option.value"
                      :id="i"
                      :aria-selected="option.value === field.value"
                      role="option"
                      class="contact-form__select-item"
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
    <template
      v-for="(error, i) in field.errors"
    >
      <div
        v-if="field.form.displayErrors"
        :key="i"
        class="contact-form__error-text"
      >
        <span>{{ error.text }}</span>
      </div>
    </template>
  </div>
</template>
<script>
import ClickOutside from "vue-click-outside";
import { FormControl } from "../utils/formControl.es6";
import { ControlMixin } from "../mixin/control";

export default {
  name: "Select",
  mixins: [ControlMixin],
  data: () => ({
    optionsOpen: false
  }),
  props: {
    field: {
      type: Object,
      default: () => new FormControl({})
    }
  },
  created() {
    this.validate();
  },
  methods: {
    selectOption(option) {
      this.field.value = [option];
      this.hide();
    },
    hide() {
      this.optionsOpen = false;
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
