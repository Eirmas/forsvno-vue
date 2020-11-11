import Quiz from "./components/quiz/Quiz.vue";
import "@babel/polyfill";
import setupVue from "./setup.es6";

// eslint-disable-next-line @typescript-eslint/no-empty-function
setupVue(".quiz", Quiz);
