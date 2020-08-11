<template>
  <div
    class="grey-light quiz__wrapper-inner"
  >
    <div
      class="container"
    >
      <div
        v-if="currentQuestionIndex !== 0 && currentQuestionIndex !== questions.length + 1"
        class="quiz__progress"
      >
        {{ `Spørsmål ${currentQuestionIndex} av ${questions.length}` }}
      </div>
      <v-stepper
        v-model="currentQuestionIndex"
      >
        <v-stepper-items>
          <v-stepper-content
            :step="0"
          >
            <Start
              :title="title"
              :subTitle="subTitle"
              :startText="startText"
              :id="id"
              :media="media"
            />
          </v-stepper-content>
          <v-stepper-content
            v-for="(question, i) in questions"
            :key="i"
            :step="i + 1"
          >
            <Question
              :question="question"
              :index="i"
              :total="questions.length"
              :id="id"
            />
          </v-stepper-content>
          <v-stepper-content
            :step="questions.length + 1"
          >
            <Results
              :points="points"
              :total="questions.length"
              :endText="endText"
              :id="id"
            />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
  </div>
</template>

<script>
import { v1 } from "uuid";
import vuetify from "../../plugins/vuetify-quiz.es6";
import Question from "./Question.vue";
import EventBus from "../../event-bus.es6";
import Results from "./Results.vue";
import Start from "./Start.vue";

export default {
  name: "Quiz",
  vuetify: vuetify,
  components: {
    Question,
    Results,
    Start
  },
  data: () => ({
    points: 0,
    id: v1(),
    currentQuestionIndex: 0
  }),
  props: {
    questions: {
      type: [Array, Boolean],
      default: false
    },
    endText: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    },
    startText: {
      type: String,
      default: ""
    },
    media: {
      type: [Object, Boolean],
      default: false
    }
  },
  created() {
    EventBus.$on("quiz__next", (id) => (id && id === this.id && this.next()));
    EventBus.$on("quiz__point", (id) => (id && id === this.id && this.points++));
    EventBus.$on("quiz__start", (id) => {
      if (id && id === this.id) {
        this.currentQuestionIndex = 1;
      }
    });
    EventBus.$on("quiz__restart", (id) => {
      if (id === this.id) {
        this.currentQuestionIndex = 0;
        this.points = 0;
      }
    });
  },
  methods: {
    next: function () {
      if (this.currentQuestionIndex <= this.questions.length) {
        this.currentQuestionIndex++;
      }
    }
  }
};
</script>

<!--<style>-->
<!--.quiz__wrapper, .quiz__wrapper-inner {-->
<!--  padding: 5rem 0;-->
<!--}-->
<!--.quiz__progress {-->
<!--  font-weight: 600;-->
<!--  font-size: 1.4rem;-->
<!--  padding-bottom: 1.5rem;-->
<!--}-->
<!--.quiz__wrapper-inner .v-stepper {-->
<!--  box-shadow: none;-->
<!--  background: inherit;-->
<!--}-->
<!--.quiz__wrapper-inner .v-stepper__content {-->
<!--  padding: 0;-->
<!--  transition: .3s ease-in-out;-->
<!--}-->
<!--.quiz__progress {-->
<!--  font-size: 1.125rem;-->
<!--  padding-bottom: .5rem;-->
<!--}-->
<!--@media (max-width: 767px) {-->
<!--  .quiz__wrapper, .quiz__wrapper-inner {-->
<!--    padding: 2rem 0;-->
<!--  }-->
<!--}-->
<!--</style>-->
<!--<style>-->
<!--.quiz__button {-->
<!--  font-size: 1rem;-->
<!--  font-weight: 500;-->
<!--  margin-left: 1rem;-->
<!--  padding: .625rem 2.5rem;-->
<!--  border-radius: 2em;-->
<!--  border: 2px solid #191B21;-->
<!--  color: #191B21;-->
<!--  text-decoration: none;-->
<!--}-->
<!--.quiz__button-wrapper {-->
<!--  text-align: center;-->
<!--}-->
<!--.quiz__feedback {-->
<!--  font-size: 3.75rem;-->
<!--  max-width: 680px;-->
<!--  text-align: center;-->
<!--  margin: 0 auto;-->
<!--  font-weight: 600;-->
<!--}-->
<!--.quiz__text {-->
<!--  font-size: 2rem;-->
<!--  padding: 5rem 0;-->
<!--  max-width: 680px;-->
<!--  text-align: center;-->
<!--  margin: 0 auto;-->
<!--  font-weight: 600;-->
<!--}-->
<!--.quiz__text-area {-->
<!--  max-width: 680px;-->
<!--  margin: auto;-->
<!--  text-align: center;-->
<!--  padding-bottom: 2rem;-->
<!--}-->
<!--@media (max-width: 767px) {-->
<!--  .quiz__button-wrapper {-->
<!--    text-align: left;-->
<!--  }-->
<!--  .quiz__feedback {-->
<!--    font-size: 1.75rem;-->
<!--    text-align: left;-->
<!--  }-->
<!--  .quiz__text {-->
<!--    font-size: 1.125rem;-->
<!--    text-align: left;-->
<!--    padding: 2rem 0 3rem 0;-->
<!--  }-->
<!--  .quiz__button {-->
<!--    padding: .25rem 1.25rem;-->
<!--    margin-left: 0;-->
<!--  }-->
<!--  .quiz__text-area {-->
<!--    text-align: left;-->
<!--    padding-bottom: 1rem;-->
<!--  }-->
<!--}-->
<!--</style>-->
