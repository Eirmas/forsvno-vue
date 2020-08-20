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

/**
 * This components displays the profile picture button when on mobile.
 * It can be clicked to open the mobile modal.
 * Displays a replay button if seen.
 */
export default {
  name: "StoryMobile",
  components: {
    ReplayIcon
  },
  data: () => ({
    /**
     * Determines weather the story has been seen.
     */
    isSeen: false
  }),
  props: {
    /**
     * The index of the story
     */
    index: {
      type: Number,
      default: 0
    },
    /**
     * Title of the story. Is displayed underneath the round profile picture button.
     */
    title: {
      type: String,
      default: ""
    },
    /**
     * String with url to profile picture
     */
    profilePic: {
      type: String,
      default: ""
    },
    /**
     * String with ID of the story part.
     * We use this to communicate with other components with eventbus emits.
     * We need this ID to not interfere with other story parts.
     */
    id: {
      type: String,
      default: ""
    }
  },
  created() {
    EventBus.$on("story__fs-seen", this.checkSeen);
  },
  methods: {
    /**
     * Checks if this story has been seen.
     * @param obj: { id: string; index: number }
     */
    checkSeen: function (obj) {
      if (obj.id === this.id && obj.index === this.index) {
        this.isSeen = true;
      }
    },
    /**
     * Tells story part to open the modal and play the clicked story.
     */
    onStoryClick: function () {
      EventBus.$emit("story__fullscreen-open", { id: this.id, index: this.index });
    }
  },
  beforeDestroy() {
    EventBus.$off("story__fs-seen", this.checkSeen);
  }
};
</script>
