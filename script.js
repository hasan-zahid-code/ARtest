import { createMenuPage } from './pages/MenuPage.js';
import { createViewerPage } from './pages/ViewerPage.js';

const app = document.body;

// Initialize pages
let selectionScreen, viewerScreen, loader, mv;

function initializeApp() {
    // Create and append menu page
    selectionScreen = createMenuPage(launchAR);
    app.appendChild(selectionScreen);
    
    // Create and append viewer page
    viewerScreen = createViewerPage(goBack);
    app.appendChild(viewerScreen);
    
    // Get references to elements
    loader = document.getElementById('loader');
    mv = document.getElementById('main-mv');
    
    // Setup model viewer load listener
    mv.addEventListener('load', () => {
        loader.style.display = 'none';
    });
}

function launchAR(modelFile, itemName = 'Model') {
    // Show viewer screen, hide selection
    selectionScreen.style.display = 'none';
    viewerScreen.style.display = 'block';
    loader.style.display = 'flex';

    // Update loader text with item name
    const loaderText = loader.querySelector('p');
    if (loaderText) {
        loaderText.textContent = `Loading ${itemName}...`;
    }

    // Update hotspots for this model
    if (mv.updateHotspots) {
        mv.updateHotspots(modelFile);
    }

    // Set the model source
    mv.src = modelFile;
}

function goBack() {
    viewerScreen.style.display = 'none';
    selectionScreen.style.display = 'flex';
    mv.src = ""; // Stop loading the previous model
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);
