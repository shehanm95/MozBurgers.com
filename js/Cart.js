import CartItem from './cartItem.js';
import Customer from './Customer.js';
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
        this.cartDiscountText = document.getElementById('discountText');
        this.cartSubTotalText = document.getElementById('subTotalText');
        this.cartTaxText = document.getElementById('taxText');
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
        item.changeCartCount(1);
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

        let items = CartItem.cartItems;
        let subTotal = 0;
        let totalDiscount = 0;
        let tax = 0;

        items.forEach(item => {
            subTotal += item.product.price * item.count;
            let discount = item.product.price * item.product.discount * 0.01;
            totalDiscount += discount * item.count;

        });
        this.cartSubTotalText.textContent = `(${subTotal})`;
        this.cartDiscountText.textContent = `(${totalDiscount})`;
        tax = (subTotal - totalDiscount) * 0.1;
        this.cartTaxText.textContent = `${tax.toFixed(2)}`
        this.finalCartPriceValue = subTotal - totalDiscount + tax;
        this.finalCartPrice.innerText = `$ ${(this.finalCartPriceValue).toFixed(2)}`

        return {
            "subTotal": subTotal,
            "totalDiscount": totalDiscount,
            "tax": tax,
            "finalCartPrice": this.finalCartPriceValue,
            "customer": this.customer
        }
    }


    getCartDetails() {
        const payNowObj = {
            "finalValues": this.calculateCartFinalPrice(),
            "cartItems": CartItem.cartItems

        }
        const jsonPayNow = JSON.stringify(payNowObj);
        localStorage.setItem("currentOrder", jsonPayNow);

        window.location.href = './payNow.html';
    }


    static removeItem(id) {
        let element = document.getElementById(id);
        Cart.cartItemDisplayArea.removeChild(element)
    }


    fillCustomerData(jsonCustomer) {
        // console.log(jsonCustomer.address);
        let customer = Customer.generateCustomer(jsonCustomer);
        // console.log(customer);
        document.getElementById("customerID").innerText = customer.id;
        document.getElementById("customerTown").innerText = customer.city;
        document.getElementById("customerName").innerText = customer.getFullName();
        document.getElementById("customerEmail").innerText = customer.email;
        document.getElementById("customerNumber").innerText = customer.phoneNumber;
        document.getElementById("customerOrders").innerText = customer.getAllOrderValue();
        this.customer = customer;
    }




}