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
            aria-controls="dropdown-menu-options"
            type="button"
            @click="optionsOpen = !optionsOpen"
          >
              <div
                ref="label"
                class="contact-form__select-label"
              >
                  <input
                    v-model="searchTerm"
                    v-if="optionsOpen"
                    :placeholder="field.value && field.value.length !== 0 ? field.value.map(e => e.text).join(', ') : field.placeholder"
                    type="text"
                    class="contact-form__select-search"
                    @click.stop
                  />
                  <span v-if="!optionsOpen">{{ field.value && field.value.length !== 0 ? field.value.map(e => e.text).join(", ") : field.placeholder }}</span>
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
              :field="field"
              :standalone="false"
              :searchTerm="searchTerm"
            />
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
  name: "MultiSelect",
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
  created() {
    console.log(this.field);
    if (this.field.isEmail && this.value) {
      this.field.value = [this.field.options[this.value.index]];
    }
    this.validate();
  },
  methods: {
    selectOption(option) {
      if (this.field.isEmail && this.value) {
        this.value.index = option.value;
      }
      this.searchTerm = null;
      this.field.value = [option];
      this.$forceUpdate();
      this.hide();
    },
    hide() {
      this.optionsOpen = false;
    }
  },
  watch: {
    optionsOpen: function () {
      console.log(this.field);
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
