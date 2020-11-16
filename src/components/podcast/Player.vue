<template>
  <div
    class="podcast__player-inner"
  >
    <h6>{{ subHeader }}</h6>
    <div
      class="podcast__player-container"
    >
      <img
        :src="cover"
        alt=""
        class="podcast__player-cover"
      >
      <audio
        @canplay="updatePaused"
        @playing="updatePaused"
        @pause="updatePaused"
        @timeupdate="updateTime"
        ref="audio"
        crossorigin="anonymous"
      />
      <div
        class="podcast__player-controls"
      >
        <h3>
          {{ title }}
        </h3>
        <p>
          {{ description }}
        </p>
        <div
          class="podcast__player-btn-container"
        >
          <button
            v-show="paused"
            v-on:click="play()"
            class="podcast__player-btn"
          >
            <img
              :src="icons.play"
              alt="Play"
            >
          </button>
          <button
            v-show="playing"
            v-on:click="pause()"
            class="podcast__player-btn"
          >
            <img
              :src="icons.pause"
              alt="Pause"
            >
          </button>
          <button
            class="podcast__player-volume podcast__player-btn"
          >
            <img
              :src="icons.volume"
              alt="Volume"
            >
          </button>
          <div class="podcast__volume-controls">
            <input type="range" min="1" max="100" value="100">
          </div>
          <div class="podcast__progress-container">
            <canvas
              ref="canvas"
            >
            </canvas>
            <p>{{ currentTime }}/{{ duration }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CA from "./utils/ConvertAudio";
import Wave from "./utils/Wave";

export default {
  name: "PodcastPlayer",
  props: {
    /**
     * Title of the podcast.
     */
    title: {
      type: String,
      default: ""
    },
    /**
     * Sub header.
     */
    subHeader: {
      type: String,
      default: ""
    },
    /**
     * A descriptive text about the podcast
     */
    description: {
      type: String,
      default: ""
    },
    /**
     * Cover image
     */
    cover: {
      type: String
    },
    /**
     * Audio service
     */
    service: {
      type: Object
    },
    /**
     * Object that contains all icons for the forms
     *
     * @values {
     *  arrowRight: string,
     *  play: string,
     *  pause: string,
     *  volume: string
     * }
     */
    icons: {
      type: [Object, Boolean],
      default: false
    }
  },
  created() {
    this.icon = this.playIcon;
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
  },
  mounted() {
    this.audio = this.$refs.audio;
    this.wave = new Wave(this.$refs.canvas, this.audio, this.data);
    CA.visualizeAudio(this.service, this.audioContext, this.audio)
      .then((data) => {
        this.data = data;
        this.wave.update(data);
        this.duration = this.secondsToHms(this.audio.duration);
      });
  },
  data: () => ({
    ctx: null,
    audioContext: new AudioContext(),
    audio: null,
    paused: null,
    wave: null,
    animationFrame: null,
    currentTime: "00:00",
    duration: "00:00",
    data: []
  }),
  watch: {
    playing: function () {
      if (!this.playing) cancelAnimationFrame(this.animationFrame);
    }
  },
  computed: {
    playing() { return !this.paused; }
  },
  methods: {
    play() {
      this.audio.play();
      function animate() {
        this.wave.draw();
        this.animationFrame = requestAnimationFrame(animate.bind(this));
      }
      this.animationFrame = requestAnimationFrame(animate.bind(this));
    },
    pause() {
      cancelAnimationFrame(this.animationFrame);
      this.audio.pause();
    },
    updatePaused(event) {
      this.videoElement = event.target;
      this.paused = event.target.paused;
    },
    updateTime(event) {
      this.currentTime = this.secondsToHms(event.target.currentTime);
    },
    secondsToHms(n) {
      let d = Number(n);
      if (Number.isNaN(n)) {
        d = 0;
      }
      const h = Math.floor(d / 3600);
      const m = Math.floor((d % 3600) / 60);
      const s = Math.floor(d % 3600 % 60);

      const hDisplay = h > 0 ? `0${h}:` : "";
      const mDisplay = m < 10 ? `0${m}:` : `${m}:`;
      const sDisplay = s < 10 ? `0${s}` : `${s}`;
      return hDisplay + mDisplay + sDisplay;
    }
  }
};
</script>
