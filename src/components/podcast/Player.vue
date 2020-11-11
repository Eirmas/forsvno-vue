<template>
  <div
    class="podcast__player-inner"
  >
    <h6>TEASER: EPISODE 1</h6>
    <div class="podcast__player-container">
      <img src="https://mediacdn.acast.com/assets/21187288-948e-44cf-80a1-a9952adab357/cover-image-k1b6sx75-pod_f5_3.jpeg" alt="" class="podcast__player-cover">

      <audio ref="audio" crossorigin="anonymous"></audio>
      <div class="podcast__player-controls">
        <h3>
          <i>Når livet blir forandret</i>
        </h3>
        <p>I denne episoden skal dere blir kejnt med helge og hvordan hans internasjonale operasjoner fornadret hans liv.</p>
        <div class="podcast__player-btn-container">
          <button v-on:click="play()" class="podcast__player-btn"><img :src="icon" alt="Play"></button>
          <button class="podcast__player-btn"><img :src="volume" alt="Play"></button>
          <canvas></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CA from "./ConvertAudio";

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
    const audio = this.$refs.audio;
    CA.visualizeAudio(`http://localhost:8080${this.audio}`, this.audioContext, audio)
      .then((data) => {
        this.data = data;
      });
  },
  data: () => ({
    ctx: null,
    timer: null,
    audioContext: new AudioContext(),
    audio: require("@/assets/images/music2.mp3"),
    icon: null,
    playIcon: require("@/assets/images/play.svg"),
    pauseIcon: require("@/assets/images/pause.svg"),
    volume: require("@/assets/images/volume.svg"),
    data: null,
    e: [0.15031531543763407, 0.8027214380875329, 0.7697913208180077, 0.8269473434903811, 0.8066135548736779, 0.9527069898700823, 0.9737980847343795, 0.9427060590549438, 0.9228788477404091, 0.9761264606980015, 1, 0.8780278064705482, 0.8098933474480278, 0.898725384113498, 0.89539709995653, 0.788976401700017, 0.9267044447425343, 0.9427943992384842, 0.8677649197150806, 0.9478329256212658, 0.8124592231302136, 0.8367826347273626, 0.8556433125068681, 0.9386044140104655, 0.9608436475731233, 0.7871824031357472, 0.6759932758211649, 0.42657919853411996, 0.33239335796678593, 0.1900095333370357]
  }),
  methods: {
    play() {
      const audio = this.$refs.audio;
      if (audio.paused) {
        audio.play();
        this.timer = setInterval(this.draw, 100);
        this.icon = this.pauseIcon;
      } else {
        audio.pause();
        clearInterval(this.timer);
        this.icon = this.playIcon;
      }
    },
    draw() {
      // Set up the canvas
      const canvas = document.querySelector("canvas");
      const audioElement = this.$refs.audio;
      const dpr = window.devicePixelRatio || 1;
      const padding = 20;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
      this.ctx = canvas.getContext("2d");
      this.ctx.scale(dpr, dpr);
      this.ctx.translate(0, canvas.offsetHeight / 2 + padding); // Set Y = 0 to be in the middle of the canvas

      // draw the line segments
      const width = canvas.offsetWidth / (this.data.length);
      for (let i = 0; i < this.data.length; i++) {
        const x = width * i;
        let height = Math.abs(this.data[i] * canvas.offsetHeight - padding);
        if (height > canvas.offsetHeight / 2) {
          height = height > canvas.offsetHeight / 2;
        }
        const black = x + (i * (width / 2)) < ((audioElement.currentTime / audioElement.duration) * canvas.offsetWidth);
        this.drawLineSegment(x + (i * (width / 2)), height, width, black);
      }
      this.drawDesign(canvas.offsetWidth, canvas.offsetHeight, audioElement);
    },
    drawLineSegment(x, y, width, black) {
      const c = this.ctx;
      c.lineWidth = 0; // how thick the line is
      c.fillStyle = black ? "#000" : "#fff";
      c.beginPath();
      c.rect(x, -y, width, y);
      c.fill();
    },
    drawDesign(width, height, audioElement) {
      const c = this.ctx;
      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(width, 0);
      c.moveTo(0, -40);
      c.lineTo(width, -40);
      c.stroke();
      c.beginPath();
      c.fillStyle = "#000";
      c.rect((audioElement.currentTime / audioElement.duration) * width - 2, -40, 4, 5);
      c.fill();
    }
  }
};
</script>
<style lang="scss">
.podcast__player-inner {
  background: #C6C7C4;
  width: 100%;
  padding: 1.5rem 1rem;
  h6 {
    font-size: 13px;
  }
  .podcast__player-container {
    position: relative;
    display: flex;
    justify-content: center;
    .podcast__player-cover{
      height: 150px;
      width: 150px;
    }
    .podcast__player-controls {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 1rem;
      h3 {
        font-weight: bold;
        margin-top: .5rem;
        font-size: 14px;
      }
      p {
        font-size: xx-small;
      }
    }
    .podcast__player-btn-container {
      position: relative;
      display: flex;
      flex-direction: row;
      .podcast__player-btn{
        width: 20px;
        height: 20px;
        img {
          vertical-align: top;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
canvas {
    width: 150px;
    height: 40px;
    display: block;
}
</style>
