<template>
  <div class="contact-form__form-element">
    <label for="department-options">{{ inputHeading }}</label>
    <div class="contact-form__options">
      <div v-click-outside="hide" class="dropdown align">
          <button :value="value" @focus="blurOthers" @click="optionsOpen = !optionsOpen" name="contact_email"  aria-controls="dropdown-menu-options" type="button" class="dropdown__toggle">
              <div ref="dropdown__label" class="dropdown__label">
                  {{ text }}
              </div>
              <div class="dropdown__caret">
                  <svg ref="caret" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="10" alt="">
                      <path d="M16.3934 0.87561L8.99999 8.50908L1.60655 0.87561" stroke="#191B21" stroke-width="2" stroke-miterlimit="10">
                      </path>
                  </svg>
              </div>
          </button>
          <div ref="options" class="dropdown__menu" style="display: none;">
              <ul ref="optionsList" tabindex="-1" role="listbox" aria-labelledby="filter-Avdeling" class="dropdown__options">
                  <li
                      v-for="(option, index) in options"
                      :key="option.value"
                      :id="index"
                      @mousedown="selectOption(option, $event)"
                      @keyup.space.prevent="selectOption(option)"
                      @keydown.space.prevent
                      aria-selected="false" role="option" class="dropdown__item" tabindex="0">
                      {{ option.text }}
                  </li>
              </ul>
          </div>
      </div>
    </div>
  </div>
</template>
<script lang="es6">
import ClickOutside from "vue-click-outside";
import EventBus from "../../../event-bus.es6";

export default {
  name: "Select",
  components: {
  },
  data: () => ({
    optionsOpen: false,
    text: "Velg",
    value: ""
  }),
  props: {
    inputHeading: String,
    options: {
      value: String,
      text: String
    },
    refName: String,
    id: String
  },
  created() {
    EventBus.$on("blur", (id) => {
      if (this.id === id) this.hide();
    });
  },
  methods: {
    selectOption(option) {
      console.log("select");
      this.$refs.optionsList.children.forEach((item) => item.setAttribute("aria-selected", item.id === option.value));
      this.value = option.value;
      this.text = option.text;
      const dropdownLabel = this.$refs.dropdown__label;
      dropdownLabel.innerHTML = option.text;
      this.optionsOpen = false;
    },
    hide() {
      this.optionsOpen = false;
    },
    blurOthers() {
      EventBus.$emit("blur", this.id);
    },
    print(e) {
      console.log(e);
    }
  },
  watch: {
    optionsOpen: function () {
      const dropdown = this.$refs.options;
      dropdown.style.display = (this.optionsOpen ? "block" : "none");
      const caret = this.$refs.caret;
      caret.style.transform = (this.optionsOpen ? "rotate(180deg)" : "rotate(0deg)");
    }
  },
  directives: {
    ClickOutside
  }
};
</script>
