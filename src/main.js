import Vue from "vue";

import App from "./App.vue";
import Fragment from "vue-fragment";

import "./assets/main.css";

Vue.use(Fragment.Plugin);

// global filter for table values
Vue.filter("formatDisplayValue", function (value, format) {
  if (!value) return "";

  if (format === "Yield") {
    return String(Math.round(value * 1000) / 1000) + "%";
  }

  return `${value > 0 ? "+" : ""}${Math.floor(value * 1000) / 1000}bp`;
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
