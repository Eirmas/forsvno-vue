<template>
  <main>
    <div>
      <ContactForm
        :id="contactForm.id"
        :icons="contactForm.icons"
        :forms="contactForm.forms"
      />
    </div>
  </main>
</template>

<script>
import ContactForm from "./components/contact-form/Controller.vue";

export default {
  name: "App",
  components: {
    ContactForm
  },
  data: () => ({
    contactForm: {
      id: "-main-0",
      icons: {
        caret: "/admin/site/preview/default/draft/_/asset/forsvno:1602486029/images/caret.svg",
        close: "/admin/site/preview/default/draft/_/asset/forsvno:1602486029/images/close-bold.svg"
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
              label: "Hvilke avdelinger liker du?",
              options: [
                {
                  text: "H├ªren",
                  value: "army"
                },
                {
                  text: "Luftforsvaret",
                  value: "airforce"
                },
                {
                  text: "Sj├╕forsvaret",
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
              cols: "12"
            },
            {
              component: "Input",
              label: "For- og etternavn",
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
                cc: "given-name",
                required: true,
                maxLength: 100,
                minLength: 2
              },
              cols: "6"
            },
            {
              component: "Input",
              label: "Etternavn",
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
                cc: "family-name",
                required: true,
                maxLength: 100,
                minLength: 2
              },
              cols: "6"
            },
            {
              component: "Input",
              label: "Personnummer",
              validations: [
                {
                  name: "required",
                  text: "Dette feltet er obligatorisk",
                  value: 0
                }
              ],
              settings: {
                cc: "off",
                required: true
              },
              cols: "12"
            },
            {
              component: "Textarea",
              label: "Melding",
              placeholder: "Skriv om din erfaring s├Ñ langt i forsvaret",
              validations: [
                {
                  name: "required",
                  text: "Dette feltet er obligatorisk",
                  value: 0
                },
                {
                  name: "maxLength",
                  text: "Lengden p├Ñ verdien er for lang",
                  value: 25
                }
              ],
              settings: {
                required: true,
                maxLength: 25
              },
              cols: "12"
            },
            {
              component: "Radio",
              label: "Hvor lenge har du vert her?",
              options: [
                {
                  text: "Mindre enn 1 ├Ñr",
                  value: "0"
                },
                {
                  text: "1-3 ├Ñr",
                  value: "1"
                },
                {
                  text: "4-6 ├Ñr",
                  value: "2"
                },
                {
                  text: "7-10 ├Ñr",
                  value: "3"
                },
                {
                  text: "Mer enn 10 ├Ñr",
                  value: "4"
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
                multiple: false,
                required: true
              },
              cols: "6"
            },
            {
              component: "Checkbox",
              label: "Hvem var sjef mens du var her?",
              options: [
                {
                  text: "Michael Bruteig",
                  value: "Michael Bruteig"
                },
                {
                  text: "Anne Hilde Hagen",
                  value: "Anne Hilde Hagen"
                },
                {
                  text: "Andre",
                  value: "Andre"
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
              cols: "6"
            },
            {
              component: "Attachment",
              label: "Legg til et fint bilde fra din tid hos oss",
              options: [

              ],
              validations: [
                {
                  name: "required",
                  text: "Dette feltet er obligatorisk",
                  value: 0
                },
                {
                  name: "maxLength",
                  text: "Lengden p├Ñ verdien er for lang",
                  value: 1
                },
                {
                  name: "maxSize",
                  text: "St├╕rrelsen er for stor",
                  value: 104857600
                }
              ],
              settings: {
                maxSize: 104857600,
                required: true,
                accept: "image/*"
              },
              cols: "12",
              value: [

              ]
            }
          ]
        },
        {
          receiver: {
            text: "FPVS",
            value: "fpvs@mil.no"
          },
          fields: [
            {
              component: "Select",
              label: "Hvilken tjeneste ├╕nsker du?",
              options: [
                {
                  text: "Kundeservice",
                  value: "Kundeservice"
                },
                {
                  text: "R├Ñdgiver",
                  value: "R├Ñdgiver"
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
                  text: "Lengden p├Ñ verdien er for kort",
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
              component: "Textarea",
              label: "Kommentar",
              placeholder: "Skriv om saken din her",
              validations: [
                {
                  name: "required",
                  text: "Dette feltet er obligatorisk",
                  value: 0
                },
                {
                  name: "maxLength",
                  text: "Lengden p├Ñ verdien er for lang",
                  value: 2500
                }
              ],
              settings: {
                required: true,
                maxLength: 2500
              },
              cols: 12
            }
          ]
        }
      ]
    }
  })
};
</script>
