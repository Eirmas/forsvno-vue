<template>
  <main>
    <div class="contact-form__wrapper container">
      <Form
        :id="contactData.id"
        :icons="contactData.icons"
        :forms="contactData.forms"
      />
    </div>
  </main>
</template>

<script>
import Form from "./components/contact-form/Controller.vue";
import {
  FormControl, FormValidation, FormSettings, FormOption
} from "./components/contact-form/utils/formControl.es6";
import {
  maxLength, email, required, pnum, minLength, pattern, maxSize
} from "./components/contact-form/utils/validators";

export default {
  name: "App",
  components: {
    Form
  },
  data: () => ({
    contactData: {
      id: "1",
      icons: {
        caret: require("@/assets/images/caret.svg"),
        close: require("@/assets/images/close.svg")
      },
      forms: [
        {
          receiver: {
            text: "FMS",
            value: "desk@fms.mil.no"
          },
          fields: [
            new FormControl({
              component: "Input",
              type: "text",
              cols: 6,
              validations: [
                new FormValidation(required, "Dette feltet er obligatorisk"),
                new FormValidation(minLength(2), "Navnet må være minst 2 bokstaver")
              ],
              settings: new FormSettings({
                required: true,
                minLength: 2,
                cc: "given-name"
              }),
              label: "For- og mellomnavn"
            }),
            new FormControl({
              component: "Select",
              cols: 6,
              validations: [
                new FormValidation(required, "Dette feltet er obligatorisk")
              ],
              settings: new FormSettings({
                required: true,
                multiple: true
              }),
              options: [
                {
                  text: "Valg1",
                  value: "valg1"
                },
                {
                  text: "Valg2",
                  value: "valg2"
                },
                {
                  text: "Valg3",
                  value: "valg3"
                },
                {
                  text: "Valg4",
                  value: "valg4"
                }
              ],
              label: "Flervalg"
            }),
            new FormControl({
              component: "Input",
              type: "text",
              cols: 6,
              validations: [
                new FormValidation(required, "Dette feltet er obligatorisk")
              ],
              settings: new FormSettings({
                required: true,
                cc: "family-name"
              }),
              label: "Etternavn"
            }),
            new FormControl({
              component: "Input",
              type: "text",
              cols: 12,
              validations: [
                new FormValidation(required, "Dette feltet er obligatorisk"),
                new FormValidation(pnum, "Personnummeret er ugyldig")
              ],
              settings: new FormSettings({
                required: true,
                cc: "off"
              }),
              label: "Personnummer"
            }),
            new FormControl({
              component: "Input",
              type: "text",
              cols: 12,
              validations: [
                new FormValidation(required, "Dette feltet er obligatorisk")
              ],
              settings: new FormSettings({
                required: true,
                cc: "street-address"
              }),
              label: "Adresse"
            }),
            new FormControl({
              component: "Input",
              type: "text",
              cols: 3,
              validations: [
                new FormValidation(required, "Dette feltet er obligatorisk"),
                new FormValidation(pattern("^[0-9]{4}$"), "Ugyldig postkode")
              ],
              settings: new FormSettings({
                required: true,
                cc: "postal-code"
              }),
              label: "Postnummer"
            }),
            new FormControl({
              component: "Input",
              type: "text",
              cols: 5,
              validations: [
                new FormValidation(required, "Dette feltet er obligatorisk")
              ],
              settings: new FormSettings({
                required: true,
                cc: "locality"
              }),
              label: "Poststed"
            }),
            new FormControl({
              component: "Input",
              type: "text",
              cols: 4,
              validations: [
                new FormValidation(required, "Dette feltet er obligatorisk")
              ],
              settings: new FormSettings({
                required: true
              }),
              value: "Norge",
              label: "Land"
            }),
            new FormControl({
              component: "Input",
              type: "email",
              cols: 12,
              validations: [
                new FormValidation(email, "Ugyldig e-postadresse")
              ],
              settings: {
                cc: "email"
              },
              label: "E-postadresse"
            }),
            new FormControl({
              component: "Textarea",
              cols: 12,
              validations: [
                new FormValidation(required, "Dette feltet er obligatorisk"),
                new FormValidation(maxLength(2500), "Teksten er over 2500 tegn")
              ],
              settings: {
                required: true,
                maxLength: 2500
              },
              placeholder: "Hvor og når har du tjenestegjort? Skriv en linje per operasjon",
              label: "Tjenestegjøring"
            })
          ]
        },
        {
          receiver: {
            text: "FPVS",
            value: "fpvs@.mil.no"
          },
          fields: [
            new FormControl({
              component: "Attachment",
              cols: 12,
              validations: [
                new FormValidation(required, "Dette feltet er obligatorisk"),
                new FormValidation(maxLength(1), "Du kan bare vedlegge 1 fil"),
                new FormValidation(maxSize(20 * (32 ** 4)), "Filen(e) er for stor")
              ],
              settings: new FormSettings({
                required: true,
                multiple: false,
                maxSize: 20 * (32 ** 4)
              }),
              value: [],
              label: "Legg til innkallingen"
            }),
            new FormControl({
              component: "Radio",
              type: "text",
              cols: 6,
              validations: [
                new FormValidation(required, "Dette feltet er obligatorisk")
              ],
              settings: new FormSettings({
                required: true
              }),
              options: [
                {
                  text: "Hund",
                  value: "dog"
                },
                {
                  text: "Katt",
                  value: "cat"
                },
                {
                  text: "Annet",
                  value: "other"
                }
              ],
              label: "Hva er favoritt kjæledyret ditt?"
            }),
            new FormControl({
              component: "Checkbox",
              type: "text",
              cols: 6,
              validations: [
                new FormValidation(required, "Dette feltet er obligatorisk")
              ],
              settings: new FormSettings({
                required: true
              }),
              label: "Postnummer",
              options: [
                new FormOption({
                  text: "Fisking",
                  value: "fishing"
                }),
                new FormOption({
                  text: "Jakt",
                  value: "hunting",
                  picked: true
                }),
                new FormOption({
                  text: "Natur",
                  value: "nature"
                })
              ]
            })
          ]
        }
      ]
    }
  })
};
</script>
