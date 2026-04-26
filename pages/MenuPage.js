import { createBanner, createCategorySlider, createMenuCard } from '../components/Card.js';

const CATEGORIES = [
    { label: 'Burgers',    icon: '🍔' },
    { label: 'Grilled',    icon: '🔥' },
    { label: 'Asian',      icon: '🍜' },
    { label: 'Vegetarian', icon: '🥗' },
    { label: 'Desserts',   icon: '🍰' },
];

const menuItems = {
    'Burgers': [
        {
            id: 'cheeseburger',
            name: 'Classic Cheeseburger',
            emoji: '🍔',
            description: 'Double beef patty, aged cheddar, house pickles and signature sauce on a toasted brioche bun.',
            price: 18.90,
            hasModel: true,
            modelFile: 'models/cheeseburger-v1.glb',
            category: 'Burgers',
            nutrition: { calories: 620, protein: 34, carbs: 48, fat: 28 },
            spice: 1,
            allergens: ['Gluten', 'Dairy', 'Egg', 'Sesame'],
            hotspots: [
                { name: 'bun',   position: '0.0 0.22 0.05',  normal: '0 1 0', label: 'Brioche Bun',  detail: 'Baked fresh daily, lightly toasted' },
                { name: 'patty', position: '0.0 0.04 0.12',  normal: '0 0 1', label: 'Beef Patty',   detail: '180g grass-fed Australian chuck' },
            ],
        },
        {
            id: 'smash-burger',
            name: 'Smash Burger',
            emoji: '🍔',
            description: 'Thin crispy smashed patty with American cheese, caramelised onions and house mustard.',
            price: 16.90,
            hasModel: false,
            modelFile: null,
            category: 'Burgers',
            nutrition: { calories: 540, protein: 28, carbs: 42, fat: 24 },
            spice: 0,
            allergens: ['Gluten', 'Dairy', 'Mustard'],
            hotspots: [],
        },
        {
            id: 'mushroom-swiss',
            name: 'Mushroom Swiss Burger',
            emoji: '🍄',
            description: 'Juicy beef patty topped with sautéed mushrooms, Swiss cheese and truffle aioli.',
            price: 19.90,
            hasModel: false,
            modelFile: null,
            category: 'Burgers',
            nutrition: { calories: 590, protein: 30, carbs: 44, fat: 30 },
            spice: 0,
            allergens: ['Gluten', 'Dairy', 'Egg'],
            hotspots: [],
        },
    ],
    'Grilled': [
        {
            id: 'bbq-platter',
            name: 'BBQ Mixed Platter',
            emoji: '🍖',
            description: 'Slow-smoked ribs, grilled chicken thigh and corn cobs with house BBQ sauce.',
            price: 34.90,
            hasModel: false,
            modelFile: null,
            category: 'Grilled',
            nutrition: { calories: 920, protein: 72, carbs: 38, fat: 46 },
            spice: 2,
            allergens: ['Gluten', 'Sulphites'],
            hotspots: [],
        },
        {
            id: 'grilled-fish',
            name: 'Grilled Barramundi',
            emoji: '🐟',
            description: 'Fresh barramundi fillet, lemon butter sauce, seasonal vegetables and herb salad.',
            price: 28.90,
            hasModel: false,
            modelFile: null,
            category: 'Grilled',
            nutrition: { calories: 420, protein: 48, carbs: 12, fat: 18 },
            spice: 0,
            allergens: ['Fish', 'Dairy'],
            hotspots: [],
        },
        {
            id: 'tandoori-chicken',
            name: 'Tandoori Chicken',
            emoji: '🍗',
            description: 'Overnight marinated chicken in spiced yoghurt, cooked in a traditional clay oven.',
            price: 26.90,
            hasModel: false,
            modelFile: null,
            category: 'Grilled',
            nutrition: { calories: 480, protein: 52, carbs: 14, fat: 20 },
            spice: 3,
            allergens: ['Dairy'],
            hotspots: [],
        },
    ],
    'Asian': [
        {
            id: 'sushi-platter',
            name: 'Sushi Platter',
            emoji: '🍣',
            description: 'Chef\'s selection of 12-piece assorted sushi rolls with wasabi, pickled ginger and soy.',
            price: 32.90,
            hasModel: true,
            modelFile: 'models/sushi-v1.glb',
            category: 'Asian',
            nutrition: { calories: 520, protein: 22, carbs: 72, fat: 10 },
            spice: 1,
            allergens: ['Fish', 'Gluten', 'Sesame', 'Soy'],
            hotspots: [],
        },
        {
            id: 'biryani-bowl',
            name: 'Biryani Bowl',
            emoji: '🍚',
            description: 'Aromatic basmati rice slow-cooked with tender lamb, saffron and whole spices.',
            price: 24.90,
            hasModel: true,
            modelFile: 'models/biryani-v1.glb',
            category: 'Asian',
            nutrition: { calories: 680, protein: 38, carbs: 82, fat: 18 },
            spice: 3,
            allergens: ['Dairy', 'Tree Nuts'],
            hotspots: [],
        },
    ],
    'Vegetarian': [
        {
            id: 'falafel-wrap',
            name: 'Falafel Wrap',
            emoji: '🥙',
            description: 'Crispy house-made falafel, hummus, tabbouleh and pickled vegetables in warm flatbread.',
            price: 17.90,
            hasModel: false,
            modelFile: null,
            category: 'Vegetarian',
            nutrition: { calories: 420, protein: 14, carbs: 58, fat: 14 },
            spice: 1,
            allergens: ['Gluten', 'Sesame'],
            hotspots: [],
        },
        {
            id: 'pasta-carbonara',
            name: 'Pasta Carbonara',
            emoji: '🍝',
            description: 'Al dente spaghetti, free-range egg yolk, aged pecorino romano and crispy pancetta.',
            price: 22.90,
            hasModel: false,
            modelFile: null,
            category: 'Vegetarian',
            nutrition: { calories: 680, protein: 26, carbs: 74, fat: 28 },
            spice: 0,
            allergens: ['Gluten', 'Dairy', 'Egg'],
            hotspots: [],
        },
    ],
    'Desserts': [
        {
            id: 'lava-cake',
            name: 'Chocolate Lava Cake',
            emoji: '🍰',
            description: 'Warm dark chocolate fondant with a molten centre, served with vanilla bean gelato.',
            price: 14.90,
            hasModel: false,
            modelFile: null,
            category: 'Desserts',
            nutrition: { calories: 480, protein: 8, carbs: 56, fat: 24 },
            spice: 0,
            allergens: ['Gluten', 'Dairy', 'Egg'],
            hotspots: [],
        },
        {
            id: 'pepperoni-pizza',
            name: 'Pepperoni Pizza',
            emoji: '🍕',
            description: 'Hand-stretched sourdough base, San Marzano tomato, fior di latte and generous pepperoni.',
            price: 23.90,
            hasModel: true,
            modelFile: 'models/pizza-v1.glb',
            category: 'Desserts',
            nutrition: { calories: 740, protein: 32, carbs: 80, fat: 30 },
            spice: 1,
            allergens: ['Gluten', 'Dairy'],
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

    const banner = createBanner('Flame & Fork', 'Explore our dishes in 3D — tap to view in AR');
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
