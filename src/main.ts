import Vue from "vue";
import page from "@/components/quiz/Quiz.vue";
import "./assets/style/main.css";
import "@babel/polyfill";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(page, {
    props: {
      title: "Title",
      subTitle: "Subtitle",
      startText: "<p>En helt vanlig tekst, hvor man kan legge inn hvilken som helst informasjon eller fakta rundt spørsmålet.</p>",
      endText: "<p>En helt vanlig tekst, hvor man kan legge inn hvilken som helst informasjon eller fakta rundt spørsmålet.</p>",
      questions: [
        {
          isImageLeft: false,
          text: "I hvilken kategori vil militære styrker spille en stor rolle?",
          desc: "<p>En helt vanlig tekst, hvor man kan legge inn hvilken som helst informasjon eller fakta rundt spørsmålet.</p>",
          media: {
            selected: "image",
            image: {
              src: "https://mk0smarthusetmpuks6w.kinstacdn.com/wp-content/uploads/2020/05/placeholder-1.png"
            },
            video: {
              src: ""
            }
          },
          options: [
            {
              text: "Økonomisk sikkerhet",
              isCorrect: true
            },
            {
              text: "Sikkerhet for mat",
              isCorrect: false
            },
            {
              text: "Sikkerhet for helse",
              isCorrect: false
            },
            {
              text: "Omgivelsessikkerhet",
              isCorrect: true
            },
            {
              text: "Samfunnssikerhet",
              isCorrect: true
            },
            {
              text: "Politisk sikkerhet",
              isCorrect: true
            },
            {
              text: "Personlig og fysisk sikkerhet",
              isCorrect: false
            },
            {
              text: "Lokal sikkerhet",
              isCorrect: false
            }
          ]
        },
        {
          isImageLeft: true,
          text: "I hvilken kategori vil militære styrker spille en stor rolle?",
          desc: "<p>En helt vanlig tekst, hvor man kan legge inn hvilken som helst informasjon eller fakta rundt spørsmålet.</p>",
          media: {
            selected: "image",
            image: "https://mk0smarthusetmpuks6w.kinstacdn.com/wp-content/uploads/2020/05/placeholder-1.png",
            video: ""
          },
          options: [
            {
              text: "Lorem ipsum",
              isCorrect: false
            },
            {
              text: "Lorem ipsum",
              isCorrect: true
            },
            {
              text: "Lorem ipsum",
              isCorrect: false
            },
            {
              text: "Lorem ipsum",
              isCorrect: false
            },
            {
              text: "Lorem ipsum",
              isCorrect: true
            },
            {
              text: "Lorem ipsum",
              isCorrect: false
            },
            {
              text: "Lorem ipsum",
              isCorrect: false
            },
            {
              text: "Lorem ipsum",
              isCorrect: false
            }
          ]
        },
        {
          isImageLeft: true,
          text: "I hvilken kategori vil militære styrker spille en stor rolle?",
          desc: "<p>En helt vanlig tekst, hvor man kan legge inn hvilken som helst informasjon eller fakta rundt spørsmålet.</p>",
          media: {
            selected: "image",
            image: "https://mk0smarthusetmpuks6w.kinstacdn.com/wp-content/uploads/2020/05/placeholder-1.png",
            video: ""
          },
          options: [
            {
              text: "Lorem ipsum",
              isCorrect: false
            },
            {
              text: "Lorem ipsum",
              isCorrect: true
            },
            {
              text: "Lorem ipsum",
              isCorrect: false
            },
            {
              text: "Lorem ipsum",
              isCorrect: false
            },
            {
              text: "Lorem ipsum",
              isCorrect: true
            },
            {
              text: "Lorem ipsum",
              isCorrect: false
            },
            {
              text: "Lorem ipsum",
              isCorrect: false
            },
            {
              text: "Lorem ipsum",
              isCorrect: false
            }
          ]
        },
        {
          isImageLeft: true,
          text: "I hvilken kategori vil militære styrker spille en stor rolle?",
          desc: "<p>En helt vanlig tekst, hvor man kan legge inn hvilken som helst informasjon eller fakta rundt spørsmålet.</p>",
          media: {
            selected: "image",
            image: "https://mk0smarthusetmpuks6w.kinstacdn.com/wp-content/uploads/2020/05/placeholder-1.png",
            video: ""
          },
          options: [
            {
              text: "Lorem ipsum",
              isCorrect: false
            },
            {
              text: "Lorem ipsum",
              isCorrect: true
            },
            {
              text: "Lorem ipsum",
              isCorrect: false
            },
            {
              text: "Lorem ipsum",
              isCorrect: false
            },
            {
              text: "Lorem ipsum",
              isCorrect: true
            },
            {
              text: "Lorem ipsum",
              isCorrect: false
            },
            {
              text: "Lorem ipsum",
              isCorrect: false
            },
            {
              text: "Lorem ipsum",
              isCorrect: false
            }
          ]
        },
        {
          isImageLeft: true,
          text: "I hvilken kategori vil militære styrker spille en stor rolle?",
          desc: "<p>En helt vanlig tekst, hvor man kan legge inn hvilken som helst informasjon eller fakta rundt spørsmålet.</p>",
          media: {
            selected: "image",
            image: "https://mk0smarthusetmpuks6w.kinstacdn.com/wp-content/uploads/2020/05/placeholder-1.png",
            video: ""
          },
          options: [
            {
              text: "Lorem ipsum",
              isCorrect: false
            },
            {
              text: "Lorem ipsum",
              isCorrect: true
            },
            {
              text: "Lorem ipsum",
              isCorrect: false
            },
            {
              text: "Lorem ipsum",
              isCorrect: false
            },
            {
              text: "Lorem ipsum",
              isCorrect: true
            },
            {
              text: "Lorem ipsum",
              isCorrect: false
            },
            {
              text: "Lorem ipsum",
              isCorrect: false
            },
            {
              text: "Lorem ipsum",
              isCorrect: false
            }
          ]
        }
      ]
      // title: "Tittel",
      // text: "<p>Hello</p>",
      // isImageLeft: false,
      // image: "https://mk0smarthusetmpuks6w.kinstacdn.com/wp-content/uploads/2020/05/placeholder-1.png",
      // backgroundColor: "blue-light"
      // title: "Personell 2015 - 2019",
      // subTitle: "Sjøforsvaret",
      // areaData: {
      //   xText: "År",
      //   yText: "Antall",
      //   categories: ["2016", "2017", "2018", "2019"],
      //   series: [
      //     {
      //       name: "Personell/administrasjon",
      //       data: [16446786000, 16802323000, 17709906000, 17047125000]
      //     },
      //     {
      //       name: "Materiell",
      //       data: [13679036000, 13909268000, 17751288000, 15918309000]
      //     },
      //     {
      //       name: "Eiendom, bygg og anlegg",
      //       data: [3860897000, 2785993000, 2865377000, 3041091000]
      //     },
      //     {
      //       name: "Kostnader Etterretningstjenesten",
      //       data: [2140138000, 2321218000, 2614365000, 2618390000]
      //     }
      //   ]
      // }
      // title: "Personell 2015 - 2019",
      // subTitle: "Sjøforsvaret",
      // lineData: {
      //   xText: "År",
      //   yText: "Antall",
      //   categories: ["2015", "2016", "2017", "2018", "2019"],
      //   series: [
      //     {
      //       name: "Millitære",
      //       data: [1740, 1728, 1699, 1599, 1642]
      //     },
      //     {
      //       name: "Sivile",
      //       data: [215, 209, 196, 186, 180]
      //     },
      //     {
      //       name: "Førstegangstjeneste",
      //       data: [1483, 1629, 1540, 1644, 1769]
      //     }
      //   ]
      // }
      // title: "Forsvarets totale kostnader",
      // subTitle: "For året 2019",
      // pieData: {
      //   series: [
      //     { name: "Hæren", y: 6761491000 },
      //     { name: "Sjøforsvaret inkl. Kystvakten", y: 7144670000 },
      //     { name: "Luftforsvaret inkl. Redningstjenesten", y: 9172095000 },
      //     { name: "Heimevernet", y: 1508964000 },
      //     { name: "Forsvarets logistikkorganisasjon", y: 3569671000 },
      //     { name: "Cyberforsvaret", y: 2084381000 },
      //     { name: "Forsvarets operative hovedkvarter", y: 685298000 },
      //     { name: "Etterretningstjenesten", y: 2618390000 },
      //     { name: "Øvrige avdelinger", y: 5079955000 }
      //   ]
      // }
    }
  })
}).$mount("#app");
