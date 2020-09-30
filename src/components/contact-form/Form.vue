<template>
    <form @submit.prevent="submitForm" name="contact-form">
        <div class="contact-form__form-inner">
          <Select v-if="chosenEmail" :options="chosenEmail.options" :id="id" refName="contact_email" />
        </div>
        <div v-for="(field, index) in fields" :key="index" class="contact-form__form-inner">
            <Select
              v-if="field._selected === 'Select'"
              :options="field.options"
              :id="id"
              :inputHeading="field.inputHeading"
              :refName="field.inputHeading.replace(' ', '-')"
            />
            <Textarea
              v-if="field._selected === 'textarea'"
              :id="id"
              :inputHeading="field.inputHeading"
              :required="field.required"
            />
            <Input
              v-if="field._selected === 'text'"
              :id="id"
              :inputHeading="field.inputHeading"
              :inputType="field.inputType"
              :required="field.required"
            />
            <Attachment
              v-if="field._selected == 'attachment'"
              :inputHeading="field.inputHeading"
              :required="field.required"
            />
            <Checkbox
              v-if="field._selected === 'checkbox'"
              :inputHeading="field.inputHeading"
              :options="field.options"
            />
        </div>
        <div class="contact-form__form-inner">
        </div>
        <Divider />
        <h6>Felt markert med * må fylles ut.</h6>
        <button type="submit" class="btn-square negative">Send inn</button>
    </form>
</template>
<script>
import axios from "axios";
import Select from "./Inputs/Select.vue";
import Input from "./Inputs/Input.vue";
import Textarea from "./Inputs/Textarea.vue";
import Checkbox from "./Inputs/Checkbox.vue";
import Divider from "./Inputs/Divider.vue";
import Attachment from "./Inputs/Attachment.vue";

export default {
  name: "Form",
  components: {
    Select,
    Input,
    Textarea,
    Checkbox,
    Divider,
    Attachment
  },
  props: {
    chosenEmail: {},
    fields: {
      inputHeading: String,
      inputType: String,
      required: Boolean
    },
    id: String,
    serviceUrl: String
  },
  methods: {
    submitForm: function (e) {
      const data = {};
      e.target.elements.forEach((element) => {
        if (element.name) {
          data[element.name] = element.value;
        }
      });
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
