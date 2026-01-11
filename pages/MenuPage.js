import { createBanner, createCategorySlider, createMenuCard } from '../components/Card.js';

/**
 * Menu items data
 */
const menuItems = {
    'Fast Food': [
        { name: 'Classic Burger', emoji: '🍔', description: 'Juicy beef patty with lettuce, tomato, and special sauce', modelFile: 'burger.glb', category: 'Fast Food' },
        { name: 'Cheeseburger', emoji: '🧀', description: 'Classic beef burger with melted cheddar cheese', modelFile: 'models/cheeseburger-v1.glb', category: 'Fast Food', annotation: '🥩 Protein: 24g <br> 🍞 Carbs: 30g <br> 🚫 Allergens: Gluten, Dairy' },
        { name: 'Pepperoni Pizza', emoji: '🍕', description: 'Cheesy pizza with pepperoni and fresh basil', modelFile: 'pizza.glb', category: 'Fast Food' },
    ],
    'Grilled': [
        { name: 'BBQ Platter', emoji: '🍖', description: 'Grilled chicken, ribs, and corn with BBQ sauce', modelFile: 'bbq-platter.glb', category: 'Grilled' },
        { name: 'Grilled Fish', emoji: '🐟', description: 'Fresh grilled fish fillet with lemon and herbs', modelFile: 'fish.glb', category: 'Grilled' },
        { name: 'Tandoori Chicken', emoji: '🍗', description: 'Marinated chicken cooked in traditional tandoor oven', modelFile: 'tandoori.glb', category: 'Grilled' },
    ],
    'Asian': [
        { name: 'Sushi Platter', emoji: '🍣', description: 'Assorted fresh sushi rolls with wasabi and soy sauce', modelFile: 'sushi.glb', category: 'Asian' },
        { name: 'Biryani Bowl', emoji: '🍚', description: 'Aromatic basmati rice with tender meat and spices', modelFile: 'biryani.glb', category: 'Asian' },
    ],
    'Vegetarian': [
        { name: 'Falafel Wrap', emoji: '🥙', description: 'Crispy falafel with hummus and fresh vegetables', modelFile: 'falafel.glb', category: 'Vegetarian' },
        { name: 'Babars Pasta', emoji: '🍝', description: 'Creamy carbonara with fresh parmesan cheese', modelFile: 'pasta.glb', category: 'Vegetarian' },
    ],
    'Desserts': [
        { name: 'Chocolate Cake', emoji: '🍰', description: 'Rich chocolate cake with creamy frosting', modelFile: 'cake.glb', category: 'Desserts' },
    ]
};

/**
 * Create menu section with heading and items
 * @param {string} category - Category name
 * @param {Array} items - Menu items for this category
 * @param {function} onItemSelect - Callback when item is selected
 * @returns {HTMLElement}
 */
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

/**
 * Menu page with menu items and categories
 * @param {function} onSelectModel - Callback when model is selected
 * @returns {HTMLElement}
 */
export function createMenuPage(onSelectModel) {
    const container = document.createElement('div');
    container.id = 'selection-screen';
    
    // Banner
    const banner = createBanner('AR Food Explorer', 'View delicious dishes in 3D before you order');
    container.appendChild(banner);
    
    // Category slider
    const categories = ['Fast Food', 'Grilled', 'Asian', 'Vegetarian', 'Desserts'];
    
    const categorySlider = createCategorySlider(categories, (category) => {
        // Smooth scroll to section
        const section = container.querySelector(`#section-${category}`);
        if (section) {
            const contentContainer = container.querySelector('#menu-content');
            contentContainer.scrollTo({
                top: section.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
    container.appendChild(categorySlider);
    
    // Content container for scrolling menu
    const contentContainer = document.createElement('div');
    contentContainer.className = 'menu-content';
    contentContainer.id = 'menu-content';
    
    // Create all menu sections
    categories.forEach(category => {
        const section = createMenuSection(category, menuItems[category], (item) => {
            onSelectModel(item.modelFile, item.name);
        });
        contentContainer.appendChild(section);
    });
    
    // Handle scroll to update active category button
    contentContainer.addEventListener('scroll', () => {
        updateActiveCategoryButton(container, categories);
    });
    
    container.appendChild(contentContainer);
    
    return container;
}

/**
 * Update active category button based on scroll position
 */
function updateActiveCategoryButton(container, categories) {
    const contentContainer = container.querySelector('#menu-content');
    const buttons = container.querySelectorAll('.category-btn');
    
    let activeCategory = categories[0];
    let closestDistance = Infinity;
    
    categories.forEach(category => {
        const section = container.querySelector(`#section-${category}`);
        if (section) {
            const distance = Math.abs(section.offsetTop - contentContainer.scrollTop - 100);
            if (distance < closestDistance) {
                closestDistance = distance;
                activeCategory = category;
            }
        }
    });
    
    buttons.forEach(btn => btn.classList.remove('active'));
    const activeBtn = container.querySelector(`.category-btn[data-category="${activeCategory}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
        // Scroll slider to show active button
        activeBtn.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' });
    }
}
