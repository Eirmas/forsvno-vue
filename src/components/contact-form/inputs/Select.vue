<template>
  <div
    class="contact-form__form-element"
  >
    <label>{{ field.label }} {{ field.settings.required ? "*" : "" }}</label>
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
            :style="(optionsOpen ? 'border-width: 2px;margin: 0;' : '')"
            aria-controls="dropdown-menu-options"
            type="button"
            @focus="setActive"
            @click="optionsOpen = !optionsOpen"
          >
              <div
                ref="label"
                class="contact-form__select-label"
              >
                  <input
                    v-model="searchTerm"
                    v-if="optionsOpen"
                    :placeholder="valueText"
                    type="text"
                    class="contact-form__select-search"
                    @click.stop
                    @keyup.enter.prevent="options[0] && selectOption(options[0])"
                  />
                  <!-- keyup.enter needs to be changed -->
                  <span v-if="!optionsOpen">{{ valueText }}</span>
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
            <Checkbox
              v-if="field.settings.multiple"
              :field="field"
              :standalone="false"
              :searchTerm="searchTerm"
            />
            <ul
              v-else
              ref="list"
              tabindex="-1"
              role="listbox"
              aria-labelledby="filter-Avdeling"
              class="contact-form__select-options"
            >
                <li
                    v-for="(option, i) in options"
                    :key="option.value"
                    :id="i"
                    :aria-selected="option.value === field.value"
                    role="option"
                    class="contact-form__select-item"
                    tabindex="0"
                    @mousedown="selectOption(option)"
                    @keyup.enter.prevent="selectOption(option)"
                    @keydown.enter.prevent
                >
                    <span>{{ option.text }}</span>
                    <div :class="`contact-form__select-seperator ${i >= options.length - 1 ? 'hidden' : ''}`"></div>
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
import Checkbox from "./Checkbox.vue";

export default {
  name: "Select",
  components: {
    Checkbox
  },
  mixins: [ControlMixin],
  data: () => ({
    optionsOpen: false,
    searchTerm: null
  }),
  props: {
    field: {
      type: Object,
      default: () => new FormControl({})
    },
    value: {
      type: [Object, Boolean],
      default: false
    }
  },
  computed: {
    options: function () {
      if (this.searchTerm === null) {
        return this.field.options;
      }
      return this.field.options.filter((option) => option.text.includes(this.searchTerm) || option.text.includes(this.searchTerm));
    },
    valueText: function () {
      if (this.field.options.filter((e) => e.picked).length !== 0) {
        return this.field.options.filter((e) => e.picked).map((e) => e.text).join(", ");
      }
      if (this.value) return this.field.options[this.value.index].text;
      return this.field.placeholder ? this.field.placeholder : "Velg";
    }
  },
  created() {
    if (this.field.isEmail && this.value) {
      this.field.value = this.field.options[this.value.index];
    }
    this.validate();
  },
  methods: {
    selectOption(option) {
      if (this.field.isEmail && this.value) {
        this.value.index = option.value;
      }
      this.searchTerm = null;
      this.field.value = option;
      this.$forceUpdate();
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
    },
    "field.form.activeElement": function () {
      if (this.field.form.activeElement !== this.field.id) this.hide();
    }
  },
  directives: {
    ClickOutside
  }
};
</script>
