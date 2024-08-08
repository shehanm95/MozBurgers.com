import CartItem from './cartItem.js';


export default class Cart {

    static cart = null;
    constructor(cartItemDisplayArea) {
        this.cartDisplayArea = cartItemDisplayArea;
        Cart.cart = this;
        this.finalCartPrice = document.getElementById('finalCartPrice');
    }

    static getCart() {
        return Cart.cart;
    }


    products = [];

    addProducts(product) {
        const items = document.querySelectorAll('.orderItem');
        console.log(items)

        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            console.log(element.id == `item${product.id}`);
            if (element.id == `item${product.id}`) {
                let count = element.querySelector('.count');
                let num = (count.innerText * 1) + 1;
                element.getElementsByClassName('itemPrice')[0].innerText = "$" + num * product.price;
                count.innerText = num;
                this.calculateCartFinalPrice();
                return;
            }
        }

        document.getElementById('cartItemDisplayArea').appendChild(CartItem.pushCartItem(product));
        console.log(this.products);
        this.calculateCartFinalPrice();
    }
    displayProductOnCart() {
        console.log(this.products);

        // this.products.forEach(product => {
        //     this.cartDisplayArea.appendChild(product);
        // });
    }

    calculateCartFinalPrice() {
        let prices = document.getElementsByClassName('itemPrice');
        let finalPrice = 0;

        Array.from(prices).forEach(price => {
            finalPrice += price.innerText;
        });
        //check again.

        this.finalCartPrice.innerText = ("$ " + finalPrice);

    }



}