<template>
  <div
    class="podcast__player-inner"
  >
    <h6>TEASER: EPISODE 1</h6>
    <div
      class="podcast__player-container"
    >
      <img
        src="https://mediacdn.acast.com/assets/21187288-948e-44cf-80a1-a9952adab357/cover-image-k1b6sx75-pod_f5_3.jpeg"
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
          Når livet blir forandret
        </h3>
        <p>
          I denne episoden skal dere blir kejnt med helge og hvordan hans internasjonale operasjoner fornadret hans liv.
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
import CA from "./ConvertAudio";
import Wave from "./Wave";

export default {
  name: "PodcastPlayer",
  props: {

  },
  components: {

  },
  created() {
    this.icon = this.playIcon;
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
  },
  mounted() {
    this.audio = this.$refs.audio;
    this.wave = new Wave(this.$refs.canvas, this.audio, this.data);
    CA.visualizeAudio(`http://localhost:8080${this.audioFile}`, this.audioContext, this.audio)
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
    data: [],
    e: [0.15031531543763407, 0.8027214380875329, 0.7697913208180077, 0.8269473434903811, 0.8066135548736779, 0.9527069898700823, 0.9737980847343795, 0.9427060590549438, 0.9228788477404091, 0.9761264606980015, 1, 0.8780278064705482, 0.8098933474480278, 0.898725384113498, 0.89539709995653, 0.788976401700017, 0.9267044447425343, 0.9427943992384842, 0.8677649197150806, 0.9478329256212658, 0.8124592231302136, 0.8367826347273626, 0.8556433125068681, 0.9386044140104655, 0.9608436475731233, 0.7871824031357472, 0.6759932758211649, 0.42657919853411996, 0.33239335796678593, 0.1900095333370357]
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
      const mDisplay = m < 10 ? `0${m}:` : `${m}`;
      const sDisplay = s < 10 ? `0${s}` : `${s}`;
      return hDisplay + mDisplay + sDisplay;
    }
  }
};
</script>
<style lang="scss">
.podcast__player-inner {
  background: #C6C7C4;
  width: 100%;
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
          appearance: none;
          width: 100%;
          height: 3px;
          outline: none;
          background: #191B21;
        }
        input::-webkit-slider-thumb {
          -webkit-appearance: none;
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
