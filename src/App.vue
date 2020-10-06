<template>
  <main>
    <div class="contact-form__wrapper">
      <ContactForm
        :id="contactData.id"
        :icons="contactData.icons"
        :fields="contactData.fields"
        :reciever="contactData.reciever"
      />
    </div>
  </main>
</template>

<script>
import ContactForm from "./components/contact-form/Form.vue";
import {
  FormControl, FormValidation, FormSettings, FormOption
} from "./components/contact-form/utils/formControl.es6";
import { maxLength, email, required } from "./components/contact-form/utils/validators";

export default {
  name: "App",
  components: {
    ContactForm
  },
  data: () => ({
    contactData: {
      id: "1",
      icons: {
        caret: require("@/assets/images/caret.svg"),
        close: require("@/assets/images/close.svg")
      },
      fields: [
        new FormControl({
          component: "Attachment",
          validations: [
            new FormValidation(required, "Dette feltet er obligatorisk")
          ],
          settings: new FormSettings({
            accept: "",
            multiple: true,
            required: true
          }),
          label: "Vedlegg",
          value: []
        }),
        new FormControl({
          component: "Checkbox",
          validations: [
            new FormValidation(required, "Dette feltet er obligatorisk")
          ],
          settings: new FormSettings({
            required: true
          }),
          options: [
            new FormOption({
              text: "Hund",
              value: "dog",
              picked: false
            }),
            new FormOption({
              text: "Katt",
              picked: false
            }),
            new FormOption({
              text: "Annet",
              value: "other",
              picked: true
            })
          ],
          label: "Hvilken kjæledyr har du?"
        }),
        new FormControl({
          component: "Radio",
          validations: [
            new FormValidation(required, "Dette feltet er obligatorisk")
          ],
          settings: new FormSettings({
            required: true
          }),
          options: [
            new FormOption({
              text: "Luft",
              value: "airforce",
              picked: false
            }),
            new FormOption({
              text: "Hær",
              value: "army",
              picked: false
            }),
            new FormOption({
              text: "Sjø",
              value: "marine",
              picked: false
            })
          ],
          label: "Hvilken avdeling ønsker du å komme i?"
        }),
        new FormControl({
          component: "Select",
          validations: [
            new FormValidation(required, "Dette feltet er obligatorisk")
          ],
          settings: new FormSettings({
            required: true
          }),
          options: [
            {
              text: "Jakt",
              value: "hunting"
            },
            {
              text: "Fisking",
              value: "fishing"
            }
          ],
          label: "Hvilke interesser har du?",
          placeholder: "Velg"
        }),
        new FormControl({
          component: "Input",
          type: "email",
          validations: [
            new FormValidation(maxLength(50), "Teksten er over 50 tegn lang"),
            new FormValidation(email, "Skriv en gyldig email"),
            new FormValidation(required, "Dette feltet er obligatorisk")
          ],
          settings: new FormSettings({
            maxLength: 50,
            required: true
          }),
          label: "E-mail adresse",
          placeholder: "F.eks olanordmann@email.no"
        }),
        new FormControl({
          component: "Textarea",
          validations: [
            new FormValidation(maxLength(50), "Teksten kan ikke være over 144 tegn lang."),
            new FormValidation(required, "Dette feltet er obligatorisk")
          ],
          settings: new FormSettings({
            maxLength: 50,
            required: true
          }),
          label: "Kommentar",
          placeholder: "Skriv meldingen din her"
        })
      ],
      reciever: "noen@mil.no"
    }
  })
};
</script>
