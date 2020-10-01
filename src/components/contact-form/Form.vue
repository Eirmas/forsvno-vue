<template>
    <form
      name="contact-form"
      @submit.prevent="submitForm"
    >
        <div
          ref="form"
          v-for="(field, i) in fields.filter((e) => e.selected && e.data)"
          :key="i"
          class="contact-form__form-inner"
        >
            <component
              :is="field.selected"
              :data="{ ...field.data, id: id, index: i }"
            />
        </div>
        <div class="contact-form__form-inner">
          <div
            class="contact-form__form-element"
          >
            <div
              class="contact-form__divider"
            />
            <h6>Felt markert med * må fylles ut.</h6>
            <button
              type="submit"
              class="btn-square negative"
            >
              <span>Send inn</span>
            </button>
            <p v-if="error" class="contact-form__error-text">Ett eller flere felt mangler eller er ikke korrekt utfylt</p>
          </div>
        </div>
    </form>
</template>
<script>
import axios from "axios";
import Select from "./Inputs/Select.vue";
import Input from "./Inputs/Input.vue";
import Textarea from "./Inputs/Textarea.vue";
import Checkbox from "./Inputs/Checkbox.vue";
import Attachment from "./Inputs/Attachment.vue";
import Radio from "./Inputs/Radio.vue";

export default {
  name: "Form",
  data: () => ({
    error: false
  }),
  components: {
    Select,
    Input,
    Textarea,
    Checkbox,
    Attachment,
    Radio
  },
  props: {
    id: {
      type: [String, Boolean],
      default: false
    },
    fields: {
      data: {
        type: [Object, Boolean],
        default: false
      },
      selected: {
        type: [String, Boolean],
        default: false
      }
    },
    reciever: {
      type: [String, Boolean],
      default: false
    }
  },
  methods: {
    submitForm: function (e) {
      const data = {};
      this.error = false;
      e.target.elements.forEach((el) => {
        if (el.name && el.getAttribute("data-text")) {
          if (!el.value && el.getAttribute("data-required")) {
            this.error = true;
            this.showWarning(document.getElementsByName(el.name)[0]);
          } else {
            console.log(el.value);
            data[el.name] = {
              text: el.getAttribute("data-text"),
              value: el[(el.files) ? "files" : "value"]
            };
          }
        }
      });
      console.log(data);
      console.log("done");
      if (this.error) return;
      if (this.reciever) {
        axios.post((data[-1]) ? data[-1].value : this.reciever, {
          data: data,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    showWarning(element) {
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.tagName === "BUTTON") element.classList.add("contact-form__error");
      document.getElementsByName(element.name).setAttribute("data-error", this.error)
      // const error = document.createElement("p");
      // error.innerHTML = "Feltet er obligatorisk";
      // error.classList.add("contact-form__error-text");
      // element.parentNode.append(error);
    }
  },
  mounted() {
    document.addEventListener("focusin", (e) => {
      if (e.target.classList.contains("contact-form__error")) {
        e.target.classList.remove("contact-form__error");
      }
    });
  }
};
</script>
<style lang="scss">
.contact-form__error {
  border: 2px solid #AD0B0B !important;
  background: rgba(173, 11, 11, 0.1) !important;
}
.contact-form__error-text{
  color: #AD0B0B;
  font-size: small;
  margin: 0;
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 150px;
}
.contact-form__letter-counter {
  font-size: small;
  text-align: right;
  position: absolute;
  top: 100%;
  right: 0;
}
</style>
