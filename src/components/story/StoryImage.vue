<template>
  <div
    :style="`width:${width}px;height:${height}px;background-image: url('${image}')`"
    class="story__image"
  />
</template>

<script>
/**
 * This component displays a story item in the form of an image.
 * It behaves in some ways like a video. It has a duration and can be played/paused.
 */
export default {
  name: "StoryImage",
  data: () => ({
    /**
     * Duration in milliseconds.
     */
    duration: 10000,
    /**
     * Represents the current time of the story item.
     * This is a number between 0 and the duration.
     */
    current: 0,
    /**
     * Determines weather this story item is playing or paused.
     */
    isPlaying: false,
    /**
     * A variable that holds an interval function.
     * We store it as a data property to be able to clear it.
     */
    interval: undefined,
    /**
     * The throttle of the interval.
     * Determines how many milliseconds are between each interval.
     */
    throttle: 125
  }),
  props: {
    /**
     * Height of the story item.
     */
    height: {
      type: [Number, Boolean],
      default: false
    },
    /**
     * Width of the story item.
     */
    width: {
      type: [Number, Boolean],
      default: false
    },
    /**
     * String with url to the image to be displayed.
     */
    image: {
      type: String,
      default: ""
    },
    /**
     * Callback function for progress events.
     * Will be called once every <this.throttle> milliseconds.
     */
    onProgress: {
      type: Function
    },
    /**
     * Callback function when story item is complete
     */
    onPlayComplete: {
      type: Function
    },
    /**
     * Determines weather to start playing the story item when mounted.
     */
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
    /**
     * Plays the story item.
     */
    play: function () {
      this.isPlaying = true;
    },
    /**
     * Pauses the story item.
     */
    pause: function () {
      this.isPlaying = false;
    },
    /**
     * The interval function.
     */
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
    /**
     * Watcher for the isPlaying variable.
     */
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
