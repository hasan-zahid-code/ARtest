import { createBackButton, createARButton } from '../components/Button.js';

function createHotspot(position, normal, slotName, label, detail) {
    const button = document.createElement('button');
    button.className = 'hotspot';
    button.slot = slotName;
    button.setAttribute('data-position', position);
    button.setAttribute('data-normal', normal);

    const annotation = document.createElement('div');
    annotation.className = 'annotation';
    annotation.innerHTML = `<strong>${label}</strong>${detail}`;
    button.appendChild(annotation);

    return button;
}

export function createViewerPage(onBack) {
    const container = document.createElement('div');
    container.id = 'viewer-screen';

    // Back button
    container.appendChild(createBackButton(onBack));

    // Loader
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `
        <p class="loader-name"></p>
        <div class="loader-bar-track"><div class="loader-bar-fill"></div></div>
        <p class="loader-percent">0%</p>
    `;
    container.appendChild(loader);

    // Model viewer
    const modelViewer = document.createElement('model-viewer');
    modelViewer.id = 'main-mv';
    modelViewer.src = '';
    modelViewer.setAttribute('ar', '');
    modelViewer.setAttribute('ar-modes', 'webxr scene-viewer quick-look');
    modelViewer.setAttribute('ar-scale', 'auto');
    modelViewer.setAttribute('ar-placement', 'floor');
    modelViewer.setAttribute('environment-image', 'neutral');
    modelViewer.setAttribute('exposure', '1.15');
    modelViewer.setAttribute('tone-mapping', 'commerce');
    modelViewer.setAttribute('shadow-intensity', '1.5');
    modelViewer.setAttribute('shadow-softness', '1');
    modelViewer.setAttribute('camera-orbit', '0deg 72deg auto');
    modelViewer.setAttribute('field-of-view', '30deg');
    modelViewer.setAttribute('min-camera-orbit', 'auto 0deg auto');
    modelViewer.setAttribute('max-camera-orbit', 'auto 90deg auto');
    modelViewer.setAttribute('camera-controls', '');
    modelViewer.setAttribute('auto-rotate', '');
    modelViewer.setAttribute('auto-rotate-delay', '2000');
    modelViewer.setAttribute('rotation-per-second', '12deg');
    modelViewer.setAttribute('loading', 'eager');

    // AR button inside model-viewer (slotted)
    modelViewer.appendChild(createARButton());

    // Hotspot update method — reads from item.hotspots
    modelViewer.updateHotspots = function(item) {
        modelViewer.querySelectorAll('.hotspot').forEach(h => h.remove());

        if (item.hotspots && item.hotspots.length > 0) {
            item.hotspots.forEach(spot => {
                const hotspot = createHotspot(
                    spot.position,
                    spot.normal,
                    `hotspot-${spot.name}`,
                    spot.label,
                    spot.detail
                );
                modelViewer.appendChild(hotspot);
            });
        }
    };

    container.appendChild(modelViewer);

    // Info overlay — sibling to model-viewer, NOT inside it
    const overlay = document.createElement('div');
    overlay.className = 'viewer-info-overlay';
    overlay.innerHTML = `
        <div class="viewer-item-header">
            <h2 class="viewer-item-name"></h2>
            <span class="viewer-item-price"></span>
        </div>
        <div class="viewer-rule"></div>
        <p class="viewer-nutrition-summary"></p>
        <p class="viewer-spice-row"></p>
    `;
    container.appendChild(overlay);

    return container;
}
