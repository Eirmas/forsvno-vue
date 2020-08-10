<template>
  <div>
    <div
      :class="['quiz__question-header row', !question.isImageLeft ? 'quiz__question-header-reverse' : '']"
    >
      <div
        v-if="question.media"
        class="quiz__question-header-media col-lg-6"
      >
        <v-img
          v-if="question.media.selected === 'image'"
          :src="question.media.image.src"
        />
      </div>
      <div
        class="quiz__question-header-info col-lg-6"
      >
        <h2
          class="quiz__question-header-text"
        >
          {{ question.text }}
        </h2>
        <div
          v-html="question.desc"
        />
      </div>
    </div>
    <div
      class="quiz__question-body"
    >
      <div
        class="quiz__question-alternative-text"
      >
        Alternativer
      </div>
      <div
        class="quiz__question-options"
      >
        <button
          v-for="(option, i) in question.options"
          :key="i"
          :class="[
            'quiz__question-option',
             selected.includes(i) ? 'quiz__question-option-active' : '',
             (!isNextQuestionDisabled) ? determineClass(i) : ''
             ]"
          :disabled="!isNextQuestionDisabled"
          @click="toggle(i)"
        >
          <b>
            {{ `${"ABCDEFGH"[i]}: ` }}
          </b>
          <span
            :class="[isNextQuestionDisabled ? 'underline-draw' : '']"
          >
            {{ option.text }}
          </span>
        </button>
      </div>
    </div>
    <div
      class="quiz__question-footer"
    >
      <button
        @click="checkAnswer"
        :disabled="!isNextQuestionDisabled"
        class="quiz__question-button"
      >
        <span
          :class="[isNextQuestionDisabled ? 'underline-draw' : '']"
        >
          Sjekk svaret
        </span>
      </button>
      <button
        @click="nextQuestion"
        :disabled="isNextQuestionDisabled"
        class="quiz__question-button"
      >
        <span
          :class="[!isNextQuestionDisabled ? 'underline-draw' : '']"
        >
          {{ (index + 1 === total) ? 'Resultat' : 'Neste oppgave' }}
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import vuetify from "../../plugins/vuetify-quiz.es6";
import EventBus from "../../event-bus.es6";

export default {
  name: "Question",
  vuetify: vuetify,
  data: () => ({
    selected: [],
    isNextQuestionDisabled: true
  }),
  props: {
    question: {
      type: [Object, Boolean],
      default: false
    },
    index: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    id: {
      type: String,
      default: ""
    }
  },
  created() {
    EventBus.$on("quiz__restart", (id) => {
      if (id === this.id) {
        this.selected = [];
        this.isNextQuestionDisabled = true;
      }
    });
  },
  methods: {
    toggle: function (i) {
      if (this.isNextQuestionDisabled) {
        if (this.selected.includes(i)) {
          this.selected.splice(this.selected.indexOf(i), 1);
        } else {
          this.selected.push(i);
        }
      }
    },
    checkAnswer: function () {
      this.isNextQuestionDisabled = false;
      if (this.selected.length === this.question.options.filter((v) => v.isCorrect).length) {
        const correctAnswers = this.question.options.map((v, i) => ({
          index: i,
          isCorrect: v.isCorrect
        })).filter((v) => v.isCorrect).map((v) => v.index);
        if (JSON.stringify(correctAnswers.sort()) === JSON.stringify(this.selected.sort())) {
          EventBus.$emit("quiz__point", this.id);
        }
      }
    },
    nextQuestion: function () {
      if (!this.isNextQuestionDisabled) {
        EventBus.$emit("quiz__next", this.id);
      }
    },
    determineClass: function (i) {
      const correctAnswers = this.question.options.map((v, index) => ({
        index: index,
        isCorrect: v.isCorrect
      })).filter((v) => v.isCorrect).map((v) => v.index);
      if (correctAnswers.includes(i)) {
        return "quiz__question-option-correct";
      }
      if (this.selected.includes(i)) {
        return "quiz__question-option-wrong";
      }
      return "";
    }
  }
};
</script>

<!--<style scoped>-->
<!--.quiz__question-header-text {-->
<!--  padding-bottom: 2.75rem;-->
<!--  font-size: 2.625rem;-->
<!--  font-weight: 600;-->
<!--}-->
<!--.quiz__question-header-media {-->
<!--  align-self: center;-->
<!--}-->
<!--.quiz__question-alternative-text {-->
<!--  font-weight: 600;-->
<!--  font-size: 1.4rem;-->
<!--  padding: 2.5rem 0 1.5rem 0;-->
<!--}-->
<!--.quiz__question-options {-->
<!--  display: flex;-->
<!--  flex-wrap: wrap;-->
<!--}-->
<!--.quiz__question-option {-->
<!--  transition: background-color .1s ease-in-out;-->
<!--  background-color: #e2e6e9;-->
<!--  border-radius: 0;-->
<!--  width: calc(50% - 1rem - 6px);-->
<!--  padding: 1.5em 3em;-->
<!--  margin: 1rem 1rem 1rem 3px;-->
<!--  font-size: 1.3rem;-->
<!--  font-weight: 500;-->
<!--  cursor: pointer;-->
<!--  text-align: left;-->
<!--}-->
<!--.quiz__question-option:nth-child(even) {-->
<!--  margin: 1rem 0 1rem 1rem;-->
<!--}-->
<!--.quiz__question-option:hover {-->
<!--  background-color: #C6C7C4;-->
<!--}-->
<!--.quiz__question-option:disabled:hover {-->
<!--  background-color: #e2e6e9;-->
<!--}-->
<!--.quiz__question-option-active, .quiz__question-option-active:disabled:hover {-->
<!--  background-color: #191B21;-->
<!--  outline: 3px solid #191B21;-->
<!--  color: #fff;-->
<!--}-->
<!--.quiz__question-option-active:hover {-->
<!--  background-color: #323540;-->
<!--}-->
<!--.quiz__question-option-correct, .quiz__question-option-correct:disabled:hover {-->
<!--  background-color: #4D7247;-->
<!--  color: #fff;-->
<!--}-->
<!--.quiz__question-option-wrong, .quiz__question-option-wrong:disabled:hover {-->
<!--  background-color: #8C3434;-->
<!--  color: #fff;-->
<!--}-->
<!--.quiz__question-header-reverse {-->
<!--  flex-direction: row-reverse;-->
<!--  flex-wrap: wrap-reverse;-->
<!--}-->
<!--.quiz__question-button {-->
<!--  font-size: 1rem;-->
<!--  font-weight: 500;-->
<!--  margin-left: 1rem;-->
<!--  padding: .625rem 2.5rem;-->
<!--  border-radius: 2em;-->
<!--  border: 2px solid #191B21;-->
<!--  color: #191B21;-->
<!--  text-decoration: none;-->
<!--}-->
<!--.quiz__question-button:disabled {-->
<!--  border: 2px solid #8A8A8A;-->
<!--  color: #8A8A8A;-->
<!--}-->
<!--.quiz__question-footer {-->
<!--  text-align: right;-->
<!--  padding-top: 2rem;-->
<!--}-->
<!--@media (max-width: 767px) {-->
<!--  .quiz__question-option, .quiz__question-option:nth-child(even) {-->
<!--    margin: 0.5rem 3px;-->
<!--    width: calc(100% - 6px);-->
<!--    padding: .5em 1em;-->
<!--    font-size: 1.125rem;-->
<!--    font-weight: 500;-->
<!--    cursor: pointer;-->
<!--    text-align: left;-->
<!--  }-->
<!--  .quiz__question-header-text {-->
<!--    padding-bottom: 1rem;-->
<!--    font-size: 1.4rem;-->
<!--  }-->
<!--  .quiz__question-alternative-text {-->
<!--    font-weight: 600;-->
<!--    font-size: 1.125rem;-->
<!--    padding: 0;-->
<!--  }-->
<!--  .quiz__question-footer {-->
<!--    padding-top: 0;-->
<!--    justify-content: space-between;-->
<!--    display: flex;-->
<!--  }-->
<!--  .quiz__question-button {-->
<!--    padding: .5rem 1.25rem;-->
<!--    margin-top: 1rem;-->
<!--    margin-left: 0;-->
<!--  }-->
<!--  .quiz__question-header-reverse {-->
<!--    flex-direction: unset;-->
<!--  }-->
<!--}-->
<!--</style>-->
