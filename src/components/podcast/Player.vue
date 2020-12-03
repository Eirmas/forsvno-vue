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
        @playing="updatePlayState"
        @duration="updateDuration"
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
    EventBus.$on("podcast__playing", this.updatePlayState);
    EventBus.$on("podcast__duration", this.updateDuration);
    EventBus.$on("podcast__progress", this.updateTime);
  },
  beforeDestroy() {
    EventBus.$off("podcast__playing");
    EventBus.$off("podcast__progress");
  },
  mounted() {
    /* this.audio = this.$refs.audio;
    const _AudioContext = window.AudioContext // Default
    || window.webkitAudioContext // Safari and old versions of Chrome
    || false;
    this.wave = new Wave(this.$refs.canvas, this.audio, this.data);
    if (_AudioContext && !this.dev) {
      this.audioContext = new _AudioContext();

      CA.visualizeAudio(this.service, this.audioContext, this.audio)
        .then((data) => {
          this.data = data;
          console.log(JSON.stringify(data));
          this.wave.update(data);
          this.duration = this.secondsToHms(this.audio.duration);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const data = [0.7950339623688347, 0.7735101534228098, 0.8023338613681238, 0.800327513572086, 0.7575221579194051, 0.7138260160723084, 0.8789328195016359, 0.7067035841758281, 0.8200720739970048, 0.8125347574505042, 0.7832031558760832, 0.7550733447289688, 0.5956163309340664, 0.7751828295398808, 0.6440484594945638, 0.5800707041875091, 0.7709498996451043, 0.6344287840456339, 0.4340267256787012, 0.5430619737809028, 0.789054670267082, 0.827270749635978, 1, 0.9934966293463097, 0.8024594252619602, 0.8264654818540976, 0.8567950164533356, 0.7748929687846495, 0.7831895879792339, 0.8362069514794179, 0.8266567424820626, 0.9064995931348614, 0.7138859724697868, 0.8954981442529084, 0.7451171974116526, 0.7001835987827117, 0.7043254431686997, 0.79752029586336, 0.8358629037026528, 0.8272590331957969];
      this.data = data;
      this.audio.src = this.service;
      this.wave.update(data);
      this.duration = this.secondsToHms(this.audio.duration);
      console.log("Audiocontext not available");
    } */
  },
  data: () => ({
    ctx: null,
    audioContext: null,
    audio: null,
    paused: true,
    volume: 100,
    volumeIcon: null,
    wave: null,
    animationFrame: null,
    currentTime: "00:00",
    duration: "00:00",
    data: [],
    dev: true
  }),
  watch: {
    volume: function () {
      this.audio.volume = this.volume / 100;
      this.$refs.volumeSlider.style.background = `linear-gradient(to right, #191b21 0%, #191b21 ${this.volume}%, #fff ${this.volume}%, white 100%)`;
      this.volumeIcon = this.iconFor(this.volume);
    }
  },
  computed: {
    playing() { return !this.paused; }
  },
  methods: {
    play() {
      EventBus.$emit("podcast__play");
      /*
      function animate() {
        this.wave.draw();
        this.animationFrame = requestAnimationFrame(animate.bind(this));
      }
      this.animationFrame = requestAnimationFrame(animate.bind(this)); */
    },
    pause() {
      EventBus.$emit("podcast__pause");
    },
    updatePlayState(playing) {
      this.paused = !playing;
    },
    updateTime(progress) {
      this.currentTime = this.secondsToHms(progress);
    },
    updateDuration(duration) {
      this.duration = this.secondsToHms(duration);
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
    iconFor(volume) {
      if (volume < 1) return this.icons.volume0;
      if (volume === 100) return this.icons.volume100;
      if (volume <= 33) return this.icons.volume33;
      if (volume <= 66) return this.icons.volume66;
      return this.icons.volume100;
    }
  }
};
</script>
