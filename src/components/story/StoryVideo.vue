<template>
  <div class="story__video-player-wrapper">
    <video
      ref="video"
      :style="`width:${width}px;height:${height}px`"
      :src="resource.href"
      :type="resource.mimeType"
      :autoplay="autoplay"
      :class="['story__video-player', (displayLoadIcon) ? 'story-video-player-loading' : '']"
    />
    <div
      v-if="displayLoadIcon"
      :style="`width:${width}px;height:${height}px;`"
      class="story-video-player-icon-wrapper"
    >
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#fff"
      >
        <g
          fill="none"
          fill-rule="evenodd"
        >
          <g
            transform="translate(1 1)"
            stroke-width="2"
          >
            <circle
              stroke-opacity=".5"
              cx="18"
              cy="18"
              r="18"
            />
            <path
              d="M36 18c0-9.94-8.06-18-18-18"
            />
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "Video",
  props: {
    height: {
      type: [Number, Boolean],
      default: false
    },
    width: {
      type: [Number, Boolean],
      default: false
    },
    onPlay: {
      type: Function
    },
    onPause: {
      type: Function
    },
    onPlayComplete: {
      type: Function
    },
    onProgress: {
      type: Function
    },
    qbrick: {
      type: [Object, Boolean],
      default: false
    },
    autoplay: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    progressInterval: undefined,
    displayLoadIcon: false
  }),
  computed: {
    resource: function () {
      const data = this.qbrick.data;
      const resources = data.qbrick.asset.resources;
      const video = resources.filter((v) => v.type && v.type === "video");
      return video[0].renditions.sort((a, b) => (a.size < b.size ? 1 : -1))[0].links;
    }
  },
  methods: {
    play: function () {
      if (this.$refs.video && this.$refs.video.play) {
        setTimeout(() => this.$refs.video.play(), 500);
      }
    },
    pause: function () {
      if (this.$refs.video && this.$refs.video.pause) {
        this.$refs.video.pause();
      }
    },
    intervalFunc: function () {
      if (this.onProgress && this.$refs.video) {
        this.onProgress(this.$refs.video.currentTime / this.$refs.video.duration);
      }
    }
  },
  mounted() {
    this.$refs.video.addEventListener("loadstart", () => {
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
};
</script>

<style>
.story__video-player-wrapper {
  position: relative;
}
.story-video-player-loading {
  filter: brightness(70%);
}
.story__video-player {
  display: block;
  background: transparent;
}
.story-video-player-icon-wrapper {
  position: absolute;
  top: 0;
  left: 0;
}
.story-video-player-icon-wrapper svg {
  position: relative;
  top: calc(50% - 19px);
  animation: rotate 1s infinite linear;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
