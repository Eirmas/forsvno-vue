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
      <!-- <audio
        @canplay="updatePaused"
        @playing="updatePaused"
        @pause="updatePaused"
        @timeupdate="updateTime"
        ref="audio"
        crossorigin="anonymous"
      /> -->
      <div class="podcast__player-info">
         <h3>
          {{ title }}
        </h3>
        <p>
          {{ description }}
        </p>
      </div>
      <div
        class="podcast__player-controls"
      >
        <div
          class="podcast__player-btn-container"
        >
          <button
            v-show="!playing"
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

          <div class="podcast__volume-controls">
            <button
              class="podcast__player-volume podcast__player-btn"
              @click="mute"
            >
              <img
                :src="volumeIcon || icons.volume100"
                alt="Volume"
              >
            </button>
            <input
              v-model="volume"
              ref="volumeSlider"
              type="range"
              min="0"
              max="100">
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
    <Acast
        :state="playerState"
      />
  </div>
</template>

<script>
import EventBus from "../../event-bus.es6";
import CA from "./utils/ConvertAudio";
import Wave from "./utils/Wave";
import Acast from "./AcastIframe.vue";

export default {
  name: "PodcastPlayer",
  components: {
    Acast
  },
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
      type: String
    },
    /**
     * wave data
     */
    waveData: {
      type: Array,
      default: function () { return []; }
    },
    /**
     * Object that contains all icons for the forms
     *
     * @values {
     *  arrowRight: string,
     *  play: string,
     *  pause: string,
     *  volume0: string,
     *  volume33: string,
     *  volume66: string,
     *  volume100: string
     * }
     */
    icons: {
      type: [Object, Boolean],
      default: false
    }
  },
  created() {
    this.icon = this.playIcon;
  },
  mounted() {
    const _AudioContext = window.AudioContext // Default
    || window.webkitAudioContext // Safari and old versions of Chrome
    || false;
    if (_AudioContext) {
      this.audioContext = new _AudioContext();

      CA.visualizeAudio(this.service, this.audioContext, this.audio)
        .then((data) => {
          this.data = data;
          console.log(JSON.stringify(data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
    this.wave = new Wave(this.$refs.canvas, this.waveData);
    this.wave.update(this.waveData, 0);
    console.log("Audiocontext not available");
  },
  data: () => ({
    volume: 100,
    volumeIcon: null,
    wave: null,
    animationFrame: null,
    currentTime: "00:00",
    duration: "00:00",
    playerState: {
      paused: true,
      muted: false,
      volume: 100,
      duration: 0,
      time: 0
    }
  }),
  watch: {
    volume: function () {
      this.playerState.volume = this.volume;
      this.$refs.volumeSlider.style.background = `linear-gradient(to right, #191b21 0%, #191b21 ${this.volume}%, #fff ${this.volume}%, white 100%)`;
      this.volumeIcon = this.iconFor(this.volume);
    },
    "playerState.duration": function (value) {
      this.duration = this.secondsToHms(value);
      this.wave.update(this.waveData, value);
    },
    "playerState.time": function (value) {
      this.currentTime = this.secondsToHms(value);
    }
  },
  computed: {
    playing() { return !this.playerState.paused; }
  },
  methods: {
    play() {
      EventBus.$emit("podcast__play");
      function animate() {
        this.wave.draw(this.playerState.time);
        this.animationFrame = requestAnimationFrame(animate.bind(this));
      }
      this.animationFrame = requestAnimationFrame(animate.bind(this));
    },
    pause() {
      cancelAnimationFrame(this.animationFrame);
      EventBus.$emit("podcast__pause");
    },
    mute() {
      if (!this.playerState.muted) {
        EventBus.$emit("podcast__mute");
        this.volumeIcon = this.iconFor(this.volume, true);
      } else {
        EventBus.$emit("podcast__unmute");
        this.volumeIcon = this.iconFor(this.volume, false);
      }
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
    },
    iconFor(volume, muted) {
      if (volume < 1 || muted) return this.icons.volume0;
      if (volume === 100) return this.icons.volume100;
      if (volume <= 33) return this.icons.volume33;
      if (volume <= 66) return this.icons.volume66;
      return this.icons.volume100;
    }
  }
};
</script>
