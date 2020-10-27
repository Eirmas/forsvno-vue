<template>
  <div
    ref="wrapper"
    style="background: #e2e6e9;"
  >
    <audio :src="music" id="myAudio" controls></audio>
    <button v-on:click.prevent="drawAudio()">Play</button>
    <canvas></canvas>
  </div>
</template>

<script>

export default {
  name: "Podcast",
  props: {

  },
  components: {

  },
  data: () => ({
    currentBuffer: null,
    ctx: null,
    music: require("@/assets/images/podcast.mp3")
  }),
  watch: {

  },
  methods: {
    drawAudio() {
      const audio = document.getElementById("myAudio");
      console.log(audio);
      const ctx = new AudioContext();
      const audioSrc = ctx.createMediaElementSource(audio);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      audioSrc.connect(analyser);
      analyser.connect(ctx.destination);

      const frequencyData = new Uint8Array(analyser.frequencyBinCount);
      function renderFrame(self) {
        requestAnimationFrame(() => { renderFrame(self); });
        analyser.getByteFrequencyData(frequencyData);
        self.draw(frequencyData);
      }
      if (!audio.isPlaying) {
        audio.play();
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
      const size = 40;
      c.globalAlpha = 0.1;
      c.strokeStyle = "#c8d2da";
      c.fillStyle = "#d4dde3";
      c.lineWidth = 4;
      c.lineJoin = "round";
      c.lineCap = "round";
      const data = normalizedData.slice(50, 400).filter((_, i) => i % 8 === 0);
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
      c.fillStyle = "#191b21";
      c.globalAlpha = 1;
      c.arc(0, 0, size, 0, 2 * pi);
      c.fill();
    }
  }
};
</script>
<style lang="scss">
canvas {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    display: block;
    transform: rotate(-90deg);
}
</style>
