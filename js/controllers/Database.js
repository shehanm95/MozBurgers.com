export default class Database {

    constructor() {
        if (Database.database) {
            return Database.database;
        }

        Database.database = this;
    }

    getCustomers() {
        this.customerList = JSON.parse(localStorage.getItem("customerList"));
        if (this.customerList == 'undefined' || !this.customerList) this.customerList = [];
        return this.customerList;
    }

    addCustomer(customer) {
        this.getCustomers();
        this.customerList.push(customer);
        alert("customer added !");
        localStorage.setItem("customerList", JSON.stringify(this.customerList));
        return this.getCustomers();
    }

    generateCustomerId() {
        this.getCustomers();
        return this.customerList[this.customerList.length - 1].id + 1 || 1;
    }






}