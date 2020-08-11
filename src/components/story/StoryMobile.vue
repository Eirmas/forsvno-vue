<template>
  <div
    :class="(isSeen) ? 'story__mobile-seen story__mobile' : 'story__mobile'"
  >
    <div
      class="story__mobile-image-wrapper"
    >
      <button
        class="story__mobile-image"
        @click="onStoryClick"
      >
        <div
          class="story__mobile-image-image"
          :style="`background-image: url('${profilePic}')`"
        />
        <div
          v-if="isSeen"
          class="story__mobile-replay"
        >
          <ReplayIcon />
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import ReplayIcon from "./ReplayIcon.vue";
import EventBus from "../../event-bus.es6";

export default {
  name: "StoryMobile",
  components: {
    ReplayIcon
  },
  data: () => ({
    isSeen: false
  }),
  props: {
    index: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ""
    },
    profilePic: {
      type: String,
      default: ""
    },
    storyItems: {
      type: [Array, Boolean],
      default: false
    },
    id: {
      type: String,
      default: ""
    }
  },
  created() {
    EventBus.$on("story__fs-seen", this.checkSeen);
  },
  methods: {
    checkSeen: function (obj) {
      if (obj.id === this.id && obj.index === this.index) {
        this.isSeen = true;
      }
    },
    onStoryClick: function () {
      EventBus.$emit("story__fullscreen-open", { id: this.id, index: this.index });
    }
  },
  beforeDestroy() {
    EventBus.$off("story__fs-seen", this.checkSeen);
  }
};
</script>
