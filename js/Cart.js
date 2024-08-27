import CartItem from './cartItem.js';
import ItemCard from './displayProductCard.js';

export default class Cart {

    static cart = null;
    static cartItemDisplayArea;

    constructor() {
        if (Cart.cart) {
            return Cart.cart;
        }
        Cart.cart = this;
        Cart.cartItemDisplayArea = document.getElementById('cartItemDisplayArea');
        this.finalCartPrice = document.getElementById('finalCartPrice');
        this.payNowButton = document.getElementById('payNowButton');
        this.payNowButton.addEventListener('click', () => {
            this.getCartDetails();
        })
    }

    static getCart() {
        if (!Cart.cart) {
            Cart.cart = new Cart();
        }
        return Cart.cart;
    }


    products = [];

    addProducts(productDisplayCard) {
        let product = productDisplayCard.product;
        const items = CartItem.cartItems;

        console.log(items)

        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            console.log("item found : " + element.product.id + " " + element.product.id == product.id);
            if (element.product.id == product.id) {
                element.changeCartCount(1);
                return;
            }
        }
        const item = new CartItem(productDisplayCard);
        Cart.cartItemDisplayArea.appendChild(item.pushCartItem());
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
        // const prices = document.getElementsByClassName('itemPrice');
        // let finalPrice = Array.from(prices).reduce((total, price) => {
        //     return total + parseFloat(price.innerText.substring(1));
        // }, 0);

        // this.finalCartPrice.innerText = `$ ${finalPrice.toFixed(2)}`;

        let items = CartItem.cartItems;
        let subTotal = 0;
        let totalDiscount = 0;

        items.forEach(item => {
            subTotal = item.product.price * item.count;
            let discount = item.product.price * item.product.discount * 0.01;
            totalDiscount = discount * item.count;

        });

        this.finalCartPrice.innerText = `$ ${subTotal.toFixed(2)}`


    }


    getCartDetails() {
        const items = document.querySelectorAll('.orderItem');
        items.forEach(item => {
            // console.log(item.product.id)
            console.log(item.product.count)
            console.log("clickd on pay now")
        });
    }


    static removeItem(id) {
        let element = document.getElementById(id);
        Cart.cartItemDisplayArea.removeChild(element)
    }




}