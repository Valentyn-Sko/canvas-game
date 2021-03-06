const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d')

canvas.width = innerWidth;
canvas.height = innerHeight;

console.log(canvas);

class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
}

class Projecttile {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();

    }
    update() {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;

    }
}

class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();

    }
    update() {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;

    }
}


const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x, y, 30, 'blue');
player.draw()
const projecttile = new Projecttile(
    canvas.width / 2, canvas.height / 2, 5, 'yellow', { x: 1, y: 1 }
)
const projecttiles = [];
const enemies = [];

function spawnEnemies() {
    setInterval(() => {
        const radius = Math.random() * (20 - 4) + 4;
        let x;
        let y;
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }

        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        enemies.push(new Enemy(x, y, radius, 'grey', velocity))
    }, 1000)
}


let animationId
function animate() {
    animationId =requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    player.draw()
    projecttiles.forEach(projecttile => {
        projecttile.update();
        if(projecttile)
    });
    enemies.forEach((enemy, indexE) => {
        enemy.update();
        const dist = Math.hypot(player.x - enemy.x,
            player.y - enemy.y)
            if (dist - enemy.radius - player.radius < 1) {
                setTimeout(() => {
                   cancelAnimationFrame(animationId);
                }, 0)
               
            }
        projecttiles.forEach((projecttile, indexP) => {
            const dist = Math.hypot(projecttile.x - enemy.x,
                projecttile.y - enemy.y)
            if (dist - enemy.radius - projecttile.radius / 2 < 1) {
                setTimeout(() => {
                    enemies.splice(indexE, 1);
                    projecttiles.splice(indexP, 1);
                }, 0)
               
            }
        });
    });


}

addEventListener('click', (event) => {
    const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2)
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    projecttiles.push(new Projecttile(canvas.width / 2, canvas.height / 2, 5, 'yellow', velocity))

});


animate();
spawnEnemies();