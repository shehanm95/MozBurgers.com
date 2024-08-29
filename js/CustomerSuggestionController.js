import Database from "./controllers/Database.js";
import Cart from "./Cart.js";

export default class CustomerSuggestionController {
    constructor() {
        if (CustomerSuggestionController.controller) {
            return CustomerSuggestionController.controller;
        }

        this.input = document.getElementById("searchInput");
        this.suggestTemplate = document.querySelector("[data-customer-name-template]");
        this.dropdown = document.getElementById("dropdownContent");

        this.input.addEventListener('keyup', () => this.filterFunction());

        CustomerSuggestionController.controller = this;
    }

    filterFunction() {
        const filter = this.input.value.toUpperCase();
        this.clearSuggestions();

        if (filter.trim() === "") {
            this.dropdown.style.display = "none";
            return;
        }

        const customers = new Database().getCustomers();

        customers.forEach(customer => {
            const fullName = `${customer.firstName} ${customer.lastName}`;
            if (fullName.toUpperCase().includes(filter)) {
                this.createSuggestion(fullName, customer);
            }
            if (customer.id != undefined && ("" + customer.id).includes(filter)) {
                this.createSuggestion(fullName, customer);
            }
        });

        if (this.dropdown.children.length > 0) {
            this.dropdown.style.display = "block";
        } else {
            this.dropdown.style.display = "none";
        }
    }

    createSuggestion(fullName, customer) {
        let suggest = this.suggestTemplate.content.cloneNode(true).children[0];
        suggest.innerText = fullName;

        suggest.addEventListener('click', () => {
            this.input.value = fullName;
            new Cart().fillCustomerData(customer);
            this.dropdown.style.display = "none";
        });

        this.dropdown.appendChild(suggest);
    }

    clearSuggestions() {
        this.dropdown.innerHTML = '';
    }

    holderDisplayNone(div) {
        div.addEventListener('click', (e) => {
            if (!e.target.matches('#searchInput')) {
                this.dropdown.style.display = "none";
            }
        });
    }
}
