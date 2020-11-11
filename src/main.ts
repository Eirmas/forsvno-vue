import Vue from "vue";
import App from "./App.vue";
import "@babel/polyfill";
import "./assets/style/quiz.css";
import "./assets/style/main.css";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount("#app");
