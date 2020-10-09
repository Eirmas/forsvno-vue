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
            {
              component: "Select",
              label: "Hvilken avdeling",
              options: [
                {
                  text: "H├ªren",
                  value: "verdi"
                },
                {
                  text: "Luftforsvaret",
                  value: "Luftforsvaret"
                },
                {
                  text: "Sj├╕forsvaret",
                  value: "Sj├╕forsvaret"
                }
              ],
              validations: [
                {
                  name: "required",
                  text: "Dette feltet er obligatorisk",
                  value: 0
                }
              ],
              settings: {
                multiple: true,
                required: true
              },
              cols: 6
            },
            {
              component: "Input",
              label: "Navn",
              placeholder: "Eks. Ola Nordann",
              validations: [
                {
                  name: "required",
                  text: "Dette feltet er obligatorisk",
                  value: 0
                },
                {
                  name: "maxLength",
                  text: "Lengden p├Ñ verdien er for lang",
                  value: 100
                },
                {
                  name: "minLength",
                  text: "Lengden p├Ñ verdien er for kort",
                  value: 2
                }
              ],
              settings: {
                cc: "name",
                required: true,
                maxLength: 100,
                minLength: 2
              },
              cols: 6
            },
            {
              component: "Input",
              label: "Personnummer",
              placeholder: "placeholder",
              validations: [
                {
                  name: "required",
                  text: "Dette feltet er obligatorisk",
                  value: 0
                },
                {
                  name: "maxLength",
                  text: "Lengden p├Ñ verdien er for lang",
                  value: 100
                },
                {
                  name: "minLength",
                  text: "Lengden p├Ñ verdien er for kort",
                  value: 1
                },
                {
                  name: "pattern",
                  text: "Ugyldig verdi",
                  value: "formel"
                }
              ],
              settings: {
                cc: "off",
                required: true,
                maxLength: 100,
                minLength: 1
              },
              cols: 12
            },
            {
              component: "Select",
              label: "Melding",
              options: [

              ],
              validations: [
                {
                  name: "required",
                  text: "Dette feltet er obligatorisk",
                  value: 0
                }
              ],
              settings: {
                required: true
              },
              cols: 12
            },
            {
              component: "Checkbox",
              label: "Hvor mange dyr har du",
              options: [
                {
                  text: "Ingen",
                  value: "0"
                },
                {
                  text: "1-3",
                  value: "1"
                },
                {
                  text: "4-6",
                  value: "2"
                },
                {
                  text: "7+",
                  value: "3"
                }
              ],
              validations: [
                {
                  name: "required",
                  text: "Dette feltet er obligatorisk",
                  value: 0
                }
              ],
              settings: {
                multiple: true,
                required: true
              },
              cols: 6
            },
            {
              component: "Checkbox",
              label: "Hvem er dine favorittdyr?",
              options: [
                {
                  text: "Hund",
                  value: "Hund"
                },
                {
                  text: "Katt",
                  value: "cat"
                },
                {
                  text: "Andre",
                  value: "other"
                }
              ],
              validations: [
                {
                  name: "required",
                  text: "Dette feltet er obligatorisk",
                  value: 0
                }
              ],
              settings: {
                multiple: true,
                required: true
              },
              cols: 6
            },
            {
              component: "Attachment",
              label: "Legg til innkallingen din",
              options: [

              ],
              validations: [
                {
                  name: "required",
                  text: "Dette feltet er obligatorisk",
                  value: 0
                },
                {
                  name: "maxSize",
                  text: "St├╕rrelsen er for stor",
                  value: 20
                }
              ],
              settings: {
                maxSize: 20,
                required: true,
                accept: ".pdf, .docx"
              },
              cols: 12,
              value: [

              ]
            }
          ]
        },
        {
          receiver: {
            text: "erere",
            value: "rere@gmdi.fo"
          },
          fields: [
            {
              component: "Input",
              label: "erere",
              validations: [

              ],
              settings: {
                required: false,
                maxLength: null,
                minLength: null
              },
              cols: null
            }
          ]
        }
      ]
    }
  })
};
</script>
