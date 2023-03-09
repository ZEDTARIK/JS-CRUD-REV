const inputFullName = document.getElementById("fullName");
const inputEmail = document.getElementById("email");
const inputPhone = document.getElementById("phone");
const formEmployee = document.getElementById("formEmployee");
const tableBody = document.querySelector("#tableEmployee tbody");


class Employee {
    constructor(id, fullName, email, phone) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
    }

    static showHTML(id, fullName, email, phone) {
        const trElm = document.createElement("tr");
        trElm.innerHTML = `<tr>
                            <td> ${fullName} </td>
                            <td> ${email} </td>
                            <td> ${phone} </td>
                            <td class="text-center">
                                <button class="btn btn-info btn-sm edit" data-id=${id}>Edit</button>
                                <button class="btn btn-danger btn-sm delete" data-id=${id}>Delete</button>
                            </td>
                        </tr>`;
        tableBody.append(trElm);
    }
    // Show Data inside Table 
    showData() {

        Employee.showHTML(this.id, this.fullName, this.email, this.phone);
        return this;
    }

    // Store Data inside local Storage 
    addDataToLocalStorage() {
        const data = JSON.parse(localStorage.getItem("dbEmployee")) ?? [];
        data.push({ id: this.id, fullName: this.fullName, email: this.email, phone: this.phone });
        localStorage.setItem("dbEmployee", JSON.stringify(data));
    }

    static getAllDataFromLocalStorage() {
        if (localStorage.getItem("dbEmployee")) {
            JSON.parse(localStorage.getItem("dbEmployee")).forEach((item) => {
                Employee.showHTML(item.id, item.fullName, item.email, item.phone);
            });
        }
    }
}


// loading Data From Storage 
Employee.getAllDataFromLocalStorage();

// add data from input value && dispaly data inside Table 
formEmployee.addEventListener("submit", (e) => {
    e.preventDefault();

    let id = Math.floor(Math.random() * 1001000000);
    const employee = new Employee(id, inputFullName.value, inputEmail.value, inputPhone.value);
    employee.showData().addDataToLocalStorage();

    // reset input
    inputFullName.value = "";
    inputEmail.value = "";
    inputPhone.value = "";
});

// click to button delete or edit
tableBody.addEventListener("click", (e) => {

    // Delete from Table and LocalStorage 
    if (e.target.classList.contains("delete")) {
        const id = +e.target.getAttribute("data-id");
        const employee = JSON.parse(localStorage.getItem("dbEmployee"));
        const newData = employee.filter(emp => emp.id !== id);
        localStorage.setItem("dbEmployee", JSON.stringify(newData));
        e.target.parentElement.parentElement.remove();
    }
});