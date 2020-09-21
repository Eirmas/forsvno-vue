<template>
  <div
    ref="wrapper"
    class="story__fs-wrapper"
  >
    <div
      class="story__header"
    >
      <template
        v-for="(_item, i) in story.storyItems"
      >
        <ProgressHeader
          v-if="i === storyItemIndex"
          :key="i"
          :total="story.storyItems.length"
          :progress="storyItemProgress"
          :current-index="storyItemIndex"
        />
      </template>
      <div class="story__user">
        <div class="story__user-wrapper">
          <div
            :style="`background-image: url('${story.profilePic}');`"
            class="story__user-pic"
          />
          <p class="story__user-title">{{ story.title }}</p>
        </div>
        <button
          ref="close"
          class="story__user-close"
          tabindex="-1"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
    <div>
      <div
        v-if="story && story.storyItems !== undefined"
        :key="renderKey"
      >
        <StoryVideo
          v-if="story.storyItems[storyItemIndex].type === 'video'"
          ref="video"
          class="story__fs-qbrick"
          config="http://video.qbrick.com/play2/api/v1/accounts/AccWzaGx1BsU0Cuf79OGAqVpQ/configurations/htmlOverlayNoControls"
          :key="storyItemIndex"
          :qbrick="story.storyItems[storyItemIndex].qbrick"
          :on-progress="progress"
          :on-play-complete="playNext"
          :height="height"
          :autoplay="autoplay"
          :width="width"
          :sound-icons="soundIcons"
        />
        <StoryImage
          v-else-if="story.storyItems[storyItemIndex].type === 'image'"
          ref="image"
          :key="storyItemIndex"
          :height="height"
          :width="width"
          :autoplay="autoplay"
          :on-progress="progress"
          :on-play-complete="playNext"
          :image="story.storyItems[storyItemIndex].image"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StoryImage from "./StoryImage.vue";
import StoryVideo from "./StoryVideo.vue";
import ProgressHeader from "./Progress.vue";
import EventBus from "../../event-bus.es6";
import CloseIcon from "./CloseIcon.vue";

/**
 * The component for showing a story inside a slide of the modal.
 */
export default {
  name: "FullscreenStory",
  components: {
    CloseIcon,
    StoryImage,
    StoryVideo,
    ProgressHeader
  },
  data: () => ({
    /**
     * The index of the current playing story item.
     */
    storyItemIndex: 0,
    /**
     * Progress of the current story item.
     * Represents a number between 0 and 1.
     */
    storyItemProgress: 0,
    /**
     * Width of the story frame.
     */
    width: 252,
    /**
     * Height of the story frame.
     */
    height: 448,
    /**
     * Render key. Used to re-render components properly.
     */
    renderKey: 0,
    /**
     * Determines weather a delay is active.
     * Used to not let user interact when the modal is animating.
     */
    isDelayActive: false
  }),
  props: {
    /**
     * src to sounds icon
     * @values {
     *   off: string;
     *   on: string;
     * }
     */
    soundIcons: {
      type: [Object, Boolean],
      default: false
    },
    /**
     * Determines weather to play the story on mounted.
     */
    autoplay: {
      type: Boolean,
      default: false
    },
    /**
     * ID of the story part.
     */
    id: {
      type: String,
      default: ""
    },
    /**
     * A single story object.
     * @values {
     *    title: string;
     *    profilePic: string;
     *    storyItems: {
     *        type: string;
     *        image: string | Boolean;
     *        video: QBrick | Boolean;
     *    }
     *    thumbnailOverride: string | Boolean;
     * }
     */
    story: {
      type: [Object, Boolean],
      default: false
    },
    /**
     * Story complete callback function prop.
     */
    onStoryComplete: {
      type: Function
    },
    /**
     * Index of the story in the stories part.
     */
    index: {
      type: Number,
      default: 0
    }
  },
  created() {
    if (this.autoplay) {
      EventBus.$emit("story__fs-seen", { id: this.id, index: this.index });
      EventBus.$on("story__fs-toggle", this.togglePlay);
      EventBus.$on("story__fs-next", this.checkEmitNext);
      EventBus.$on("story__fs-prev", this.checkEmitPrev);
      window.addEventListener("click", this.checkClose);
      window.addEventListener("touchend", this.checkCloseTouch);
    }
    EventBus.$on("story__fs-thumbnail", this.switchVideoToThumbnail);
    window.addEventListener("resize", this.updateWidth);
  },
  mounted() {
    this.updateWidth();
    if (this.$refs.wrapper) {
      new ResizeObserver(this.updateWidth).observe(this.$refs.wrapper);
    }
  },
  methods: {
    /**
     * Use index and ID to determine weather to play the next story item or not.
     *
     * @param obj: { id: string; index: number }
     */
    checkEmitNext: function (obj) {
      if (obj.id === this.id && obj.index === this.index) {
        this.playNext();
      }
    },
    /**
     * Use index and ID to determine weather to play the previous story item or not.
     *
     * @param obj: { id: string; index: number }
     */
    checkEmitPrev: function (obj) {
      if (obj.id === this.id && obj.index === this.index) {
        this.playPrev();
      }
    },
    /**
     * Determine weather to toggle play/pause of the current story item.
     *
     * @param obj: { id: string; index: number; pause: Boolean }
     */
    togglePlay: function (obj) {
      if (this.story && this.story.storyItems && obj.id === this.id && obj.index === this.index) {
        if (this.story.storyItems[this.storyItemIndex].type === "video" && this.$refs.video) {
          if (obj.pause) {
            if (this.$refs.video && this.$refs.video.pause) {
              this.$refs.video.pause();
            }
          } else if (this.$refs.video && this.$refs.video.play) {
            this.$refs.video.play();
          }
        } else if (this.story.storyItems[this.storyItemIndex].type === "image") {
          if (obj.pause) {
            if (this.$refs.image && this.$refs.image.pause) {
              this.$refs.image.pause();
            }
          } else if (this.$refs.image && this.$refs.image.play) {
            this.$refs.image.play();
          }
        }
      }
    },
    /**
     * Function for touchEnd event.
     *
     * @param e: TouchEvent
     */
    checkCloseTouch: function (e) {
      this.checkClose({
        pageX: e.changedTouches[0].pageX,
        pageY: e.changedTouches[0].pageY
      });
    },
    /**
     * Function for click event. Is also used by the touchEnd listener function.
     * Checks if the user clicked the close button. If so -> tell modal to close.
     *
     * @param e: MouseEvent | { pageX: number; pageY: number }
     */
    checkClose: function (e) {
      if (this.$refs.close && this.checkTargetIsClose(e)) {
        EventBus.$emit("story__fullscreen-close", (this.id));
      }
    },
    /**
     * Does the math to determine weather pageX and pageY is inside the close button.
     *
     * @param e: MouseEvent | { pageX: number; pageY: number }
     * @returns Boolean
     */
    checkTargetIsClose: function (e) {
      if (this.$refs.close) {
        const hitRegionMargin = 10;
        const target = this.$refs.close.getClientRects()[0];
        const offsetX = e.pageX - (target.left - hitRegionMargin);
        const offsetY = e.pageY - (target.top - hitRegionMargin);
        return (offsetX > 0 && offsetX < (target.width + hitRegionMargin) && offsetY > 0 && offsetY < (target.height + hitRegionMargin));
      }
      return false;
    },
    /**
     * Updates the width and height variables.
     */
    updateWidth: function () {
      if (this.$refs.wrapper) {
        this.width = this.$refs.wrapper.clientWidth;
        this.height = this.$refs.wrapper.clientHeight;
      }
    },
    /**
     * Plays the next story item.
     * If there is no next story item, trigger storyComplete callback with param next = true.
     */
    playNext: function () {
      if (!this.isDelayActive) {
        this.isDelayActive = true;
        if (this.story && this.story.storyItems && this.storyItemIndex + 1 < this.story.storyItems.length) {
          this.storyItemIndex++;
        } else {
          this.storyComplete(true);
        }
        this.storyItemProgress = 0;
        setTimeout(() => { this.isDelayActive = false; }, 500);
      }
    },
    /**
     * Plays the previous story item.
     * If there is no previous story item, trigger storyComplete callback with param next = false.
     */
    playPrev: function () {
      if (!this.isDelayActive) {
        this.isDelayActive = true;
        if (this.story && this.story.storyItems && this.storyItemIndex > 0) {
          this.storyItemIndex--;
        } else if (this.index > 0) {
          this.storyComplete(false);
        } else {
          this.renderKey++;
        }
        this.storyItemProgress = 0;
        setTimeout(() => { this.isDelayActive = false; }, 500);
      }
    },
    /**
     * The function passed as a prop to the StoryVideo / StoryImage component.
     * Makes sure to update this components progress variable.
     * @param progress
     */
    progress: function (progress) {
      this.storyItemProgress = progress;
    },
    /**
     * Triggers the onStoryComplete callback function.
     * @param bool: Boolean
     */
    storyComplete: function (bool) {
      if (this.onStoryComplete) {
        this.onStoryComplete(bool);
      }
    },
    /**
     * Replaces the current story item with the thumbnail. Used in the dummies when user swipes to the next/previous story.
     * @param obj: { id: string; onMain: Boolean }
     */
    switchVideoToThumbnail: function (obj) {
      if (obj.id === this.id && this.autoplay === obj.onMain) {
        if (this.story && this.story.storyItems && this.story.storyItems[this.storyItemIndex].type === "video") {
          if (this.$refs.video && this.$refs.video.displayThumbnail) {
            this.$refs.video.displayThumbnail();
          }
        }
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateWidth);
    window.removeEventListener("click", this.checkClose);
    window.removeEventListener("touchend", this.checkClose);
    EventBus.$off("story__fs-thumbnail", this.switchVideoToThumbnail);
    EventBus.$off("story__fs-toggle", this.togglePlay);
    EventBus.$off("story__fs-next", this.checkEmitNext);
    EventBus.$off("story__fs-prev", this.checkEmitPrev);
  }
};
</script>
