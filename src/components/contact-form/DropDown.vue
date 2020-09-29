<template>
    <div class="dropdown align">
        <button ref="contact_email" name="contact_email" @click="toggleOptions()" aria-controls="dropdown-menu-options" type="button" class="dropdown__toggle">
            <div ref="dropdown__label" class="dropdown__label">
                Velg avdeling
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
                    v-for="option in options"
                    :key="option.value"
                    :id="option.value"
                    @click="selectOption(option, $event)"
                    @keyup.space="selectOption(option, $event)"
                    @keydown.space.prevent
                    aria-selected="false" role="option" class="dropdown__item" tabindex="0">
                    {{ option.text }}
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="es6">
export default {
  name: "DropDown",
  components: {
  },
  data: () => ({
    optionsOpen: false
  }),
  props: {
    options: {
      value: String,
      text: String
    }

  },
  methods: {
    toggleOptions() {
      const dropdown = this.$refs.options;
      dropdown.style.display = (this.optionsOpen ? "none" : "block");
      const caret = this.$refs.caret;
      caret.style.transform = (this.optionsOpen ? "rotate(0deg)" : "rotate(180deg)");
      this.optionsOpen = !this.optionsOpen;
    },
    selectOption(option, event) {
      if (event.type === "keyup") event.preventDefault();
      this.$refs.optionsList.children.forEach((item) => item.setAttribute("aria-selected", item.id === option.value));
      this.$refs.contact_email.value = option.value;
      this.toggleOptions();
      const dropdownLabel = this.$refs.dropdown__label;
      dropdownLabel.innerHTML = option.text;
      this.optionsOpen = false;
    }
  }
};
</script>
