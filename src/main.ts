import Vue from "vue";
import App from "./App.vue";
import "./assets/style/diagram.css";
import "./assets/style/main.css";
import "./assets/style/quiz.css";
import "./assets/style/stepper.css";
import "./assets/style/story.css";
import "./assets/style/promocard-horizontal.css";
import "./assets/style/slang-words.css";
import "@babel/polyfill";
import "./assets/style/stepper.css";
import "./assets/style/main.css";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount("#app");
