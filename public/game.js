// 소원이 공장 탈출기! — solo client, main loop

import * as player from './player.js';
import * as input from './input.js';
import * as graphics from './graphics.js';
import * as physics from './physics.js';
import * as camera from './camera.js';
import * as assets from './assets.js';
import * as network from './network.js';
import * as particles from './particles.js';
import * as sound from './sound.js';
import * as ui from './ui.js';
import * as level from './level.js';
import * as editor from './editor.js'; // For development/debugging

// Game state
let gameState = {
    player: player.createPlayer(),
    entities: [], // Other dynamic entities
    currentLevel: null,
    camera: camera.createCamera(),
    deltaTime: 0,
    lastFrameTime: performance.now(),
    gameTime: 0,
    paused: false,
    debugMode: false,
    isOnline: false,
    // Add other global game state variables here
};

// Main game loop
function gameLoop(currentTime) {
    gameState.deltaTime = (currentTime - gameState.lastFrameTime) / 1000; // Convert to seconds
    gameState.lastFrameTime = currentTime;
    gameState.gameTime += gameState.deltaTime;

    if (!gameState.paused) {
        // 1. Input
        input.update();

        // 2. Network (if online)
        if (gameState.isOnline) {
            network.sendPlayerState(gameState.player);
            network.receiveUpdates(gameState);
        }

        // 3. Physics & Game Logic
        player.updatePlayer(gameState.player, gameState.deltaTime, gameState.currentLevel);
        physics.updateEntities(gameState.entities, gameState.deltaTime, gameState.currentLevel);
        particles.updateParticles(gameState.deltaTime);
        level.updateLevel(gameState.currentLevel, gameState.deltaTime); // E.g., moving platforms, traps

        // Update camera to follow player
        camera.updateCamera(gameState.camera, gameState.player, gameState.currentLevel);

        // 4. Sound
        sound.update(gameState.player.position, gameState.camera.position);

        // 5. UI (before rendering world for overlays, after for HUD)
        ui.update(gameState);
    }

    // 6. Graphics
    graphics.clearScreen();
    graphics.renderLevel(gameState.currentLevel, gameState.camera);
    graphics.renderEntities(gameState.entities, gameState.camera);
    graphics.renderPlayer(gameState.player, gameState.camera);
    particles.renderParticles(gameState.camera);
    ui.render(gameState);

    // Development/Debugging tools
    if (gameState.debugMode) {
        editor.renderDebugInfo(gameState);
    }

    requestAnimationFrame(gameLoop);
}

// Initialization
async function initializeGame() {
    console.log("Initializing game...");
    await assets.loadAllAssets();
    console.log("Assets loaded.");

    graphics.initializeGraphics();
    input.initializeInput();
    sound.initializeSound();
    // ui.initializeUI(); // If UI needs separate init

    // Load initial level
    gameState.currentLevel = level.loadLevel('level1'); // Or fetch from server if online

    // Start network connection if applicable
    // network.connectToServer();
    // gameState.isOnline = true; // Set based on successful connection

    // Start the game loop
    console.log("Starting game loop.");
    requestAnimationFrame(gameLoop);
}

// Export parts of the state for other modules if necessary, or provide getters
export function getGameState() {
    return gameState;
}

// Start the game when the window loads
window.onload = initializeGame;