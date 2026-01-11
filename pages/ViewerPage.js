import { createBackButton, createARButton } from '../components/Button.js';

/**
 * Create hotspot button for model viewer
 * @param {string} position - Position in 3D space (e.g., "0.1 0.2 0.1")
 * @param {string} normal - Normal direction (e.g., "0 1 0")
 * @param {string} slotName - Slot name for the hotspot
 * @param {string} annotationHTML - HTML content for the annotation
 * @returns {HTMLElement}
 */
function createHotspot(position, normal, slotName, annotationHTML) {
    const button = document.createElement('button');
    button.className = 'hotspot';
    button.slot = slotName;
    button.setAttribute('data-position', position);
    button.setAttribute('data-normal', normal);
    
    const annotation = document.createElement('div');
    annotation.className = 'annotation';
    annotation.innerHTML = annotationHTML;
    button.appendChild(annotation);
    
    return button;
}

/**
 * Hotspot data for cheeseburger
 */
const hotspotData = {
    'models/cheeseburger.glb': [
        {
            name: 'nutrition',
            position: '-0.1 0.2 0.1',
            normal: '0 1 0',
            annotation: '🥩 Protein: 24g <br> 🍞 Carbs: 30g <br> 🚫 Allergens: Gluten, Dairy'
        },
        {
            name: 'spice',
            position: '0.1 0.2 0.1',
            normal: '0 1 0',
            annotation: '🌶️ Spice Level: Medium'
        }
    ]
};

/**
 * Viewer page with model-viewer
 * @param {function} onBack - Callback when back button is clicked
 * @returns {HTMLElement}
 */
export function createViewerPage(onBack) {
    const container = document.createElement('div');
    container.id = 'viewer-screen';
    
    // Back button
    const backButton = createBackButton(onBack);
    container.appendChild(backButton);
    
    // Loader
    const loader = document.createElement('div');
    loader.id = 'loader';
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    const loaderText = document.createElement('p');
    loaderText.textContent = 'Loading the model...';
    loader.appendChild(spinner);
    loader.appendChild(loaderText);
    container.appendChild(loader);
    
    // Model viewer
    const modelViewer = document.createElement('model-viewer');
    modelViewer.id = 'main-mv';
    modelViewer.src = '';
    modelViewer.ar = true;
    modelViewer.setAttribute('ar-modes', 'webxr scene-viewer quick-look');
    modelViewer.setAttribute('environment-image', 'neutral');
    modelViewer.setAttribute('exposure', '1');
    modelViewer.setAttribute('tone-mapping', 'neutral');
    modelViewer.setAttribute('camera-controls', '');
    modelViewer.setAttribute('shadow-intensity', '1');
    modelViewer.setAttribute('loading', 'eager');
    modelViewer.setAttribute('auto-rotate', '');
    
    // AR button
    const arButton = createARButton();
    modelViewer.appendChild(arButton);
    
    // Store reference to model viewer for later hotspot updates
    modelViewer.updateHotspots = function(modelFile) {
        // Remove existing hotspots
        modelViewer.querySelectorAll('.hotspot').forEach(hotspot => hotspot.remove());
        
        // Add new hotspots if they exist for this model
        if (hotspotData[modelFile]) {
            hotspotData[modelFile].forEach(spot => {
                const hotspot = createHotspot(
                    spot.position,
                    spot.normal,
                    `hotspot-${spot.name}`,
                    spot.annotation
                );
                modelViewer.appendChild(hotspot);
            });
        }
    };
    
    container.appendChild(modelViewer);
    
    return container;
}
