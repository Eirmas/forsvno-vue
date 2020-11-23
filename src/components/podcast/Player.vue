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
              :src="playIcon"
              alt="Play"
            >
          </button>
          <button
            v-show="playing"
            v-on:click="pause()"
            class="podcast__player-btn"
          >
            <img
              :src="pauseIcon"
              alt="Pause"
            >
          </button>
          <button
            class="podcast__player-volume podcast__player-btn"
          >
            <img
              :src="volume"
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
    }
  },
  created() {
    this.icon = this.playIcon;
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
  },
  mounted() {
    this.audio = this.$refs.audio;
    this.wave = new Wave(this.$refs.canvas, this.audio, this.data);
    CA.visualizeAudio(this.service.link, this.audioContext, this.audio)
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
    audioFile: require("@/assets/images/music2.mp3"),
    playIcon: require("@/assets/images/play.svg"),
    pauseIcon: require("@/assets/images/pause.svg"),
    volume: require("@/assets/images/volume.svg"),
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
<style lang="scss">
.podcast__player-inner {
  background: #C6C7C4;
  padding: 1.5rem 1.5rem;
  h6 {
    font-size: 13px;
    margin: .2rem 0 .5rem 0;
    letter-spacing: 0.24em;
    text-transform: uppercase;
  }
  .podcast__player-container {
    position: relative;
    display: flex;
    justify-content: center;
    .podcast__player-cover{
      height: 140px;
      width: 140px;
    }
    .podcast__player-controls {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 1rem;
      h3 {
        font-weight: 500;
        margin-top: .5rem;
        font-size: 14px;
        font-style: italic;
        line-height: 30px;
      }
      p {
        font-size: 12px;
        margin-bottom: 1.5rem;
        line-height: 15px;
      }
    }
    .podcast__player-btn-container {
      position: relative;
      display: flex;
      flex-direction: row;
      .podcast__player-btn{
        width: 18px;
        height: 18px;
        margin-right: .8rem;
        margin-top: .5rem;
        img {
          vertical-align: top;
          width: 100%;
          height: 100%;
        }
      }
      .podcast__player-volume:hover ~.podcast__volume-controls {
        display: flex;
      }
      .podcast__volume-controls {
        display: none;
        position: absolute;
        right: 0;
        width: 0;
        width: 210px;
        height: 30px;
        background: #C6C7C4;
        justify-content: center;
        flex-direction: column;
        input{
          -webkit-appearance: none;
          -moz-apperance: none;
          appearance: none;
          width: 100%;
          height: 3px;
          outline: none;
          background: #191B21;
        }
        input::-webkit-slider-thumb {
          -webkit-appearance: none;
          -moz-apperance: none;
          appearance: none;
          width: 10px;
          height: 10px;
          background: #191B21;
          cursor: pointer;
        }

        input::-moz-range-thumb {
          width: 10px;
          height: 10px;
          background: #191B21;
          cursor: pointer;
        }
      }
      .podcast__progress-container {
        canvas {
          width: 200px;
          height: 25px;
          display: block;
        }
        p {
          margin: .2rem 0;
          font-size: 12px;
          font-weight: bold;
          letter-spacing: 0.15em;
        }
      }
    }
  }
}

</style>
