document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let spheres = [];

    class Sphere {
        constructor(x, y, radius) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = 'rgb(255,250,205)';
            this.velocityX = Math.random() * 0.5 - 0.25;
            this.velocityY = Math.random() * 0.5 - 0.25;
            this.previousX = x;
            this.previousY = y;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        Trail() {
            const trailRadius = this.radius * 1.5;
            const maxOpacity = 0.1;
            const opacityStep = maxOpacity / 10;
            const radiusStep = trailRadius / 10;

            for (let i = 0; i < 10; i++) {
                ctx.beginPath();
                ctx.arc(this.previousX, this.previousY, trailRadius + i * radiusStep, 0, Math.PI * 2, false);
                ctx.fillStyle = `rgba(255, 255, 224, ${maxOpacity - i * opacityStep})`;
                ctx.fill();
            }
        }

        update(mouse) {
            this.previousX = this.x;
            this.previousY = this.y;

            this.x += this.velocityX;
            this.y += this.velocityY;

            if (mouse.x !== undefined && mouse.y !== undefined) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    this.color = 'rgb(255, 255, 153)';
                    this.x += dx / distance;
                    this.y += dy / distance;

                    this.Trail();
                } else {
                    this.color = 'rgb(255,250,205)';
                }
            }

            this.draw();
        }
    }

    const init = () => {
        spheres = [];
        for (let i = 0; i <1000; i++) {
            const radius = Math.random() * 10 + 2;
            const x = Math.random() * (innerWidth - radius * 2) + radius;
            const y = Math.random() * (innerHeight - radius * 2) + radius;
            spheres.push(new Sphere(x, y, radius));
        }
    };

    const animate = () => {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        spheres.forEach(sphere => sphere.update(mouse));
    };

    const mouse = {
        x: undefined,
        y: undefined,
        radius: 150
    };

    window.addEventListener('mousemove', event => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    canvas.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    init();
    animate();
});
