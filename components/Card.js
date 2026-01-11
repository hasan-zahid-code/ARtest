/**
 * Banner component
 * @param {string} title - Banner title
 * @param {string} subtitle - Banner subtitle
 * @returns {HTMLElement}
 */
export function createBanner(title, subtitle) {
    const banner = document.createElement('div');
    banner.className = 'banner';
    
    const bannerContent = document.createElement('div');
    bannerContent.className = 'banner-content';
    
    const titleElement = document.createElement('h1');
    titleElement.className = 'banner-title';
    titleElement.textContent = title;
    
    const subtitleElement = document.createElement('p');
    subtitleElement.className = 'banner-subtitle';
    subtitleElement.textContent = subtitle;
    
    bannerContent.appendChild(titleElement);
    bannerContent.appendChild(subtitleElement);
    banner.appendChild(bannerContent);
    
    return banner;
}

/**
 * Category slider component
 * @param {Array} categories - Array of category names
 * @param {function} onCategorySelect - Callback when category is selected
 * @returns {HTMLElement}
 */
export function createCategorySlider(categories, onCategorySelect) {
    const slider = document.createElement('div');
    slider.className = 'category-slider';
    
    const sliderContent = document.createElement('div');
    sliderContent.className = 'category-slider-content';
    
    categories.forEach((category, index) => {
        const categoryBtn = document.createElement('button');
        categoryBtn.className = 'category-btn';
        categoryBtn.setAttribute('data-category', category);
        if (index === 0) categoryBtn.classList.add('active');
        categoryBtn.textContent = category;
        categoryBtn.onclick = () => {
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            categoryBtn.classList.add('active');
            onCategorySelect(category);
        };
        sliderContent.appendChild(categoryBtn);
    });
    
    slider.appendChild(sliderContent);
    return slider;
}

/**
 * Menu item card component
 * @param {Object} item - Menu item object
 * @param {string} item.name - Item name
 * @param {string} item.emoji - Item emoji
 * @param {string} item.description - Item description
 * @param {string} item.modelFile - 3D model file path
 * @param {function} onClick - Click handler
 * @returns {HTMLElement}
 */
export function createMenuCard(item, onClick) {
    const card = document.createElement('div');
    card.className = 'menu-card';
    
    const cardImage = document.createElement('div');
    cardImage.className = 'menu-card-image';
    cardImage.textContent = item.emoji;
    
    const cardContent = document.createElement('div');
    cardContent.className = 'menu-card-content';
    
    const cardName = document.createElement('h3');
    cardName.className = 'menu-card-name';
    cardName.textContent = item.name;
    
    const cardDescription = document.createElement('p');
    cardDescription.className = 'menu-card-description';
    cardDescription.textContent = item.description;
    
    cardContent.appendChild(cardName);
    cardContent.appendChild(cardDescription);
    
    // Add annotation if available
    if (item.annotation) {
        const annotation = document.createElement('div');
        annotation.className = 'annotation';
        annotation.innerHTML = item.annotation;
        cardContent.appendChild(annotation);
    }
    
    const viewButton = document.createElement('button');
    viewButton.className = 'view-ar-btn';
    viewButton.textContent = '👁️ View AR';
    viewButton.onclick = (e) => {
        e.stopPropagation();
        onClick(item);
    };
    
    cardContent.appendChild(viewButton);
    
    card.appendChild(cardImage);
    card.appendChild(cardContent);
    
    return card;
}

/**
 * Menu grid component
 * @param {Array} items - Array of menu items
 * @param {function} onItemSelect - Callback when item is selected
 * @returns {HTMLElement}
 */
export function createMenuGrid(items, onItemSelect) {
    const grid = document.createElement('div');
    grid.className = 'menu-grid';
    
    items.forEach(item => {
        const card = createMenuCard(item, onItemSelect);
        grid.appendChild(card);
    });
    
    return grid;
}

/**
 * Instruction card component
 * @param {string} title - Card title
 * @param {string[]} instructions - Array of instruction text
 * @returns {HTMLElement}
 */
export function createInstructionCard(title, instructions) {
    const card = document.createElement('div');
    card.className = 'instruction-card';
    
    const titleElement = document.createElement('h3');
    titleElement.textContent = title;
    card.appendChild(titleElement);
    
    instructions.forEach(instruction => {
        const paragraph = document.createElement('p');
        paragraph.textContent = instruction;
        card.appendChild(paragraph);
    });
    
    return card;
}

/**
 * Menu card group component
 * @param {Array} buttons - Array of button elements
 * @returns {HTMLElement}
 */
export function createButtonGroup(buttons) {
    const group = document.createElement('div');
    group.className = 'btn-group';
    buttons.forEach(button => group.appendChild(button));
    return group;
}
