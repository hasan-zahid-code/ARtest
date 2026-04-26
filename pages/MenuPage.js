import { createBanner, createCategorySlider, createMenuCard } from '../components/Card.js';

const CATEGORIES = [
    { label: 'Signatures' },
    { label: 'Ember' },
    { label: 'Eastern' },
    { label: 'Garden' },
    { label: 'Classics' },
];

const menuItems = {
    'Signatures': [
        {
            id: 'cheeseburger',
            name: 'Classic Cheeseburger',
            emoji: '🍔',
            description: '180g dry-aged grass-fed chuck, double-fermented cave-aged cheddar, house cornichons and our signature reduction, crowned on a hand-rolled brioche.',
            price: 32.00,
            hasModel: true,
            modelFile: 'models/cheeseburger-v2.glb',
            category: 'Signatures',
            nutrition: { calories: 620, protein: 34, carbs: 48, fat: 28 },
            spice: 1,
            allergens: ['Gluten', 'Dairy', 'Egg', 'Sesame'],
            hotspots: [
                { name: 'bun',   position: '0.0 0.22 0.05',  normal: '0 1 0', label: 'Brioche Bun',  detail: 'Baked fresh daily, lightly toasted' },
                { name: 'patty', position: '0.0 0.04 0.12',  normal: '0 0 1', label: 'Beef Patty',   detail: '180g grass-fed Australian chuck' },
            ],
        },
        {
            id: 'fried-chicken-combo',
            name: 'Fried Chicken Combo',
            emoji: '🍗',
            description: 'Buttermilk-brined free-range chicken, double-fried to a golden crisp, served with house sauce and hand-cut sides in a signature box.',
            price: 38.00,
            hasModel: true,
            modelFile: 'models/fried chicken Combo with extra sauce.glb',
            category: 'Signatures',
            nutrition: { calories: 620, protein: 36, carbs: 48, fat: 30 },
            spice: 1,
            allergens: ['Gluten', 'Dairy', 'Egg'],
            hotspots: [],
        },
        {
            id: 'grilled-cheese',
            name: 'Truffle Grilled Cheese',
            emoji: '🧀',
            description: 'Hand-shaved Gruyère and aged cheddar melted between two slices of sourdough, finished with black truffle oil and fleur de sel.',
            price: 34.00,
            hasModel: true,
            modelFile: 'models/Grilled-Cheese-Sandwich.glb',
            category: 'Signatures',
            nutrition: { calories: 590, protein: 22, carbs: 44, fat: 34 },
            spice: 0,
            allergens: ['Gluten', 'Dairy'],
            hotspots: [],
        },
    ],
    'Ember': [
        {
            id: 'bbq-platter',
            name: 'The Ember Platter',
            emoji: '🍖',
            description: '12-hour smoked beef short rib, char-grilled poussin and sweet corn with a house-made sorghum molasses glaze.',
            price: 68.00,
            hasModel: false,
            modelFile: null,
            category: 'Ember',
            nutrition: { calories: 920, protein: 72, carbs: 38, fat: 46 },
            spice: 2,
            allergens: ['Gluten', 'Sulphites'],
            hotspots: [],
        },
        {
            id: 'fish-and-chips',
            name: 'Eureka Fish & Chips',
            emoji: '🐟',
            description: 'Tempura-battered sustainably caught fish fillet, twice-cooked hand-cut chips, house tartare and a wedge of charred lemon.',
            price: 48.00,
            hasModel: true,
            modelFile: 'models/Eureka Fish & Chips.glb',
            category: 'Ember',
            nutrition: { calories: 720, protein: 42, carbs: 68, fat: 28 },
            spice: 0,
            allergens: ['Fish', 'Gluten', 'Dairy', 'Egg'],
            hotspots: [],
        },
        {
            id: 'tandoori-chicken',
            name: 'Tandoor Poussin',
            emoji: '🍗',
            description: 'Overnight-marinated poussin in a 16-spice yoghurt masala, fired in a 450°C clay tandoor and finished with saffron ghee.',
            price: 48.00,
            hasModel: false,
            modelFile: null,
            category: 'Ember',
            nutrition: { calories: 480, protein: 52, carbs: 14, fat: 20 },
            spice: 3,
            allergens: ['Dairy'],
            hotspots: [],
        },
        {
            id: 'pepperoni-pizza',
            name: 'Neapolitan Pepperoni',
            emoji: '🍕',
            description: 'Hand-stretched 72-hour sourdough base, San Marzano tomato, fior di latte and artisan pepperoni, fired in a wood-burning oven.',
            price: 38.00,
            hasModel: true,
            modelFile: 'models/Pepperoni pizza.glb',
            category: 'Ember',
            nutrition: { calories: 740, protein: 32, carbs: 80, fat: 30 },
            spice: 1,
            allergens: ['Gluten', 'Dairy'],
            hotspots: [],
        },
    ],
    'Eastern': [
        {
            id: 'sushi-platter',
            name: 'Omakase Selection',
            emoji: '🍣',
            description: 'Chef\'s twelve-piece curation of sashimi, nigiri and maki — sourced daily and presented on chilled black slate.',
            price: 62.00,
            hasModel: false,
            modelFile: null,
            category: 'Eastern',
            nutrition: { calories: 520, protein: 22, carbs: 72, fat: 10 },
            spice: 1,
            allergens: ['Fish', 'Gluten', 'Sesame', 'Soy'],
            hotspots: [],
        },
        {
            id: 'ramen',
            name: 'Tonkotsu Ramen',
            emoji: '🍜',
            description: '18-hour pork bone broth, hand-pulled wheat noodles, chashu pork belly, soft-boiled soy egg, nori and fragrant mayu black garlic oil.',
            price: 36.00,
            hasModel: true,
            modelFile: 'models/Ramen.glb',
            category: 'Eastern',
            nutrition: { calories: 680, protein: 38, carbs: 72, fat: 24 },
            spice: 1,
            allergens: ['Gluten', 'Egg', 'Soy', 'Sesame'],
            hotspots: [],
        },
    ],
    'Garden': [
        {
            id: 'garden-sandwich',
            name: 'The Garden Sandwich',
            emoji: '🥪',
            description: 'Layered cold cuts, house-pickled vegetables, aged mustard aioli and crisp lettuce on a slow-fermented sourdough — pressed and served warm.',
            price: 28.00,
            hasModel: true,
            modelFile: 'models/Sandwich.glb',
            category: 'Garden',
            nutrition: { calories: 480, protein: 22, carbs: 52, fat: 20 },
            spice: 0,
            allergens: ['Gluten', 'Dairy', 'Mustard', 'Egg'],
            hotspots: [],
        },
        {
            id: 'pasta-carbonara',
            name: 'Spaghetti alla Carbonara',
            emoji: '🍝',
            description: 'Hand-cut spaghetti tossed tableside with 48-month aged Pecorino Romano, free-range egg yolk and guanciale — no cream.',
            price: 38.00,
            hasModel: false,
            modelFile: null,
            category: 'Garden',
            nutrition: { calories: 680, protein: 26, carbs: 74, fat: 28 },
            spice: 0,
            allergens: ['Gluten', 'Dairy', 'Egg'],
            hotspots: [],
        },
    ],
    'Classics': [
        {
            id: 'lava-cake',
            name: 'Valrhona Fondant',
            emoji: '🍰',
            description: 'Warm 70% Guanaja dark chocolate fondant with a flowing molten centre, paired with Tahitian vanilla bean gelato and a cocoa tuile.',
            price: 22.00,
            hasModel: false,
            modelFile: null,
            category: 'Classics',
            nutrition: { calories: 480, protein: 8, carbs: 56, fat: 24 },
            spice: 0,
            allergens: ['Gluten', 'Dairy', 'Egg'],
            hotspots: [],
        },
        {
            id: 'mille-feuille',
            name: 'Mille-Feuille',
            emoji: '🍮',
            description: 'Layers of hand-laminated puff pastry, Tahitian vanilla diplomat cream and a mirror glaze of wild strawberry — assembled to order.',
            price: 20.00,
            hasModel: false,
            modelFile: null,
            category: 'Classics',
            nutrition: { calories: 410, protein: 6, carbs: 50, fat: 22 },
            spice: 0,
            allergens: ['Gluten', 'Dairy', 'Egg'],
            hotspots: [],
        },
    ],
};

function createMenuSection(category, items, onItemSelect) {
    const section = document.createElement('div');
    section.className = 'menu-section';
    section.id = `section-${category}`;
    section.setAttribute('data-category', category);

    const heading = document.createElement('h2');
    heading.className = 'menu-section-heading';
    heading.textContent = category;
    section.appendChild(heading);

    const grid = document.createElement('div');
    grid.className = 'menu-grid';

    items.forEach(item => {
        const card = createMenuCard(item, onItemSelect);
        grid.appendChild(card);
    });

    section.appendChild(grid);
    return section;
}

export function createMenuPage(onSelectModel) {
    const container = document.createElement('div');
    container.id = 'selection-screen';

    const banner = createBanner('Flame & Fork', 'Each dish, explored in three dimensions');
    container.appendChild(banner);

    const categorySlider = createCategorySlider(CATEGORIES, (label) => {
        const section = contentContainer.querySelector(`#section-${label}`);
        if (section) {
            contentContainer.scrollTo({
                top: section.offsetTop - contentContainer.offsetTop - 1,
                behavior: 'smooth',
            });
        }
    });
    container.appendChild(categorySlider);

    const contentContainer = document.createElement('div');
    contentContainer.className = 'menu-content';
    contentContainer.id = 'menu-content';

    CATEGORIES.forEach(({ label }) => {
        const items = menuItems[label] || [];
        const section = createMenuSection(label, items, (item) => {
            onSelectModel(item);
        });
        contentContainer.appendChild(section);
    });

    let scrollRafPending = false;
    contentContainer.addEventListener('scroll', () => {
        if (scrollRafPending) return;
        scrollRafPending = true;
        requestAnimationFrame(() => {
            updateActiveCategoryButton(container, contentContainer);
            scrollRafPending = false;
        });
    }, { passive: true });

    container.appendChild(contentContainer);
    return container;
}

function updateActiveCategoryButton(container, contentContainer) {
    const containerRect = contentContainer.getBoundingClientRect();
    const buttons = container.querySelectorAll('.category-btn');
    const labels = CATEGORIES.map(c => c.label);

    let activeLabel = labels[0];
    let closestDistance = Infinity;

    labels.forEach(label => {
        const section = contentContainer.querySelector(`#section-${label}`);
        if (section) {
            const sectionRect = section.getBoundingClientRect();
            const distance = Math.abs(sectionRect.top - containerRect.top - 60);
            if (distance < closestDistance) {
                closestDistance = distance;
                activeLabel = label;
            }
        }
    });

    buttons.forEach(btn => btn.classList.remove('active'));
    const activeBtn = container.querySelector(`.category-btn[data-category="${activeLabel}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' });
    }
}
