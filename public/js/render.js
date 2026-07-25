// render: canvas setup + world drawing
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function drawWorld(world) {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background (e.g., floor)
    ctx.fillStyle = '#888';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw world elements
    world.elements.forEach(element => {
        ctx.fillStyle = element.color;
        ctx.fillRect(element.x, element.y, element.width, element.height);
    });

    // Draw player
    ctx.fillStyle = world.player.color;
    ctx.fillRect(world.player.x, world.player.y, world.player.width, world.player.height);
}

export { drawWorld };