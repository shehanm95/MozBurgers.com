import Database from "./controllers/Database.js";

export default class Customer {
    constructor(firstName, lastName, email, birthday, phoneNumber, address, city) {
        this.id = new Database().generateCustomerId();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.birthday = birthday;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.orders = []
    }

    getFullName() {
        return this.firstName + " " + this.lastName;
    }

    getAllOrderValue() {
        this.fullOrderAmount = 0;
        if (this.orders.length > 0) {
            this.orders.forEach(order => {
                this.fullOrderAmount += order.finalValue || 0;
            });
        }
        return this.fullOrderAmount;
    }


    static generateCustomer(jsonCustomer) {
        let customer = new Customer(
            jsonCustomer.firstName,
            jsonCustomer.lastName,
            jsonCustomer.email,
            jsonCustomer.birthday,
            jsonCustomer.phoneNumber,
            jsonCustomer.address,
            jsonCustomer.city
        );
        customer.id = jsonCustomer.id;
        return customer;
    }
}