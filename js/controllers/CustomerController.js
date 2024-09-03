import Database from "./Database.js";
import Customer from "../Customer.js";


export default class CustomerController {

    customerList = [];

    constructor() {
        if (CustomerController.customerController)
            return CustomerController.customerController;
        this.firstNameTxt = document.getElementById('firstName');
        this.lastNameTxt = document.getElementById('lastName');
        this.emailTxt = document.getElementById('email');
        this.birthdayTxt = document.getElementById('birthday');
        this.addressTxt = document.getElementById('address');
        this.cityTxt = document.getElementById('city');
        this.registerCustomerBtn = document.getElementById('registerCustomer');
        this.registerCustomerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.saveCustomer()
        });


        this.customerList = new Database().getCustomers();
        console.log('customer Controller created');
        CustomerController.customerController = this;

    }


    saveCustomer() {
        let customer = new Customer(this.firstNameTxt.value, this.lastNameTxt.value, this.emailTxt.value, this.birthdayTxt.value, this.addressTxt.value, this.cityTxt.value)
        console.log('address  : ' + this.addressTxt.value);
        //console.log(customer);
        new Database().addCustomer(customer);
        // console.log(localStorage.getItem("customerList"))
    }
}