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
              :feedback="feedback"
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
    },
    feedback: {
      type: [Object, Boolean],
      default: false
    }
  },
  created() {
    EventBus.$on("quiz__next", (id) => (id && id === this.id && this.next()));
    EventBus.$on("quiz__point", (id) => (id && id === this.id && this.points++));
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
