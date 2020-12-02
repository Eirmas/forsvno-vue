<template>
  <div>
    <div
      :class="['quiz__question-header row', question.isImageLeft ? '' : 'quiz__question-header-reverse']"
    >
      <div
        v-if="question.media"
        class="quiz__question-header-media col-lg-6"
      >
        <img
          v-if="question.media.selected === 'image'"
          :src="question.media.image.src"
          :lazy-src="question.media.image.src"
        />
        <QBrick
          v-else-if="question.media.selected === 'video'"
          :qbrick="question.media.video"
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
        :disabled="!isNextQuestionDisabled"
        class="quiz__question-button"
        @click="checkAnswer"
      >
        <span
          :class="[isNextQuestionDisabled ? 'underline-draw' : '']"
        >
          Sjekk svaret
        </span>
      </button>
      <button
        :disabled="isNextQuestionDisabled"
        class="quiz__question-button"
        @click="nextQuestion"
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
import EventBus from "../../event-bus.es6";
import QBrick from "./QBrick.vue";

export default {
  name: "Question",
  components: {
    QBrick
  },
  data: () => ({
    /**
     * Array that holds users selected answers.
     * It stores the answers index.
     */
    selected: [],
    /**
     * Boolean to tell if user is able to go to the next question.
     */
    isNextQuestionDisabled: true
  }),
  props: {
    /**
     * @values {
     *   text: string;
     *   desc: string;
     *   media: {
     *     selected: string;
     *     image: {
     *       src: string;
     *     };
     *     video: QBrick object;
     *   }
     *   isImageLeft: Boolean;
     *   options: {
     *     text: string;
     *     isCorrect: Boolean;
     *   }
     * }
     */
    question: {
      type: [Object, Boolean],
      default: false
    },
    /**
     * Index of the current question.
     */
    index: {
      type: Number,
      default: 0
    },
    /**
     * Total number of questions in the quiz. Used to determine weather to show "Neste oppgave"
     * or "Resultat" on the button.
     */
    total: {
      type: Number,
      default: 0
    },
    /**
     * ID of the quiz part.
     */
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
    /**
     * Toggles the selected answer option.
     * @param i: number
     */
    toggle: function (i) {
      if (this.isNextQuestionDisabled) {
        if (this.selected.includes(i)) {
          this.selected.splice(this.selected.indexOf(i), 1);
        } else {
          this.selected.push(i);
        }
      }
    },
    /**
     * Checks if user got the question correct or wrong.
     * If correct -> tell parent to add one point.
     */
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
    /**
     * Tell parent to go to next slide.
     */
    nextQuestion: function () {
      if (!this.isNextQuestionDisabled) {
        EventBus.$emit("quiz__next", this.id);
      }
    },
    /**
     * Used to determine class of the answer options.
     * Is shown after user has clicked "Sjekk svaret".
     *
     * @param i: index
     * @returns {string}
     */
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
