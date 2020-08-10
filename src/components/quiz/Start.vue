<template>
  <div style="text-align: center">
    <h1
      class="quiz__start-title quiz__feedback"
    >
      {{ title }}
    </h1>
    <img
      v-if="image"
      :src="image"
      class="quiz__image"
    />
    <h2
      class="quiz__start-sub-title quiz__text"
    >
      {{ subTitle }}
    </h2>
    <div
      class="quiz__start-text quiz__text-area"
      v-html="startText"
    />
    <div
      class="quiz__start-btn quiz__button-wrapper"
    >
      <button
        class="quiz__button"
        @click="start"
      >
        <span
          class="underline-draw"
        >
          Start quiz
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import EventBus from "../../event-bus.es6";

export default {
  name: "Start",
  props: {
    id: {
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
    image: {
      type: [String, Boolean],
      default: false
    }
  },
  methods: {
    start: function () {
      EventBus.$emit("quiz__start", this.id);
    }
  }
};
</script>
<!--<style>-->
<!--.quiz__start-title, .quiz__start-text {-->
<!--  text-align: left !important;-->
<!--  padding-bottom: 1rem;-->
<!--}-->
<!--.quiz__image {-->
<!--  max-width: 680px;-->
<!--  width: 100%;-->
<!--  margin: 1rem auto;-->
<!--  text-align: left !important;-->
<!--}-->
<!--.quiz__start-btn {-->
<!--  max-width: 680px;-->
<!--  text-align: left !important;-->
<!--  margin: 0 auto;-->
<!--}-->
<!--.quiz__start-btn .quiz__button {-->
<!--  margin: 0;-->
<!--}-->
<!--.quiz__start-sub-title {-->
<!--  padding: 1.25rem 0 !important;-->
<!--  text-align: left !important;-->
<!--}-->
<!--</style>-->
