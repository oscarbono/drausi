const canvas = document.getElementById('drawingBoard');
const ctx = canvas.getContext('2d');

// Ajustar el tamaño del canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas(); // Configurar el tamaño al cargar la página

window.addEventListener('resize', resizeCanvas);

// Variables para dibujar
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Función para comenzar a dibujar
function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.clientX, e.clientY];
}

// Función para dibujar con pincel estándar
function draw(e) {
    if (!isDrawing) return;

    ctx.lineWidth = document.getElementById('brushSize').value; // Tamaño del pincel
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    const color = document.getElementById('colorPicker').value; // Color del pincel
    ctx.strokeStyle = color;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();

    [lastX, lastY] = [e.clientX, e.clientY];
}

// Función para detener el dibujo
function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

// Eventos del mouse
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Botón para limpiar el canvas
const clearCanvasButton = document.getElementById('clearCanvas');
clearCanvasButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Control del color del pincel
const colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('input', (e) => {
    ctx.strokeStyle = e.target.value;
});

// Control del tamaño del pincel
const brushSize = document.getElementById('brushSize');
brushSize.addEventListener('input', (e) => {
    ctx.lineWidth = e.target.value;
});

// Agregar evento de clic al botón "Qué es"
const aboutButton = document.getElementById('aboutButton');
aboutButton.addEventListener('click', () => {
    window.location.href = 'about.html'; // Redirige a about.html
});
