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
    EventBus.$on("story__fs-seen", (obj) => {
      if (obj.id === this.id && obj.index === this.index) {
        this.isSeen = true;
      }
    });
  },
  methods: {
    onStoryClick: function () {
      EventBus.$emit("story__fullscreen-open", { id: this.id, index: this.index });
    }
  }
};
</script>

<style scoped>
.story__mobile-image {
  cursor: pointer;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 2px solid #191b21;
  overflow: hidden;
  padding: 2px;
  position: relative;
}
.story__mobile-image .story__mobile-image-image {
  width: 82px;
  height: 82px;
  border-radius: 100%;
  background-position: center;
  background-size: cover;
}
.story__mobile-seen .story__mobile-image .story__mobile-image-image {
  filter: brightness(80%);
}
.story__mobile-image-wrapper {
  margin: 0 1rem;
}
.story__mobile-replay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.story__mobile-image:hover .story__mobile-replay svg {
  transform: rotate(-360deg);
}
.story__mobile-replay svg {
  width: 26px;
  height: 24px;
  position: relative;
  display: block;
  transition: transform .5s ease-in-out;
  transform-origin: 56% 50%;
}
@media (max-width: 366px) {
  .story__mobile-image-wrapper {
    margin: 0 .25rem;
  }
}
</style>
