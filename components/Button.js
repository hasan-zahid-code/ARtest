export function createButton(text, emoji, onClick) {
    const button = document.createElement('button');
    button.className = 'select-btn';
    button.textContent = `${emoji} ${text}`;
    button.onclick = onClick;
    return button;
}

export function createBackButton(onClick) {
    const button = document.createElement('button');
    button.className = 'back-btn';
    button.textContent = '\u2190\u00A0Menu';
    button.onclick = onClick;
    return button;
}

export function createARButton() {
    const button = document.createElement('button');
    button.id = 'ar-button';
    button.slot = 'ar-button';
    button.textContent = 'Place in Your Space';
    return button;
}
