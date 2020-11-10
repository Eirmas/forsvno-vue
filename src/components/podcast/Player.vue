<template>
  <div
    class="podcast__player-inner"
  >
    <h6>TEASER: EPISODE 1</h6>
    <div class="podcast__player-container">
      <img src="https://mediacdn.acast.com/assets/21187288-948e-44cf-80a1-a9952adab357/cover-image-k1b6sx75-pod_f5_3.jpeg" alt="" class="podcast__player-cover">

      <audio src="https://media.acast.com/forsvaret/deringenandrevilfly-2-2-/media.mp3" ref="audio" crossorigin="anonymous"></audio>
      <div class="podcast__player-controls">
        <h6>
          <i>Når livet blir forandret</i>
        </h6>
        <p>I denne episoden skal dere blir kejnt med helge og hvordan hans internasjonale operasjoner fornadret hans liv.</p>
        <div class="podcast__player-btn-container">
          <button v-on:click.prevent="play()" class="podcast__player-btn"><img :src="icon" alt="Play"></button>
          <button v-on:click.prevent="play()" class="podcast__player-btn"><img :src="icon" alt="Play"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "PodcastPlayer",
  props: {

  },
  components: {

  },
  created() {
    this.icon = this.playIcon;
  },
  mounted() {
    this.draw([]);
  },
  data: () => ({
    analyserCreated: false,
    ctx: null,
    icon: null,
    playIcon: require("@/assets/images/play.svg"),
    pauseIcon: require("@/assets/images/pause.svg"),
    skip: require("@/assets/images/skip.svg")
  }),
  watch: {

  },
  methods: {
    play() {
      const audio = this.$refs.audio;
      if (audio.paused) {
        if (!this.analyserCreated) this.drawAudio(audio);
        audio.play();
        this.icon = this.pauseIcon;
      } else {
        audio.pause();
        this.icon = this.playIcon;
      }
    },
    skipForward() {
      const audio = this.$refs.audio;
      audio.currentTime += 30;
    },
    skipBackward() {
      const audio = this.$refs.audio;
      audio.currentTime -= 30;
    },
    drawAudio(audio) {
      const ctx = new AudioContext();
      const audioSrc = ctx.createMediaElementSource(audio);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      audioSrc.connect(analyser);
      analyser.connect(ctx.destination);
      this.analyserCreated = true;
      const frequencyData = new Uint8Array(analyser.frequencyBinCount);
      function renderFrame(self) {
        requestAnimationFrame(() => { renderFrame(self); });
        analyser.getByteFrequencyData(frequencyData);
        self.draw(frequencyData);
      }
      renderFrame(this);
    },
    draw(normalizedData) {
      // Set up the canvas
      const canvas = document.querySelector("canvas");
      const dpr = window.devicePixelRatio || 1;
      const padding = 0;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
      this.ctx = canvas.getContext("2d");
      this.ctx.scale(dpr, dpr);
      this.ctx.translate(canvas.offsetWidth / 2 + padding, canvas.offsetHeight / 2 + padding); // Set Y = 0 to be in the middle of the canvas

      // draw the line segments
      this.drawLineSegment(normalizedData);
    },
    drawLineSegment(normalizedData) {
      const c = this.ctx;
      const pi = Math.PI;
      const size = 30;
      c.globalAlpha = 1;
      c.strokeStyle = "#191b21";
      c.lineWidth = 2;
      c.lineJoin = "round";
      c.lineCap = "round";
      const data = normalizedData.slice(100, 200).filter((_, i) => i % 4 === 0);
      for (let t = 0; t < pi / 2; t += pi * 0.0005) {
        const x = data[Math.floor(t * (data.length / pi / 2))] * (size / 360);
        if (t === 0) {
          c.moveTo(Math.cos(t) * (size + x), Math.sin(t) * (size + x));
        } else {
          c.lineTo(Math.cos(t) * (size + x), Math.sin(t) * (size + x));
        }
      }
      for (let t = pi / 2; t < pi; t += pi * 0.0005) {
        const x = data[Math.floor(t * (data.length / pi / 2))] * (size / 360);
        c.lineTo(Math.cos(t) * (size + x), Math.sin(t) * (size + x));
      }
      for (let t = pi; t < (3 * pi) / 2; t += pi * 0.0005) {
        const x = data[data.length - Math.floor(t * (data.length / pi / 2))] * (size / 360);
        c.lineTo(Math.cos(t) * (size + x), Math.sin(t) * (size + x));
      }
      for (let t = (3 * pi) / 2; t < 2 * pi; t += pi * 0.0005) {
        const x = data[data.length - Math.floor(t * (data.length / pi / 2))] * (size / 360);
        c.lineTo(Math.cos(t) * (size + x), Math.sin(t) * (size + x));
      }
      c.closePath();
      c.stroke();
      c.fill();

      c.beginPath();
      c.fillStyle = "#e2e6e9";
      c.globalAlpha = 1;
      c.arc(0, 0, size, 0, 2 * pi);
      c.fill();
    }
  }
};
</script>
<style lang="scss">
.podcast__player-inner {
  background: #C6C7C4;
  width: 100%;
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
      justify-content: space-between;
      margin: 0 1rem;
      h3 {
        font-weight: bold;
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
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
canvas {
    width: 150px;
    height: 150px;
    display: block;
    transform: rotate(-90deg);
}
</style>
