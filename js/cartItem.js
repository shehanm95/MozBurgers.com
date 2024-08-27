import Cart from "./Cart.js";


export default class CartItem {
    static cartItems = [];
    count = 0;
    id = null;
    constructor(normalCard) {
        this.product = normalCard.product;
        this.count++;
        this.normalCard = normalCard;
        CartItem.cartItems.push(this)
    }

    countText = null;

    pushCartItem() {
        let product = this.normalCard.product;
        console.log(product);

        // Create the outer container div
        let outer = document.createElement('div');
        this.id = `item${product.id}`;
        outer.id = this.id;
        outer.classList.add('orderItem');

        // Create the image element
        let img = document.createElement('img');
        img.src = product.imgSrc;
        img.alt = `${product.name}.png`;

        // Create the product name paragraph
        let itemName = document.createElement('p');
        itemName.classList.add('itemName', 'h4');
        itemName.textContent = product.name;

        // Create the countChangeHolder div
        let countChangeHolder = document.createElement('div');
        countChangeHolder.classList.add('countChangeHolder');

        // Create the countChange div
        let countChange = document.createElement('div');
        countChange.classList.add('countChange', 'flex', 'center');

        // Create the plus button
        let plus = document.createElement('div');
        plus.classList.add('m-0', 'plus', 'change', 'orangeBackground', 'flex', 'center');
        plus.textContent = '+';

        // Create the count div
        this.countText = document.createElement('div');
        this.countText.classList.add('count', 'flex', 'center');
        this.countText.textContent = '1';

        // Create the minus button
        let minus = document.createElement('div');
        minus.classList.add('m-0', 'minus', 'change', 'lightGrayBackground', 'flex', 'center');
        minus.textContent = '-';

        plus.addEventListener('click', () => {
            this.changeCartCount(1);
        })
        minus.addEventListener('click', () => {
            this.changeCartCount(-1);
        })

        // Append plus, count, and minus to countChange
        countChange.appendChild(plus);
        countChange.appendChild(this.countText);
        countChange.appendChild(minus);

        // Append countChange to countChangeHolder
        countChangeHolder.appendChild(countChange);

        // Create the item price div
        let itemPrice = document.createElement('div');
        itemPrice.classList.add('itemPrice', 'price', 'p-2', 'h2');
        itemPrice.textContent = `$${product.price}`;

        // Append all elements to the outer container
        outer.appendChild(img);
        outer.appendChild(itemName);
        outer.appendChild(countChangeHolder);
        outer.appendChild(itemPrice);

        return outer;
    }


    changeCartCount(change) {
        if (this.count + change <= 0) {
            Cart.removeItem(this.id);
            CartItem.cartItems = CartItem.cartItems.filter(item => item !== this);
            this.product.count -= change;
            this.normalCard.update();
        }
        else if (this.product.count + change >= 0) {
            this.count += change;
            this.countText.textContent = this.count || "1";
            console.log('changeing')
            this.product.count -= change;
            this.normalCard.update();
        }

        let cart = new Cart();
        cart.calculateCartFinalPrice();

    }

}