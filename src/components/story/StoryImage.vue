<template>
  <div
    :style="`width:${width}px;height:${height}px;background-image: url('${image}')`"
    class="story__image"
  />
</template>

<script>
export default {
  name: "StoryImage",
  data: () => ({
    duration: 10000,
    current: 0,
    isPlaying: false,
    interval: undefined,
    throttle: 125
  }),
  props: {
    height: {
      type: [Number, Boolean],
      default: false
    },
    width: {
      type: [Number, Boolean],
      default: false
    },
    image: {
      type: String,
      default: ""
    },
    onProgress: {
      type: Function
    },
    onPlayComplete: {
      type: Function
    },
    autoplay: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.autoplay) {
      this.play();
    }
  },
  methods: {
    play: function () {
      this.isPlaying = true;
    },
    pause: function () {
      this.isPlaying = false;
    },
    reset: function () {
      this.current = 0;
    },
    intervalFunc: function () {
      if (this.current + 100 >= this.duration) {
        this.current = this.duration;
        this.onPlayComplete();
        clearInterval(this.interval);
      } else {
        this.current += this.throttle;
        this.onProgress(this.current / this.duration);
      }
    }
  },
  watch: {
    isPlaying: function () {
      if (this.isPlaying) {
        this.interval = setInterval(this.intervalFunc, this.throttle);
      } else {
        clearInterval(this.interval);
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
    this.current = 0;
    this.isPlaying = false;
    this.interval = false;
  }
};
</script>
