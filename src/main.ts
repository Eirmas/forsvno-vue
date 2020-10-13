import Vue from "vue";
import App from "./App.vue";
import "./assets/style/promocard-horizontal.css";
import "./assets/style/main.css";
import "@babel/polyfill";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount("#app");
