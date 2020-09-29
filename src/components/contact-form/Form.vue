<template>
    <form @submit.prevent="submitForm" name="contact-form">
        <div v-for="field in data" :key="field.inputId" class="contact-form__form-inner">
            <div v-if="field._selected === 'dropdown'" class="contact-form__form-element">
                <label for="department-options">{{ field.inputHeading }}</label>
                <div class="contact-form__options">
                    <DropDown :options="field.options" />
                </div>
            </div>
            <div v-if="field._selected === 'textarea'" class="contact-form__form-element">
                <label :for="field.inputId">{{ field.inputHeading }}</label>
                <textarea :name="field.inputId" cols="30" rows="10"></textarea>
            </div>
            <div v-if="field._selected === 'text'" class="contact-form__form-element">
                <label :for="field.inputId">{{ field.inputHeading }}</label>
                <input :name="field.inputId" :type="field.inputType" :required="field.required">
            </div>
        </div>
        <h6>Felt markert med * må fylles ut.</h6>
        <button type="submit" class="btn-square negative">Send inn</button>
    </form>
</template>
<script>
import axios from "axios";
import DropDown from "./DropDown.vue";

export default {
  name: "Form",
  components: {
    DropDown
  },
  props: {
    data: {
      inputHeading: String,
      inputType: String,
      required: Boolean
    },
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
