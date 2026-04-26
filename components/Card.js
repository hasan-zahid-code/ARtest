/**
 * Banner component
 */
export function createBanner(restaurantName, tagline) {
    const banner = document.createElement('div');
    banner.className = 'banner';

    const content = document.createElement('div');
    content.className = 'banner-content';

    const title = document.createElement('h1');
    title.className = 'banner-title';
    title.textContent = restaurantName;

    const subtitle = document.createElement('p');
    subtitle.className = 'banner-subtitle';
    subtitle.textContent = tagline;

    content.appendChild(title);
    content.appendChild(subtitle);
    banner.appendChild(content);
    return banner;
}

/**
 * Category slider component
 * @param {Array<{label: string, icon: string}>} categories
 */
export function createCategorySlider(categories, onCategorySelect) {
    const slider = document.createElement('div');
    slider.className = 'category-slider';

    const sliderContent = document.createElement('div');
    sliderContent.className = 'category-slider-content';

    categories.forEach((cat, index) => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.setAttribute('data-category', cat.label);
        if (index === 0) btn.classList.add('active');

        const iconSpan = document.createElement('span');
        iconSpan.className = 'cat-icon';
        iconSpan.textContent = cat.icon;

        const labelSpan = document.createElement('span');
        labelSpan.className = 'cat-label';
        labelSpan.textContent = cat.label;

        btn.appendChild(iconSpan);
        btn.appendChild(labelSpan);

        btn.onclick = () => {
            sliderContent.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            onCategorySelect(cat.label);
        };

        sliderContent.appendChild(btn);
    });

    slider.appendChild(sliderContent);
    return slider;
}

// --- Internal helpers ---

function createNutritionRow(nutrition) {
    const row = document.createElement('div');
    row.className = 'nutrition-row';

    const chips = [
        { key: 'cal',     label: 'kcal',    value: nutrition.calories },
        { key: 'protein', label: 'protein',  value: `${nutrition.protein}g` },
        { key: 'carbs',   label: 'carbs',    value: `${nutrition.carbs}g` },
        { key: 'fat',     label: 'fat',      value: `${nutrition.fat}g` },
    ];

    chips.forEach(({ key, label, value }) => {
        const chip = document.createElement('div');
        chip.className = `nutrition-chip ${key}`;

        const val = document.createElement('span');
        val.className = 'nutrition-value';
        val.textContent = value;

        const lbl = document.createElement('span');
        lbl.className = 'nutrition-label';
        lbl.textContent = label;

        chip.appendChild(val);
        chip.appendChild(lbl);
        row.appendChild(chip);
    });

    return row;
}

function createSpiceIndicator(level) {
    const wrapper = document.createElement('div');
    wrapper.className = 'spice-indicator';

    if (level === 0) {
        const label = document.createElement('span');
        label.className = 'spice-none';
        label.textContent = '✓ Not Spicy';
        wrapper.appendChild(label);
        return wrapper;
    }

    const spiceLabels = ['', 'Mild', 'Medium', 'Hot', 'Very Hot', 'Extreme'];
    wrapper.setAttribute('title', `Spice Level: ${spiceLabels[level] || ''}`);
    wrapper.setAttribute('aria-label', `Spice level: ${spiceLabels[level] || level} out of 5`);

    for (let i = 1; i <= 5; i++) {
        const icon = document.createElement('span');
        icon.className = `spice-icon ${i <= level ? 'active' : 'inactive'}`;
        icon.textContent = '🌶️';
        icon.setAttribute('aria-hidden', 'true');
        wrapper.appendChild(icon);
    }

    return wrapper;
}

function createAllergenTags(allergens) {
    const wrapper = document.createElement('div');
    wrapper.className = 'allergen-tags';

    allergens.forEach(allergen => {
        const tag = document.createElement('span');
        tag.className = 'allergen-tag';
        tag.textContent = allergen;
        wrapper.appendChild(tag);
    });

    return wrapper;
}

/**
 * Menu item card component
 */
export function createMenuCard(item, onClick) {
    const card = document.createElement('div');
    card.className = 'menu-card';

    // Image column
    const imageCol = document.createElement('div');
    imageCol.className = 'menu-card-image';
    imageCol.setAttribute('aria-hidden', 'true');
    imageCol.textContent = item.emoji;

    // Body
    const body = document.createElement('div');
    body.className = 'menu-card-body';

    // Header: name + price
    const header = document.createElement('div');
    header.className = 'menu-card-header';

    const name = document.createElement('h3');
    name.className = 'menu-card-name';
    name.textContent = item.name;

    const price = document.createElement('span');
    price.className = 'menu-card-price';
    price.textContent = `$${item.price.toFixed(2)}`;

    header.appendChild(name);
    header.appendChild(price);

    // Description
    const desc = document.createElement('p');
    desc.className = 'menu-card-description';
    desc.textContent = item.description;

    // Nutrition row
    const nutritionRow = createNutritionRow(item.nutrition);

    // Meta: spice + allergens
    const meta = document.createElement('div');
    meta.className = 'menu-card-meta';
    meta.appendChild(createSpiceIndicator(item.spice));
    if (item.allergens && item.allergens.length > 0) {
        meta.appendChild(createAllergenTags(item.allergens));
    }

    // Footer: CTA button
    const footer = document.createElement('div');
    footer.className = 'menu-card-footer';

    if (item.hasModel) {
        const btn = document.createElement('button');
        btn.className = 'view-3d-btn';
        btn.innerHTML = '&#x1F441;&#xFE0F; View in 3D';
        btn.setAttribute('aria-label', `View ${item.name} in 3D`);
        btn.onclick = (e) => {
            e.stopPropagation();
            onClick(item);
        };
        footer.appendChild(btn);
    } else {
        const btn = document.createElement('button');
        btn.className = 'no-model-btn';
        btn.textContent = '⏳ 3D Coming Soon';
        btn.setAttribute('aria-label', '3D model not yet available');
        btn.setAttribute('aria-disabled', 'true');
        footer.appendChild(btn);
    }

    body.appendChild(header);
    body.appendChild(desc);
    body.appendChild(nutritionRow);
    body.appendChild(meta);
    body.appendChild(footer);

    card.appendChild(imageCol);
    card.appendChild(body);

    return card;
}

// Legacy exports kept for backwards compatibility
export function createMenuGrid(items, onItemSelect) {
    const grid = document.createElement('div');
    grid.className = 'menu-grid';
    items.forEach(item => grid.appendChild(createMenuCard(item, onItemSelect)));
    return grid;
}

export function createInstructionCard(title, instructions) {
    const card = document.createElement('div');
    card.className = 'instruction-card';
    const titleEl = document.createElement('h3');
    titleEl.textContent = title;
    card.appendChild(titleEl);
    instructions.forEach(text => {
        const p = document.createElement('p');
        p.textContent = text;
        card.appendChild(p);
    });
    return card;
}

export function createButtonGroup(buttons) {
    const group = document.createElement('div');
    group.className = 'btn-group';
    buttons.forEach(btn => group.appendChild(btn));
    return group;
}

export function createButton(text, emoji, onClick) {
    const button = document.createElement('button');
    button.className = 'select-btn';
    button.textContent = `${emoji} ${text}`;
    button.onclick = onClick;
    return button;
}
