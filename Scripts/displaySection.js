const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

for (let i = 0; i < 20; i++) {
    hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 20, 
        dx: (Math.random() - 0.5) * 4, 
        dy: (Math.random() - 0.5) * 4, 
        color: `hsl(${Math.random() * 360}, 70%, 60%)` 
    });
}

function drawHeart(x, y, size, color) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.scale(size / 50, size / 50); 
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-25, -25, -50, 20, 0, 40);
    ctx.bezierCurveTo(50, 20, 25, -25, 0, 0);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
}

function updateHearts() {
    hearts.forEach((heart) => {
        
        heart.x += heart.dx;
        heart.y += heart.dy;

        if (heart.x - heart.size < 0 || heart.x + heart.size > canvas.width) {
            heart.dx = -heart.dx;
        }
        if (heart.y - heart.size < 0 || heart.y + heart.size > canvas.height) {
            heart.dy = -heart.dy;
        }
    });
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function animate() {
    clearCanvas();

    hearts.forEach((heart) => {
        drawHeart(heart.x, heart.y, heart.size, heart.color);
    });

    updateHearts();

    requestAnimationFrame(animate);
}

animate();
