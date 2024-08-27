import Cart from "./Cart.js";
export default class Product {

    stocks = [];
    count = 0;
    constructor(name, id, srcImg, description, price, discount) {
        this.name = name;
        this.id = id;
        this.imgSrc = srcImg;
        this.discount = discount;
        this.description = description;
        this.price = price;
        this.cart = Cart.getCart();
    }

    Stock = class {
        status = "Not Expired";
        constructor(inDate, expiredInDays, inPrice, count) {
            this.inDate = new Date(inDate);
            this.expiredIn = expiredInDays * 24 * 60 * 60 * 1000; // Convert days to milliseconds
            this.inPrice = inPrice;
            this.count = count;
        }

        checkWarning() {
            if (Date.now() - this.inDate.getTime() > this.expiredIn) {
                this.status = "Expired";
            }
            return this.status;
        }
    }

    addStock(newStockObject) {
        this.stocks.push(newStockObject);
    }

    getCount() {

        this.stocks.forEach(stock => {
            count += stock.count
            this.cart.addProducts(this.Product);
        });
        this.count = Math.floor(Math.random() * 10 + 4);
        return this.count;

    }


} 