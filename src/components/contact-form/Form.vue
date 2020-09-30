<template>
    <form
      name="contact-form"
      @submit.prevent="submitForm"
    >
        <div
          class="contact-form__form-inner"
        >
          <Select
            v-if="chosenEmail"
            :id="id"
            :index="-1"
            :caret="caret"
            :options="chosenEmail.options"
            :input-heading="chosenEmail.inputHeading"
          />
        </div>
        <div
          v-for="(field, i) in fields"
          :key="i"
          class="contact-form__form-inner"
        >
            <Select
              v-if="field._selected === 'select'"
              :options="field.options"
              :id="id"
              :index="i"
              :caret="caret"
              :inputHeading="field.inputHeading"
            />
            <Textarea
              v-if="field._selected === 'textarea'"
              :id="id"
              :index="i"
              :inputHeading="field.inputHeading"
              :required="field.required"
            />
            <Input
              v-if="field._selected === 'text'"
              :id="id"
              :index="i"
              :inputHeading="field.inputHeading"
              :inputType="field.inputType"
              :required="field.required"
            />
        </div>
        <h6>
          <span>Felt markert med * må fylles ut.</span>
        </h6>
        <button
          type="submit"
          class="btn-square negative"
        >
          <span>Send inn</span>
        </button>
    </form>
</template>
<script>
import axios from "axios";
import Select from "./Inputs/Select.vue";
import Input from "./Inputs/Input.vue";
import Textarea from "./Inputs/Textarea.vue";

export default {
  name: "Form",
  components: {
    Select,
    Input,
    Textarea
  },
  props: {
    caret: {
      type: [String, Boolean],
      default: false
    },
    chosenEmail: {
      inputHeading: {
        type: String,
        default: ""
      },
      options: {
        type: [Array, Boolean],
        default: false
      }
    },
    fields: {
      inputHeading: {
        type: String,
        default: ""
      },
      inputType: {
        type: [String, Boolean],
        default: false
      },
      required: {
        type: Boolean,
        default: false
      },
      _selected: {
        type: [String, Boolean],
        default: false
      }
    },
    id: {
      type: [String, Boolean],
      default: false
    },
    serviceUrl: {
      type: [String, Boolean],
      default: false
    }
  },
  methods: {
    submitForm: function (e) {
      const data = {};
      e.target.elements.forEach((el) => {
        if (el.name) {
          data[el.name] = {
            text: el.getAttribute("data-text"),
            value: el.value
          };
        }
      });
      console.log(data);
      axios.post(this.serviceUrl, {
        data: data
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>
