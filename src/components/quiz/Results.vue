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
      {{ `Du hadde ${points} av ${total} spørsmål riktig.` }}
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
          Prøv igjen
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import EventBus from "../../event-bus.es6";

export default {
  name: "Results",
  props: {
    points: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    endText: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    },
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
