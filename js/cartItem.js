export default class CartItem {
    count = 0;
    constructor(product) {
        this.product = product;
        this.count++;
    }

    addItem() {
        this.count++;
        this.updateItemCard();
    }

    updateItemCard() {

    }







    static pushCartItem(product) {
        let outer = document.createElement('div');
        outer.id = `item${product.id}`
        outer.classList = 'orderItem'
        let cartItem = `
        <img src="${product.imgSrc}" alt="${product.name}.png">
        <p class="itemName h4">${product.name}</p>
        <div class="countChangeHolder">
            <div class="countChange flex center ">
                <div class="m-0  plus change orangeBackground flex center">+</div>
                <div class="count flex center">1</div>
                <div class="m-0 minus change lightGrayBackground flex center">-</div>
            </div>
        </div>
        <div class="itemPrice price p-2 h2">$${product.price}</div>
        `

        outer.innerHTML = cartItem;
        return outer;
    }
}