/* eslint-disable no-param-reassign */
class Wave {
  constructor(canvas, data) {
    // Set up the canvas
    this.dpr = window.devicePixelRatio || 1;
    this.padding = 0;
    this.canvas = canvas;
    this.canvas.width = canvas.offsetWidth * this.dpr;
    this.canvas.height = (canvas.offsetHeight + this.padding * 2) * this.dpr;
    this.ctx = canvas.getContext("2d");
    this.ctx.scale(this.dpr, this.dpr);
    this.ctx.translate(0, canvas.offsetHeight + this.padding); // Set Y = 0 to be in the middle of the canvas
    this.currentTime = 0;
    this.duration = 1;
    this.data = data;

    this.draw();
  }

  update(data, duration) {
    this.duration = duration;
    this.data = data;
    this.draw();
  }

  draw(currentTime) {
    this.currentTime = currentTime;
    // draw the line segments
    this.ctx.clearRect(0, -this.canvas.height, this.canvas.width, this.canvas.height * 2);
    const width = this.canvas.offsetWidth / (this.data.length * 1.5);
    for (let i = 0; i < this.data.length; i++) {
      const x = width * i;
      let height = Math.abs(this.data[i] * this.canvas.offsetHeight);
      if (height > this.canvas.offsetHeight * 0.75) {
        height = this.canvas.offsetHeight * 0.75;
      }
      const black = x + (i * (width / 2)) < ((this.currentTime / this.duration) * this.canvas.offsetWidth);
      this.drawLineSegment(x + (i * (width / 2)), height, width, black);
    }
    this.drawDesign(this.canvas.offsetWidth, this.canvas.offsetHeight, this.padding);
  }

  drawLineSegment(x, y, width, black) {
    this.ctx.lineWidth = 0; // how thick the line is
    this.ctx.fillStyle = black ? "#000" : "#fff";
    this.ctx.beginPath();
    this.ctx.rect(x, -y, width, y);
    this.ctx.fill();
  }

  drawDesign(width, height, padding) {
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(width, 0);
    this.ctx.moveTo(0, -(height));
    this.ctx.lineTo(width, -(height));
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.fillStyle = "#000";
    this.ctx.rect((this.currentTime / this.duration) * width - 2, -height, 4, 3);
    this.ctx.fill();
  }
}

module.exports = Wave;
