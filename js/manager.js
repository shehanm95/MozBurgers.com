import ItemCard from './displayProductCard.js';
import Product from './Product.js';


const warnings = [
    '../images/mainMenu/warningExpired.svg',
    '../images/mainMenu/warningOutOfStock.svg',
    '../images/mainMenu/warningNearOutOfStock.svg'
];
const product = {
    name: 'Special Burger',
    description: 'This is a special burger made in Sri Lanka',
    price: 231,
    discount: 20,
    count: 3,
    imgSrc: 'images/mainMenu/item1.png',
    warnings: warnings
};

let myProduct = new Product("lanka burger", 1, "images/mainMenu/item2.png", "this is second burger", 34.0, 10)

const itemCard = new ItemCard(myProduct);
let selectedItemDisplayArea = document.getElementById('selectedItemDisplayArea')
selectedItemDisplayArea.appendChild(itemCard.createItemCard());