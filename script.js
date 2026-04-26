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

function updateViewerOverlay(item) {
    const overlay = viewerScreen.querySelector('.viewer-info-overlay');
    if (!overlay) return;

    overlay.querySelector('.viewer-item-name').textContent = item.name;
    overlay.querySelector('.viewer-item-price').textContent = `$${item.price.toFixed(2)}`;

    // Nutrition chips
    const nutritionEl = overlay.querySelector('.viewer-nutrition-summary');
    nutritionEl.innerHTML = '';

    const chips = [
        { key: 'cal',     label: 'kcal',   value: item.nutrition.calories },
        { key: 'protein', label: 'protein', value: `${item.nutrition.protein}g` },
        { key: 'carbs',   label: 'carbs',   value: `${item.nutrition.carbs}g` },
        { key: 'fat',     label: 'fat',     value: `${item.nutrition.fat}g` },
    ];

    chips.forEach(({ key, label, value }) => {
        const chip = document.createElement('div');
        chip.className = `nutrition-chip ${key}`;
        chip.innerHTML = `<span class="nutrition-value">${value}</span><span class="nutrition-label">${label}</span>`;
        nutritionEl.appendChild(chip);
    });

    // Spice row
    const spiceEl = overlay.querySelector('.viewer-spice-row');
    spiceEl.innerHTML = '';

    if (item.spice === 0) {
        const label = document.createElement('span');
        label.className = 'spice-none';
        label.style.color = 'rgba(255,255,255,0.70)';
        label.style.background = 'rgba(255,255,255,0.10)';
        label.textContent = '✓ Not Spicy';
        spiceEl.appendChild(label);
    } else {
        for (let i = 1; i <= 5; i++) {
            const icon = document.createElement('span');
            icon.className = `spice-icon ${i <= item.spice ? 'active' : 'inactive'}`;
            icon.textContent = '🌶️';
            spiceEl.appendChild(icon);
        }
    }
}

function goBack() {
    viewerScreen.style.display = 'none';
    selectionScreen.style.display = 'flex';
    mv.src = '';
}

document.addEventListener('DOMContentLoaded', initializeApp);
