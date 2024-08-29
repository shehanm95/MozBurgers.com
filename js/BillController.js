export default class BillController {
    constructor() {
        if (BillController.instance) {
            return BillController.instance;
        }

        this.finalValues = localStorage.getItem("finalValues");

        this.customerNameAndAddress = document.getElementById('customerNameAndAddress');




        BillController.instance = this;
    }



}