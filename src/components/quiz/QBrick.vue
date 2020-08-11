<template>
  <div
    ref="wrapper"
    style="width:100%;"
    class="qbrick__player-wrapper"
  >
    <div
      ref="player"
      :style="`width:${calcWidth}px;height:${calcHeight}`"
    />
  </div>
</template>

<script>
import { v1 } from "uuid";

export default {
  name: "QBrick",
  props: {
    config: {
      type: [String, Boolean],
      default: false
    },
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
    onReady: {
      type: Function
    },
    onSeeked: {
      type: Function
    },
    onLoaded: {
      type: Function
    },
    onSeeking: {
      type: Function
    },
    onQueueItemChanged: {
      type: Function
    },
    onInitialized: {
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
    widget: undefined
  }),
  mounted() {
    window.addEventListener("resize", this.onResize);
    if (this.embedSettings) {
      this.create();
    }
  },
  watch: {
    height: function () {
      this.reload();
    },
    width: function () {
      this.reload();
    }
  },
  methods: {
    onResize: function () {
      this.$forceUpdate();
    },
    create: function () {
      // eslint-disable-next-line
        this.widget = GoBrain.create(this.$refs.player, this.embedSettings)
      this.hookUpEventListeners();
    },
    play: function () {
      if (this.widget && this.widget.play) {
        this.widget.play();
      }
    },
    pause: function () {
      if (this.widget) {
        this.widget.pause();
      }
    },
    reload: function () {
      if (this.widget) {
        this.$refs.player.innerHTML = "";
        this.widget.destroy();
        this.create();
      }
    },
    hookUpEventListeners: function () {
      if (this.widget) {
        if (this.onInitialized) {
          this.widget.on("initialized", this.onInitialized);
        }
        if (this.onLoaded) {
          this.widget.on("loaded", this.onLoaded);
        }
        if (this.onPause) {
          this.widget.on("pause", this.onPause);
        }
        if (this.onPlay) {
          this.widget.on("play", this.onPlay);
        }
        if (this.onPlayComplete) {
          this.widget.on("playComplete", this.onPlayComplete);
        }
        if (this.onProgress) {
          this.widget.on("position", (time) => {
            const videoData = this.qbrick.data.qbrick.asset.resources.filter((v) => v.type === "video");
            if (videoData[0] && videoData[0].renditions[0]) {
              const duration = videoData[0].renditions[0].videos.duration;
              const percentage = time / duration;
              this.onProgress(percentage);
            }
          });
        }
        if (this.onReady) {
          this.widget.on("ready", this.onReady);
        }
        if (this.onSeeked) {
          this.widget.on("seeked", this.onSeeked);
        }
        if (this.onSeeking) {
          this.widget.on("seeking", this.onSeeking);
        }
        if (this.onQueueItemChanged) {
          this.widget.on("queueItemChanged", this.onQueueItemChanged);
        }
      }
    }
  },
  computed: {
    calcWidth: function () {
      if (this.width) {
        return this.width;
      }
      if (this.$refs.wrapper) {
        return this.$refs.wrapper.clientWidth;
      }
      return 0;
    },
    calcHeight: function () {
      if (this.height) {
        return this.height;
      }
      const data = this.qbrick.data;
      const resources = data.qbrick.asset.resources;
      const video = resources.filter((v) => v.type && v.type === "video");
      if (video.length > 0 && video[0].renditions.length > 0) {
        const videoData = video[0].renditions.sort((a, b) => (a.size < b.size ? 1 : -1))[0].videos;
        if (videoData && videoData.height && videoData.width) {
          return this.calcWidth * (videoData.height / videoData.width);
        }
      }
      return 0;
    },
    embedSettings: function () {
      return {
        autoplay: this.autoplay,
        widgetId: v1(),
        config: this.config || this.qbrick.data.qbrick.html["data-gobrain-config"],
        data: this.qbrick.data.qbrick.html["data-gobrain-data"],
        width: this.width,
        height: (this.height) ? this.height : this.calcHeight,
        repeat: false
      };
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
    if (this.widget) {
      this.widget.pause();
      this.widget.destroy();
    }
  }
};
</script>
