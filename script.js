import { createMenuPage } from './pages/MenuPage.js';
import { createViewerPage } from './pages/ViewerPage.js';

const app = document.body;

let selectionScreen, viewerScreen, loader, mv;

function initializeApp() {
    selectionScreen = createMenuPage(launchAR);
    app.appendChild(selectionScreen);

    viewerScreen = createViewerPage(goBack);
    app.appendChild(viewerScreen);

    loader = document.getElementById('loader');
    mv = document.getElementById('main-mv');

    mv.addEventListener('load', () => {
        loader.style.display = 'none';
    });
}

function launchAR(item) {
    selectionScreen.style.display = 'none';
    viewerScreen.style.display = 'block';
    loader.style.display = 'flex';

    const loaderText = loader.querySelector('p');
    if (loaderText) loaderText.textContent = `Loading ${item.name}…`;

    if (mv.updateHotspots) mv.updateHotspots(item);

    mv.src = item.modelFile;

    updateViewerOverlay(item);
}

const VIEWER_SPICE_WORDS = ['Not Spicy', 'Mild', 'Medium', 'Hot', 'Very Hot', 'Intense'];

function updateViewerOverlay(item) {
    const overlay = viewerScreen.querySelector('.viewer-info-overlay');
    if (!overlay) return;

    overlay.querySelector('.viewer-item-name').textContent = item.name;
    overlay.querySelector('.viewer-item-price').textContent = `$${item.price.toFixed(2)}`;

    const n = item.nutrition;
    overlay.querySelector('.viewer-nutrition-summary').textContent =
        `${n.calories} kcal  ·  ${n.protein}g protein  ·  ${n.carbs}g carbs  ·  ${n.fat}g fat`;

    const spiceEl = overlay.querySelector('.viewer-spice-row');
    spiceEl.textContent = item.spice === 0
        ? 'No Heat'
        : `${VIEWER_SPICE_WORDS[item.spice] || 'Hot'} Heat`;
    spiceEl.setAttribute('data-level', item.spice);
}

function goBack() {
    viewerScreen.style.display = 'none';
    selectionScreen.style.display = 'flex';
    mv.src = '';
}

document.addEventListener('DOMContentLoaded', initializeApp);
