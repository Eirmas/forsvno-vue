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
        </div>
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
      let error = false;
      e.target.elements.forEach((el) => {
        if (el.name) {
          if (!el.value) {
            error = true;
            this.showWarning(document.getElementsByName(el.name)[0]);
          } else {
            data[el.name] = {
              text: el.getAttribute("data-text"),
              value: el[(el.files) ? "files" : "value"]
            };
          }
        }
      });
      if (error) {
        return;
      }
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
      console.log(element);
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") element.classList.add("contact-form__error");
      const error = document.createElement("p");
      error.innerHTML = "Feltet er obligatiorisk";
      error.classList.add("contact-form__error-text");
      console.log(element.tagName);
      element.parentNode.append(error);
    }
  }
};
</script>
<style lang="scss">
.contact-form__error {
  border: 2px solid #AD0B0B !important;
  background: rgba(173, 11, 11, 0.1);
}
.contact-form__error-text{
  color: #AD0B0B;
  font-size: small;
}
</style>
