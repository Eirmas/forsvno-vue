<template>
  <div>
    <h1
      class="quiz__feedback"
    >
      {{ title }}
    </h1>
    <h2
      class="quiz__text"
    >
      {{ subTitle }}
    </h2>
    <div
      class="quiz__text-area"
      v-html="startText"
    />
    <div
      class="quiz__button-wrapper"
    >
      <button
        class="quiz__button"
        @click="start"
      >
        <span
          class="underline-draw"
        >
          Sett i gang
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
    }
  },
  methods: {
    start: function () {
      EventBus.$emit("quiz__start", this.id);
    }
  }
};
</script>
