
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("birthdayCanvas");
    const ctx = canvas.getContext("2d");
    const button = document.getElementById("main-section-button");


    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    let fontSize = 50;
    let scale = 1;
    let rotation = 0;
    let colorIndex = 0;
    const colors = ["#ff4d4d", "#ffcc00", "#66ff66", "#3399ff", "#cc66ff"];

    const confetti = [];
    const numConfetti = 200;

    class Confetti {
        constructor(x, y, size, color, speedX, speedY) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.speedX = speedX;
            this.speedY = speedY;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
                this.x = Math.random() * canvas.width;
                this.y = -10;
            }

            this.draw();
        }
    }

    for (let i = 0; i < numConfetti; i++) {
        const size = Math.random() * 5 + 2;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const speedX = (Math.random() - 0.5) * 2;
        const speedY = Math.random() * 3 + 1;
        confetti.push(new Confetti(x, y, size, color, speedX, speedY));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetti.forEach((particle) => particle.update());

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2); 
        ctx.rotate(rotation);
        ctx.scale(scale, scale);
        ctx.font = `${fontSize}px 'Sour Gummy', sans-serif`;
        ctx.textAlign = "center";
        ctx.fillStyle = colors[colorIndex];
        ctx.fillText("HAPPY BIRTHDAY MY WOMAN", 0, 0);
        ctx.restore();

        scale = Math.sin(Date.now() * 0.002) * 0.5 + 1.5; 
        rotation += 0.005; 
        if (Math.floor(Date.now() * 0.002) % colors.length === 0) {
            colorIndex = (colorIndex + 1) % colors.length; 
        }

        requestAnimationFrame(animate);
    }

    animate();

    button.addEventListener('click', () => {
        window.location.href = "/Pages/displaySection.html"
    })
});




