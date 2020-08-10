import Vue from "vue";
import page from "./App.vue";
import "./assets/style/main.css";
import "@babel/polyfill";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(page)
}).$mount("#app");
