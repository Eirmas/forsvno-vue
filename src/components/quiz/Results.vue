<template>
  <div>
    <h1
      class="quiz__feedback"
    >
      {{ getMessage }}
    </h1>
    <h2
      class="quiz__text"
    >
      {{ localize.quiz__result_text.replace("{0}", points).replace("{1}", total) }}
    </h2>
    <div
      class="quiz__text-area"
      v-html="endText"
    />
    <div
      class="quiz__button-wrapper"
    >
      <button
        class="quiz__button"
        @click="restart"
      >
        <span
          class="underline-draw"
        >
          {{ localize.quiz__try_again}}
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import EventBus from "../../event-bus.es6";

export default {
  name: "Results",
  inject: ["localize"],
  props: {
    /**
     * Users result points.
     */
    points: {
      type: Number,
      default: 0
    },
    /**
     * The number of questions in the quiz. (Also the maximum number of points)
     */
    total: {
      type: Number,
      default: 0
    },
    /**
     * A descriptive text displayed after quiz is taken.
     */
    endText: {
      type: String,
      default: ""
    },
    /**
     * ID of the quiz.
     */
    id: {
      type: String,
      default: ""
    },
    /**
     * Optional feedback override. Editor can choose to write own custom feedback messages.
     */
    feedback: {
      type: [Object, Boolean],
      default: false
    }
  },
  methods: {
    restart: function () {
      EventBus.$emit("quiz__restart", this.id);
    }
  },
  computed: {
    /**
     * Returns the result message.
     * @returns string
     */
    getMessage: function () {
      const percentage = (this.points / this.total) * 100;
      if (percentage === 0) {
        return (this.feedback && this.feedback.feedback0) ? this.feedback.feedback0 : "En real skivebom!";
      }
      if (percentage < 20) {
        return (this.feedback && this.feedback.feedback1) ? this.feedback.feedback1 : "Du prøvde i det minste!";
      }
      if (percentage < 40) {
        return (this.feedback && this.feedback.feedback2) ? this.feedback.feedback2 : "Det kunne ha gått bedre!";
      }
      if (percentage < 60) {
        return (this.feedback && this.feedback.feedback3) ? this.feedback.feedback3 : "Godt forsøk!";
      }
      if (percentage < 80) {
        return (this.feedback && this.feedback.feedback4) ? this.feedback.feedback4 : "Veldig bra!";
      }
      if (percentage < 100) {
        return (this.feedback && this.feedback.feedback5) ? this.feedback.feedback5 : "Nesten perfekt!";
      }
      return (this.feedback && this.feedback.feedback6) ? this.feedback.feedback6 : "Perfekt!";
    }
  }
};
</script>
