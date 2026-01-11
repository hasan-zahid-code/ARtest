/**
 * Reusable button component
 * @param {string} text - Button text
 * @param {string} emoji - Emoji icon
 * @param {function} onClick - Click handler
 * @returns {HTMLElement}
 */
export function createButton(text, emoji, onClick) {
    const button = document.createElement('button');
    button.className = 'select-btn';
    button.textContent = `${emoji} ${text}`;
    button.onclick = onClick;
    return button;
}

/**
 * Back button component
 * @param {function} onClick - Click handler
 * @returns {HTMLElement}
 */
export function createBackButton(onClick) {
    const button = document.createElement('button');
    button.className = 'back-btn';
    button.textContent = '← Back';
    button.onclick = onClick;
    return button;
}

/**
 * AR button component
 * @returns {HTMLElement}
 */
export function createARButton() {
    const button = document.createElement('button');
    button.id = 'ar-button';
    button.textContent = 'VIEW IN YOUR ROOM';
    button.slot = 'ar-button';
    return button;
}
