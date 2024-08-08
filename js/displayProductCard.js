

import Cart from './Cart.js';


export default class ItemCard {

    #cart = null;
    product = null;
    count = 10;
    constructor(product) {
        this.product = product;
        this.#cart = Cart.getCart();

    }

    createElement(tag, className, innerHTML) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (innerHTML) element.innerText = innerHTML;
        return element;
    }
    plusButton = null;
    countDisplay = null;
    minusButton = null;
    changeCountF(val) {
        this.countDisplay.value += val;
        this.countDisplay.innerHTML = 10 // this.countDisplay.value;
    };

    createItemCard() {
        // Create item card container
        const itemCard = this.createElement('div', 'itemCard');

        // Create item status dot
        const itemStatusDot = this.createElement('div', 'itemStatusDot');
        itemCard.appendChild(itemStatusDot);

        // Create img and name container
        const imgAndName = this.createElement('div', 'imgAndName');
        imgAndName.setAttribute('onclick', "displayPopUp('productPageHolder')");

        const img = this.createElement('img', 'itmImg');
        img.src = this.product.imgSrc,
            img.alt = 'item image';
        imgAndName.appendChild(img);

        const nameAndDescription = this.createElement('div', 'nameAndDescription');
        const itemName = this.createElement('p', 'ItemName', this.product.name);
        const itemDescription = this.createElement('p', 'ItemDescription', this.product.description);
        nameAndDescription.appendChild(itemName);
        nameAndDescription.appendChild(itemDescription);
        imgAndName.appendChild(nameAndDescription);

        itemCard.appendChild(imgAndName);

        // Create price and count container
        const priceAndCount = this.createElement('div', 'priceAndCount');
        const cardPrice = this.createElement('p', 'cardPrice', `$${this.product.price}`);
        const cardDiscount = this.createElement('p', 'cardDiscount', `${this.product.discount}%`);
        priceAndCount.appendChild(cardPrice);
        priceAndCount.appendChild(cardDiscount);

        // Create warning stack
        const warningStack = this.createElement('div', 'warningStack ms-3 ms-md-0');
        // this.product.warnings.forEach(warningSrc => {
        //     const warningImage = this.createElement('img', 'waringImage');
        //     warningImage.src = warningSrc;
        //     warningImage.alt = 'warning';
        //     warningStack.appendChild(warningImage);
        // });
        priceAndCount.appendChild(warningStack);

        // Create count change container
        const countChange = this.createElement('div', 'countChange flex center');
        this.plusButton = this.createElement('div', 'm-0 plus change orangeBackground flex center', 'Add To Cart');
        this.countDisplay = this.createElement('div', 'count flex center', this.product.count);
        this.minusButton = this.createElement('div', 'm-0 minus change lightGrayBackground flex center', '-');
        //countChange.appendChild(this.minusButton);
        countChange.appendChild(this.countDisplay);
        countChange.appendChild(this.plusButton);
        priceAndCount.appendChild(countChange);
        this.count = this.product.getCount();
        this.countDisplay.innerText = this.count;

        itemCard.appendChild(priceAndCount);

        //this.minusButton.onclick(this.changeCountF(-1));
        //this.minusButton.onclick(this.changeCountF(1));

        this.plusButton.addEventListener('click', () => {
            if (this.count > 0) {
                this.count--;
                this.#cart.addProducts(this.product)
                this.countDisplay.innerHTML = this.count;
            }
        });

        return itemCard;



    }
}

