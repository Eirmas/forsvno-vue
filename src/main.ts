import Vue from "vue";
import page from "@/components/Stepper.vue";
import "./assets/style/main.css";
import "@babel/polyfill";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(page, {
    props: {
      data: [
        {
          text: "Studietiden (3 år)",
          active: false
        },
        {
          text: "Praksisperiode (3 år)",
          active: false
        },
        {
          text: "Ferdig med utdanningen",
          active: true
        },
        {
          text: "Jobbmulighet videre",
          active: true
        },
        {
          text: "Heimevernet/verneplikt",
          active: false
        }
      ]
    }
  })
}).$mount("#app");
