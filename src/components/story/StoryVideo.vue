<template>
  <div
    :key="renderKey"
    class="story__video-player-wrapper"
  >
    <div
      v-if="showThumbnail"
      :style="`width:${width}px;height:${height}px;background-image: url('${thumbnail}')`"
      class="story__video-player-thumbnail"
    />
    <div
      v-if="!showThumbnail"
      ref="sound"
      class="story__video-player-sound"
      @click="isMuted = !isMuted"
    >
      <img :src="isMuted ? soundIcons.off : soundIcons.on">
    </div>
    <video
      v-if="!showThumbnail"
      ref="video"
      playsinline
      :muted="isMuted"
      :style="`width:${width}px;height:${height}px`"
      :src="resource.href"
      :type="resource.mimeType"
      :autoplay="autoplay"
      :class="['story__video-player', (displayLoadIcon) ? 'story-video-player-loading' : '']"
    />
    <div
      v-if="!showThumbnail && displayLoadIcon"
      :style="`width:${width}px;height:${height}px;`"
      class="story-video-player-icon-wrapper"
    >
      <LoadingIcon />
    </div>
  </div>
</template>

<script>
import LoadingIcon from "./LoadingIcon.vue";

/**
 * Wrapper for displaying a video in the mobile story.
 */
export default {
  name: "Video",
  components: {
    LoadingIcon
  },
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
     * Height of the video.
     */
    height: {
      type: [Number, Boolean],
      default: false
    },
    /**
     * Width of the video.
     */
    width: {
      type: [Number, Boolean],
      default: false
    },
    /**
     * Callback function on play.
     */
    onPlay: {
      type: Function
    },
    /**
     * Callback function on pause.
     */
    onPause: {
      type: Function
    },
    /**
     * Callback function on complete.
     */
    onPlayComplete: {
      type: Function
    },
    /**
     * Callback function on progress.
     */
    onProgress: {
      type: Function
    },
    /**
     * QBrick data object. Holds all video details.
     */
    qbrick: {
      type: [Object, Boolean],
      default: false
    },
    /**
     * Determines weather to play video on mounted or not.
     */
    autoplay: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    /**
     * Determines weather to mute video audio or not
     */
    isMuted: false,
    /**
     * Holds an interval function when playing.
     * We store it here to be able to clear it.
     */
    progressInterval: undefined,
    /**
     * Determines weather to display the loading icon.
     */
    displayLoadIcon: false,
    /**
     * Determines weather to show the thumbnail.
     */
    showThumbnail: false,
    /**
     * The render key is used to re-render components properly.
     */
    renderKey: 0
  }),
  created() {
    if (!this.autoplay) {
      this.showThumbnail = true;
    }
  },
  watch: {
    /**
     * When the autoplay variable changes, we can make the video start playing without
     * having to re-render the whole component thanks to the render key.
     */
    autoplay: function () {
      if (this.autoplay) {
        this.renderKey++;
      }
    }
  },
  computed: {
    /**
     * Returns string with url to video.
     *
     * @returns { href: string; mimeType: string; }
     */
    resource: function () {
      const data = this.qbrick.data;
      const resources = data.qbrick.asset.resources;
      const video = resources.filter((v) => v.type && v.type === "video");
      return video[0].renditions.sort((a, b) => (a.size < b.size ? 1 : -1))[0].links;
    },
    /**
     * Returns string with url to the video thumbnail.
     *
     * @returns string
     */
    thumbnail: function () {
      const data = this.qbrick.data;
      const resources = data.qbrick.asset.resources;
      const thumbnail = resources.filter((v) => v.rel && v.rel === "thumbnail");
      return thumbnail[0].renditions.sort((a, b) => (a.size < b.size ? 1 : -1))[0].links.href;
    }
  },
  methods: {
    /**
     * Toggles the mute
     */
    toggleMute: function () {
      this.isMuted = !this.isMuted;
    },
    /**
     * Displays the thumbnail
     */
    displayThumbnail: function () {
      this.showThumbnail = true;
    },
    /**
     * Starts playing the video from current time.
     */
    play: function () {
      setTimeout(() => {
        if (this.$refs.video && this.$refs.video.play) {
          this.$refs.video.play();
        }
      }, 500);
    },
    /**
     * Pauses the video.
     */
    pause: function () {
      if (this.$refs.video && this.$refs.video.pause) {
        this.$refs.video.pause();
      }
    },
    /**
     * The interval function used to trigger the onProgress callback function when video progresses.
     */
    intervalFunc: function () {
      if (this.onProgress && this.$refs.video) {
        this.onProgress(this.$refs.video.currentTime / this.$refs.video.duration);
      }
    }
  },
  mounted() {
    if (this.autoplay) {
      try {
        this.$refs.video.play();
      } catch (err) {
        this.isMuted = true;
        this.play();
      }
    }
    /**
     * Created video event listeners
     */
    if (this.$refs.video) {
      this.$refs.video.addEventListener("loadstart", () => {
        if (this.autoplay) {
          this.displayLoadIcon = true;
        }
      });
      this.$refs.video.addEventListener("waiting", () => {
        if (this.autoplay) {
          this.displayLoadIcon = true;
        }
      });
      this.$refs.video.addEventListener("playing", () => {
        this.displayLoadIcon = false;
      });
      this.$refs.video.addEventListener("play", () => {
        if (this.onPlay) {
          this.onPlay();
        }
        this.progressInterval = setInterval(this.intervalFunc, 125);
      });
      this.$refs.video.addEventListener("pause", () => {
        if (this.onPause) {
          this.onPause();
        }
        clearInterval(this.progressInterval);
      });
      if (this.onPlayComplete) {
        this.$refs.video.addEventListener("ended", this.onPlayComplete);
      }
    }
  }
};
</script>
