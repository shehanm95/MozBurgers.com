import ItemCard from './displayProductCard.js';
import Product from './Product.js';
import Cart from './Cart.js';
import CustomerController from './controllers/CustomerController.js';
import Customer from './Customer.js';
import CustomerSuggestionController from './CustomerSuggestionController.js';



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

let displayProduct = [
    new Product("Lanka Burger", 2, "images/mainMenu/item2.png", "this is second burger", 21.0, 10),
    new Product("Indian Burger", 3, "images/mainMenu/item3.png", "this is second burger", 25.0, 8),
    new Product("Italian Burger", 4, "images/mainMenu/item4.png", "this good berger", 56.0, 0),
    new Product("Shehan Burger", 5, "images/mainMenu/item5.png", "new burger invented by Shehan", 45.0, 5)

]
let cartItemDisplayArea = document.getElementById('cartItemDisplayArea');
let cart = new Cart(cartItemDisplayArea);

let selectedItemDisplayArea = document.getElementById('selectedItemDisplayArea')

displayProduct.forEach(myProduct => {
    const itemCard = new ItemCard(myProduct);
    selectedItemDisplayArea.appendChild(itemCard.createItemCard());
});

let customerSuggestion = new CustomerSuggestionController();
let customerController = new CustomerController();
console.log("customer list : " + customerController.customerList);

customerSuggestion.input.addEventListener('keyup', customerSuggestion.filterFunction());
customerSuggestion.input.addEventListener('change', console.log('changes'));
console.log(customerSuggestion);