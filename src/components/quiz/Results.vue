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
        return "En real skivebom!";
      }
      if (percentage < 20) {
        return "Du prøvde i det minste!";
      }
      if (percentage < 40) {
        return "Det kunne ha gått bedre!";
      }
      if (percentage < 60) {
        return "Godt forsøk!";
      }
      if (percentage < 80) {
        return "Veldig bra!";
      }
      if (percentage < 100) {
        return "Nesten perfekt!";
      }
      return "Perfekt!";
    }
  }
};
</script>
