<template>
  <main>
    <div class="contact-form__wrapper container">
      <ContactForm
        :id="contactForm.id"
        :icons="contactForm.icons"
        :forms="contactForm.forms"
        :site-key="contactForm.siteKey"
      />
    </div>
  </main>
</template>

<script>
import ContactForm from "./components/contact-form/Controller.vue";
import { minLength } from "./components/contact-form/utils/validators";

export default {
  name: "App",
  components: {
    ContactForm
  },
  data: () => ({
    contactForm: {
      id: "-main-0",
      icons: {
        caret: require("./assets/images/caret.svg"),
        close: require("./assets/images/close-small.svg")
      },
      siteKey: "6LfkaNYZAAAAAEESwj76Z2n1xxhqTycWo_kiq_5h",
      forms: [
        {
          receiver: {
            text: "FMS",
            value: "desk@fms.mil.no"
          },
          fields: []
        },
        {
          receiver: {
            text: "FPVS",
            value: "fpvs@mil.no"
          },
          fields: [
            {
              component: "Select",
              label: "Hvilken tjeneste ønsker du?",
              options: [
                {
                  text: "Kundeservice",
                  value: "Kundeservice"
                },
                {
                  text: "Rådgiver",
                  value: "Rådgiver"
                },
                {
                  text: "Presse og informasjon",
                  value: "Presse og informasjon"
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
                required: true
              }
            },
            {
              component: "Input",
              label: "Fult navn",
              placeholder: "Eks. Ola Halvorsen Nordmann",
              validations: [
                {
                  name: "required",
                  text: "Dette feltet er obligatorisk",
                  value: 0
                },
                {
                  name: "minLength",
                  text: "Lengden på verdien er for kort",
                  value: 2
                }
              ],
              settings: {
                cc: "name",
                required: true,
                minLength: 2
              },
              cols: 12
            },
            {
              component: "Datepicker",
              label: "Dato",
              validations: [
                {
                  name: "required",
                  text: "Dette feltet er obligatorisk",
                  value: 0
                }
              ],
              settings: {
                required: true,
                minLength: 2020,
                maxLength: 2050
              },
              cols: 12
            }
          ]
        },
        {
          receiver: {
            text: "Test",
            value: "test@mil.no"
          },
          fields: [
            {
              component: "Datepicker",
              label: "Dato",
              validations: [
                {
                  name: "required",
                  text: "Dette feltet er obligatorisk",
                  value: 0
                },
                {
                  name: "date",
                  text: "Datoen er feil",
                  value: 0
                }
              ],
              settings: {
                cc: "date",
                required: true,
                minLength: 2000,
                maxLength: 2050
              },
              cols: 12
            }
          ]
        }
      ]
    }
  }),
  created() {
    const components = ["Input", "Attachment", "Checkbox", "Datepicker", "Radio", "Select", "Textarea"];
    for (let i = 0; i < 5; i++) {
      const c = components[parseInt(Math.floor(Math.random() * components.length))];
      console.log(c);
      this.contactForm.forms[0].fields.push({
        component: c,
        label: `${c}?`,
        options: [
          {
            text: "Hæren",
            value: "army"
          },
          {
            text: "Luftforsvaret",
            value: "airforce"
          },
          {
            text: "Sjøforsvaret",
            value: "marine"
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
        cols: (Math.ceil(Math.random() * 2) * 6).toString(),
        value: []

      });
    }
  }
};

</script>
