<template>
  <div
    ref="wrapper"
    class="story__fs-wrapper"
  >
    <div
      class="story__header"
    >
      <template
        v-for="(item, i) in story.storyItems"
      >
        <ProgressHeader
          v-if="i === storyIndex"
          :key="i"
          :total="story.storyItems.length"
          :progress="storyItemProgress"
          :current-index="storyIndex"
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="3.5 3.5 17 17"
            style="vertical-align: top;"
          >
            <line
              style="fill:none;stroke:#FFFFFF;stroke-width:1;stroke-miterlimit:10;"
              x1="7"
              y1="7"
              x2="17"
              y2="17"
            />
            <line
              style="fill:none;stroke:#FFFFFF;stroke-width:1;stroke-miterlimit:10;"
              x1="7"
              y1="17"
              x2="17"
              y2="7"
            />
          </svg>
        </button>
      </div>
    </div>
    <div>
      <div
        v-if="story && story.storyItems !== undefined"
        :key="renderKey"
      >
        <Video
          v-if="story.storyItems[storyIndex].type === 'video'"
          ref="video"
          :key="storyIndex"
          :qbrick="story.storyItems[storyIndex].qbrick"
          :on-progress="progress"
          :on-play-complete="playNext"
          :height="height"
          :autoplay="autoplay"
          :width="width"
          class="story__fs-qbrick"
          config="http://video.qbrick.com/play2/api/v1/accounts/AccWzaGx1BsU0Cuf79OGAqVpQ/configurations/htmlOverlayNoControls"
        />
        <StoryImage
          v-else-if="story.storyItems[storyIndex].type === 'image'"
          ref="image"
          :key="storyIndex"
          :height="height"
          :width="width"
          :on-progress="progress"
          :on-play-complete="playNext"
          :image="story.storyItems[storyIndex].image"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StoryImage from "./StoryImage.vue";
import Video from "./StoryVideo.vue";
import ProgressHeader from "./Progress.vue";
import EventBus from "../../event-bus.es6";

export default {
  name: "FullscreenStory",
  components: {
    StoryImage,
    Video,
    ProgressHeader
  },
  data: () => ({
    storyIndex: 0,
    storyItemProgress: 0,
    width: 252,
    height: 448,
    renderKey: 0,
    isDelayActive: false
  }),
  props: {
    autoplay: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ""
    },
    story: {
      type: [Object, Boolean],
      default: false
    },
    onStoryComplete: {
      type: Function
    },
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
    checkEmitNext: function (obj) {
      if (obj.id === this.id && obj.index === this.index) {
        this.playNext();
      }
    },
    checkEmitPrev: function (obj) {
      if (obj.id === this.id && obj.index === this.index) {
        this.playPrev();
      }
    },
    togglePlay: function (obj) {
      if (this.story && this.story.storyItems && obj.id === this.id && obj.index === this.index) {
        if (this.story.storyItems[this.storyIndex].type === "video" && this.$refs.video) {
          if (obj.pause) {
            if (this.$refs.video && this.$refs.video.pause) {
              this.$refs.video.pause();
            }
          } else if (this.$refs.video && this.$refs.video.play) {
            this.$refs.video.play();
          }
        } else if (this.story.storyItems[this.storyIndex].type === "image") {
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
    checkCloseTouch: function (e) {
      this.checkClose({
        pageX: e.changedTouches[0].pageX,
        pageY: e.changedTouches[0].pageY
      });
    },
    checkClose: function (e) {
      if (this.$refs.close && this.checkTargetIsClose(e)) {
        EventBus.$emit("story__fullscreen-close", (this.id));
      }
    },
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
    updateWidth: function () {
      if (this.$refs.wrapper) {
        this.width = this.$refs.wrapper.clientWidth;
        this.height = this.$refs.wrapper.clientHeight;
      }
    },
    playNext: function () {
      if (!this.isDelayActive) {
        this.isDelayActive = true;
        if (this.story && this.story.storyItems && this.storyIndex + 1 < this.story.storyItems.length) {
          this.storyIndex++;
        } else {
          this.storyComplete(true);
        }
        this.storyItemProgress = 0;
        setTimeout(() => { this.isDelayActive = false; }, 500);
      }
    },
    playPrev: function () {
      if (!this.isDelayActive) {
        this.isDelayActive = true;
        if (this.story && this.story.storyItems && this.storyIndex > 0) {
          this.storyIndex--;
        } else if (this.index > 0) {
          this.storyComplete(false);
        } else {
          this.renderKey++;
        }
        this.storyItemProgress = 0;
        setTimeout(() => { this.isDelayActive = false; }, 500);
      }
    },
    progress: function (progress) {
      this.storyItemProgress = progress;
    },
    storyComplete: function (bool) {
      if (this.onStoryComplete) {
        this.onStoryComplete(bool);
      }
    },
    switchVideoToThumbnail: function (obj) {
      if (obj.id === this.id && this.autoplay === obj.onMain) {
        if (this.story && this.story.storyItems && this.story.storyItems[this.storyIndex].type === "video") {
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
