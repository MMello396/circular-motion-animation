// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#18A3CC', '#346DDE', '#6F59E0', '#0E48BB'];

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
})

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// Objects
function Particle(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.distance = randomIntFromRange(20,80);
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = velocity;
    this.lastMouse = {x: x, y: y};

    this.update = () => {
        const lastPoint = {x: this.x, y: this.y};
        //Move points over time
        this.radians += this.velocity;

        //drag effect
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * .05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * .05;

        //Circular Motion
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distance;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distance;
        this.draw(lastPoint);
    }

    this.draw = lastPoint => {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
    }
}

// Implementation
let particles;
function init() {
    particles = [];

    for (let i = 0; i < 100; i++) {
        const radius = (Math.random() * 2) + 1;
        const velocity = (Math.random()/30) + .02;
        particles.push(new Particle(canvas.width/2, canvas.height/2, radius, randomColor(colors), velocity));
    }

}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    //Trail effect
    c.fillStyle = 'rgba(255, 255, 255, 0.05)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
     particle.update();
    });
}

init();
animate();
