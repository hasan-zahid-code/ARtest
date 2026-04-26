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

    const spinner = document.createElement('div');
    spinner.className = 'spinner';

    const loaderText = document.createElement('p');
    loaderText.textContent = 'Loading...';

    loader.appendChild(spinner);
    loader.appendChild(loaderText);
    container.appendChild(loader);

    // Model viewer
    const modelViewer = document.createElement('model-viewer');
    modelViewer.id = 'main-mv';
    modelViewer.src = '';
    modelViewer.setAttribute('ar', '');
    modelViewer.setAttribute('ar-modes', 'webxr scene-viewer quick-look');
    modelViewer.setAttribute('environment-image', 'neutral');
    modelViewer.setAttribute('exposure', '1');
    modelViewer.setAttribute('tone-mapping', 'neutral');
    modelViewer.setAttribute('camera-controls', '');
    modelViewer.setAttribute('shadow-intensity', '1');
    modelViewer.setAttribute('loading', 'eager');
    modelViewer.setAttribute('auto-rotate', '');

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

    // Dynamically track overlay height so AR button clears it
    const ro = new ResizeObserver(entries => {
        for (const entry of entries) {
            container.style.setProperty('--overlay-height', `${Math.ceil(entry.target.offsetHeight)}px`);
        }
    });
    ro.observe(overlay);

    return container;
}
