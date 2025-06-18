const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');
let width, height;
let raindrops = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const mouse = { x: null, y: null };

document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function createRaindrops(count) {
  for (let i = 0; i < count; i++) {
    raindrops.push({
      x: Math.random() * width,
      y: Math.random() * height,
      speedY: 4 + Math.random() * 4,
      length: 10 + Math.random() * 10
    });
  }
}

function drawRain() {
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = 'rgba(173,216,230,0.8)';
  ctx.lineWidth = 1;

  for (let drop of raindrops) {
    const dx = drop.x - mouse.x;
    const dy = drop.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 100) {
      const angle = Math.atan2(dy, dx);
      drop.x += Math.cos(angle) * 5;
      drop.y += Math.sin(angle) * 5;
    }

    ctx.beginPath();
    ctx.moveTo(drop.x, drop.y);
    ctx.lineTo(drop.x, drop.y + drop.length);
    ctx.stroke();

    drop.y += drop.speedY;

    if (drop.y > height) {
      drop.y = -drop.length;
      drop.x = Math.random() * width;
    }
  }

  requestAnimationFrame(drawRain);
}

createRaindrops(150);
drawRain();
