<template>
    <div class="contact-form__wrapper">
        <form action="">
            <label for="department-options">Hvem ønsker du å kontakte?*</label>
            <div class="contact-form__options">
                <div class="contact-form__select" id="select">
                    <div @keyup.enter="toggleOptions()" @click="toggleOptions()" tabindex="0" class="contact-form__clickbox"></div>
                    <h6 ref="selected">Velg avdeling</h6>
                    <!-- <select name="department-options">
                        <option v-for="option in options" v-bind:key="option.value" :value="option.value">{{ option.text }}</option>
                    </select> -->
                    <div class="contact-form__options bg bg-grey-light" ref="options" style="display: none;">
                        <div v-for="option in options" v-bind:key="option.value" :id="option.value" class="contact-form__options-inner">
                            <label @keyup.space="selectOption(option.value, option.text, $event)" tabindex="0">
                                <input @click="selectOption(option.value, option.text, $event)" :value="option.value" type="radio" name="department">
                                {{ option.text }}
                            </label>
                        </div>
                    </div>
                </div>
                <ChevronDown ref="chevron"/>
            </div>
            <label for="message">Melding*</label>
            <textarea name="message" id="" cols="30" rows="10"></textarea>
            <label for="name">Navn*</label>
            <input name="name">
            <label for="phone">Telefonnummer</label>
            <input type="tel" name="phone">
            <label for="email">Epostaddresse*</label>
            <input type="email" name="email">
            <h6>Felt markert med * må fylles ut.</h6>
            <button type="submit" class="btn-square negative">Send inn</button>
        </form>
    </div>
</template>
<script>
import ChevronDown from "./ChevronDown.vue";

export default {
  name: "Stepper",
  components: {
    ChevronDown
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
  computed: {

  },
  methods: {
    selectOption(value, text, event) {
      if (event.type === "keyup") event.preventDefault();
      document.getElementsByClassName("contact-form__options-inner").forEach((input) => {
        input.classList[input.id === value ? "add" : "remove"]("contact-form__active");
      });
      const dropdown = this.$refs.options;
      dropdown.style.display = "none";
      const chevron = this.$refs.chevron.$el;
      chevron.style.transform = "rotate(0deg)";
      const selected = this.$refs.selected;
      selected.innerHTML = text;
      this.optionsOpen = false;
    },
    toggleOptions() {
      const dropdown = this.$refs.options;
      dropdown.style.display = (this.optionsOpen ? "none" : "block");
      const chevron = this.$refs.chevron.$el;
      chevron.style.transform = (this.optionsOpen ? "rotate(0deg)" : "rotate(180deg)");
      this.optionsOpen = !this.optionsOpen;
    }
  }
};
</script>
<style lang="scss">
    .contact-form__wrapper {
        form {
            display: flex;
            flex-direction: column;
            margin: 0 auto;
            width: 500px;
            label {
                font-weight: 500;
                margin: 1.5rem 0 .1rem 0;
            }
            input, textarea {
                border: 2px solid #e6e8e9;
                padding: .5rem 1rem;
                outline: none;
            }
            button {
                width: 100%;
                padding: .75rem 0;
                background: #191b21;
            }
            h6 {
                margin: 1.2rem 0;
                width: 100%;
                height: 100%;
            }
            .contact-form__options {
                position: relative;
                .contact-form__select {
                    border: 2px solid #e6e8e9;
                    padding: .75rem 1rem;
                    font-weight: 500;
                    width: 100%;
                    position: relative;
                    .contact-form__clickbox {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 2;
                        cursor: pointer;
                        outline: none;
                    }
                    .contact-form__clickbox:focus {
                        border-bottom: 2px solid #191b21;
                    }
                    h6 {
                        font-size: 14px;
                        margin: 0;
                    }
                    select {
                        display: none;
                    }
                    .contact-form__options {
                        position: absolute;
                        width: calc(100% + 4px);
                        left: -2px;
                        top: 100%;
                        overflow-y: scroll;
                        max-height: 20.6rem;
                        .contact-form__options-inner {
                            position: relative;
                            label {
                                font-weight: normal;
                                margin: 0;
                                padding: 1rem;
                                width: 100%;
                                text-align: center;
                                cursor: pointer;
                                outline: none;
                                border: 1px solid transparent;
                            }
                            label:focus {
                                border-bottom: 1px solid #191b21;
                                border-top: 1px solid #191919;
                            }
                            input {
                                visibility: hidden;
                            }
                        }
                        .contact-form__options-inner:hover {
                            background: #f1f2f0;
                        }
                        .contact-form__active {
                            background: #e6e8e9;
                        }
                    }
                }
                svg {
                    height: 8px;
                    position: absolute;
                    right: 1rem;
                    top: calc(50% - 4px);
                    opacity: 40%;
                }
            }
        }
    }

</style>
