export function createBanner(restaurantName, tagline) {
    const banner = document.createElement('div');
    banner.className = 'banner';

    const content = document.createElement('div');
    content.className = 'banner-content';

    const eyebrow = document.createElement('span');
    eyebrow.className = 'banner-eyebrow';
    eyebrow.textContent = 'Fine Dining';

    const title = document.createElement('h1');
    title.className = 'banner-title';
    title.textContent = restaurantName;

    const rule = document.createElement('span');
    rule.className = 'banner-rule';

    const subtitle = document.createElement('p');
    subtitle.className = 'banner-subtitle';
    subtitle.textContent = tagline;

    content.appendChild(eyebrow);
    content.appendChild(title);
    content.appendChild(rule);
    content.appendChild(subtitle);
    banner.appendChild(content);
    return banner;
}

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

        const labelSpan = document.createElement('span');
        labelSpan.className = 'cat-label';
        labelSpan.textContent = cat.label;
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

function createNutritionLine(nutrition) {
    const line = document.createElement('p');
    line.className = 'nutrition-line';
    line.textContent = `${nutrition.calories} kcal  ·  ${nutrition.protein}g protein  ·  ${nutrition.carbs}g carbs  ·  ${nutrition.fat}g fat`;
    return line;
}

const SPICE_WORDS = ['Not Spicy', 'Mild', 'Medium', 'Hot', 'Very Hot', 'Intense'];

function createSpiceLabel(level) {
    const label = document.createElement('span');
    label.className = 'spice-label';
    label.setAttribute('data-level', level);
    if (level === 0) {
        label.textContent = 'No Heat';
    } else {
        label.textContent = `${SPICE_WORDS[level] || 'Hot'} Heat`;
    }
    return label;
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

export function createMenuCard(item, onClick) {
    const card = document.createElement('div');
    card.className = 'menu-card';

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

    // Thin gold rule
    const rule = document.createElement('hr');
    rule.className = 'menu-card-rule';

    // Description
    const desc = document.createElement('p');
    desc.className = 'menu-card-description';
    desc.textContent = item.description;

    // Nutrition single line
    const nutritionLine = createNutritionLine(item.nutrition);

    // Meta: spice + allergens
    const meta = document.createElement('div');
    meta.className = 'menu-card-meta';
    meta.appendChild(createSpiceLabel(item.spice));
    if (item.allergens && item.allergens.length > 0) {
        meta.appendChild(createAllergenTags(item.allergens));
    }

    // Footer: CTA button
    const footer = document.createElement('div');
    footer.className = 'menu-card-footer';

    if (item.hasModel) {
        const btn = document.createElement('button');
        btn.className = 'view-3d-btn';
        btn.textContent = 'Explore in 3D';
        btn.setAttribute('aria-label', `View ${item.name} in 3D`);
        btn.onclick = (e) => {
            e.stopPropagation();
            onClick(item);
        };
        footer.appendChild(btn);
    } else {
        const btn = document.createElement('button');
        btn.className = 'no-model-btn';
        btn.textContent = 'Preview Unavailable';
        btn.setAttribute('aria-label', '3D model not yet available');
        btn.setAttribute('aria-disabled', 'true');
        footer.appendChild(btn);
    }

    body.appendChild(header);
    body.appendChild(rule);
    body.appendChild(desc);
    body.appendChild(nutritionLine);
    body.appendChild(meta);
    body.appendChild(footer);

    card.appendChild(body);

    return card;
}

// Legacy exports
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
