export default class BillController {
    addressExtracted = "\n";
    constructor() {
        if (BillController.instance) {
            return BillController.instance;
        }

        this.currentOrder = JSON.parse(localStorage.getItem("currentOrder"));
        console.log(this.currentOrder);
        this.customerNameAndAddress = document.getElementById('customerNameAndAddress');
        this.subTotalText = document.getElementById('subTotalText');
        this.discountText = document.getElementById('discountText');
        this.taxText = document.getElementById('taxText');
        this.totalText = document.getElementById('totalText');
        BillController.instance = this;
    }

    createCustomerNameAndAddress() {

        this.customer = this.currentOrder.finalValues.customer || null;
        if (this.customer) {
            this.fullName = `${this.customer.firstName} ${this.customer.lastName}`
            if (this.customer.address) {
                this.address = this.customer.address.split(',')
                this.address.forEach(element => {
                    console.log(element + ',')
                    this.addressExtracted += `${element},</br>`;
                });
            }
        }
    }


    displayValues() {
        this.createCustomerNameAndAddress();
        this.customerNameAndAddress.innerHTML = `${this.fullName} </br> ${this.addressExtracted}`
        this.subTotalText.textContent = `$${this.currentOrder.finalValues.subTotal}`;
        this.discountText.textContent = `$${this.currentOrder.finalValues.totalDiscount}`;
        this.taxText.textContent = `$${this.currentOrder.finalValues.tax}`;
        this.totalText.textContent = `$${this.currentOrder.finalValues.finalCartPrice}`;
    }



}