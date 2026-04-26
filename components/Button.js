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
    button.innerHTML = '&#8592; Menu';
    button.onclick = onClick;
    return button;
}

export function createARButton() {
    const button = document.createElement('button');
    button.id = 'ar-button';
    button.slot = 'ar-button';
    button.innerHTML = '&#x1F4F1; Place in Your Room';
    return button;
}
