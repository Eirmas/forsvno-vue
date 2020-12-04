<template>
  <div style="text-align: center">
    <h1
      class="quiz__start-title quiz__feedback"
    >
      {{ title }}
    </h1>
    <img
      v-if="media.selected === 'image'"
      :src="media.image.src"
      class="quiz__image"
    />
    <QBrick
      v-else-if="media.selected === 'video'"
      :qbrick="media.video"
      :id="id"
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
          {{ localize.start_quiz }}
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import EventBus from "../../event-bus.es6";
import QBrick from "./QBrick.vue";

export default {
  name: "Start",
  components: {
    QBrick
  },
  inject: ["localize"],
  props: {
    /**
     * ID of the quiz part.
     */
    id: {
      type: String,
      default: ""
    },
    /**
     * Title of the quiz.
     */
    title: {
      type: String,
      default: ""
    },
    /**
     * Sub title of the quiz.
     */
    subTitle: {
      type: String,
      default: ""
    },
    /**
     * A descriptive text of the quiz.
     */
    startText: {
      type: String,
      default: ""
    },
    /**
     * Optional picture or video.
     */
    media: {
      type: [Object, Boolean],
      default: false
    }
  },
  methods: {
    /**
     * Tells parent to go to next slide.
     */
    start: function () {
      EventBus.$emit("quiz__next", this.id);
    }
  }
};
</script>
