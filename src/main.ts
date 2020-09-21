import Vue from "vue";
import page from "./App.vue";
import "./assets/style/diagram.css";
import "./assets/style/main.css";
import "./assets/style/quiz.css";
import "./assets/style/stepper.css";
import "./assets/style/story.css";
import "./assets/style/promocard-horizontal.css";
import "@babel/polyfill";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(page)
}).$mount("#app");
