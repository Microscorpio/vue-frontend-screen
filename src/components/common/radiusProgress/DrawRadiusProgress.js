const ANGLE = 360
const defaults = {
  name: 'AQI',
  size: 260,
  percent: 30,
  total: 500,
  lineWidth: 13,
  textSize: 30,
  textColor: '#ffffff',
  strokeColor: '#252C3F',
  activeColor: '#3ee19a',
  startColor: "#13D8D3",
  endColor: "#2E45FF"
}
export default class DrawRadiusProgress {
  constructor(id, options) {
    this.id = id
    this.options = Object.assign({}, defaults, options)
    this.arcAngle = 270
    this.startAngle = (ANGLE - this.arcAngle + (ANGLE - this.arcAngle) / 2) * Math.PI / 180
    this.endAngle = (ANGLE - this.arcAngle - (ANGLE - this.arcAngle) / 2) * Math.PI / 180
  }
  init() {
    const self = this
    const { name, percent, total, size, lineWidth, strokeColor, textColor, textSize } = self.options
    this.canvas = document.getElementById(this.id).getContext('2d')
    const canvas = this.canvas
    const r = size - (lineWidth * 2)
    canvas.strokeStyle = strokeColor;
    canvas.lineWidth = lineWidth * 2;
    canvas.lineCap = 'round';
    canvas.beginPath();
    canvas.arc(size, size, r, self.startAngle, self.endAngle, false);
    canvas.stroke();
    canvas.closePath();
    canvas.textAlign="center";
    canvas.font = `normal normal 300 ${textSize * 3}px sans-serif`;
    canvas.fillStyle = textColor;
    canvas.fillText(name, size,size * 2 - textSize * 2 , size * 2);
    canvas.fillText('0',textSize * 6,size * 2 - textSize * 2);
    canvas.fillText(total,size * 2 - textSize * 6,size * 2 - textSize * 2);
    self.draw(percent)
  }
  drawProgress(score) {
    const self = this
    const canvas = self.canvas
    const { size, lineWidth, activeColor } = self.options
    const r = size - lineWidth * 2
    const start = ANGLE - self.arcAngle + (ANGLE - self.arcAngle) / 2
    score = score > 100 ? 1 : score / 100;
    const endAngle = (start + self.arcAngle * score) * Math.PI / 180;

    // 取消渐变 根据不同值渲染不同的颜色
    // const gradient = canvas.createLinearGradient(0,0,size,0);
    // gradient.addColorStop('0', startColor);
    // gradient.addColorStop('1', endColor);
    // canvas.strokeStyle = gradient;
    canvas.strokeStyle = activeColor;
    canvas.beginPath();
    canvas.arc(size, size, r, self.startAngle, endAngle, false);
    canvas.stroke();
    canvas.closePath();
  }
  draw(score){
    let n = 0
    const self = this
    if (self.timer) {
      clearInterval(self.timer)
    } else {
      self.timer = setInterval(() => {
        if(n>score){
          clearInterval(self.timer);
        }else{
          self.drawProgress(n);
          n += 1;
        }
      },15);
    }
  }
  clear() {
    if (this.canvas) {
      this.canvas = null
    }
  }
}
