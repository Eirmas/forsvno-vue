<template>
    <div
      class="contact-form__form-element"
    >
        <label>{{ inputHeading }}</label>
        <p>Vedleggene kan ikke overskride 20.00 MB samlet</p>
        <div
          class="attachment__wrapper"
        >
          <label class="attachment__file-input">
            <span>Velg fil</span>
            <input
              :name="index"
              :data-text="inputHeading"
              :required="required"
              type="file"
              hidden
              @focus="blurOthers"
            >
          </label>
          <div
            class="attachment__info"
          >
            <button>
              <img
                v-if="close"
                :src="close"
                alt="Fjern vedlagt fil(er)"
              >
            </button>
            <span>Bilde (3MB)</span>
          </div>
        </div>
    </div>
</template>
<script>
import EventBus from "../../../event-bus.es6";

export default {
  name: "Attachment",
  props: {
    close: {
      type: [String, Boolean],
      default: false
    },
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
    required: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    blurOthers() {
      EventBus.$emit("blur", this.id);
    }
  }
};
</script>
<style lang="scss">
.attachment__wrapper {
  display: flex;
  .attachment__file-input {
    position: relative;
    margin: 0;
    span {
      display: block;
      cursor: pointer;
      border: 2px solid #191B21;
      padding: 1rem 2rem;
    }
  }
  .attachment__info {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      width: 2rem;
      height: 2rem;
    }
    span {
      text-decoration: underline;
    }
  }
}
</style>
