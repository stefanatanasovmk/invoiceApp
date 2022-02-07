let table = document.querySelector("table");
let tBody = document.querySelector("tbody");
let total = document.querySelector("#total");

total.innerText = 0;
let dataRow = 0;

const createTableData = (rowRef, rowNumber, type, name) => {
    let tableData = document.createElement("td");
    rowRef.appendChild(tableData);
    let tableDataInput = document.createElement("input");
    tableDataInput.classList.add("tableDataInput");
    tableDataInput.setAttribute("type", type);
    if (type === "number") {
        tableDataInput.setAttribute("min", 0);
        tableDataInput.setAttribute("value", 0);
    }
    tableDataInput.setAttribute("name", name);
    tableData.appendChild(tableDataInput);
    let tableDataTxt = document.createElement("span");
    if (type === "number") {
        tableDataTxt.innerText = 0;
    }
    tableDataTxt.classList.add("tableDataTxt");
    tableDataTxt.id = `${name}-row-${rowNumber}`;
    // tableDataTxt.style.backgroundColor = red;
    tableData.appendChild(tableDataTxt);

    tableDataInput.addEventListener("input", function () {
        tableDataTxt.innerText = this.value;
    });
};

let addProduct = function (e) {
    dataRow++;
    // Creating of table rows
    let newRow = document.createElement("tr");
    newRow.classList.add(`rowNum${dataRow}`, "rowClass", "notCalculated");
    tBody.appendChild(newRow);

    // Creating table data, elements within td and append td to tr
    let rowNumber = document.createElement("td");
    newRow.appendChild(rowNumber);
    rowNumber.append(dataRow);
    rowNumber.classList.add("rowNumber");

    createTableData(newRow, dataRow, "text", "desc");
    createTableData(newRow, dataRow, "number", "unitMeasure");
    createTableData(newRow, dataRow, "number", "quantity");
    createTableData(newRow, dataRow, "number", "priceWithoutTax");
    createTableData(newRow, dataRow, "number", "taxRate");
    createTableData(newRow, dataRow, "number", "ddv");

    const amount = document.createElement("td");
    newRow.appendChild(amount);
    const amountTxt = document.createElement("span");
    amount.appendChild(amountTxt);
    const toggleBtnRow = document.createElement("td");
    newRow.appendChild(toggleBtnRow);

    // Creating toggle check and edit button in the table rows
    const toggleBtn = document.createElement("button");
    toggleBtn.classList.add("checkBtn", `calc-row-${dataRow}`);
    toggleBtn.id = `row-${dataRow}`;
    toggleBtnRow.appendChild(toggleBtn);

    toggleBtn.addEventListener("click", function (event) {
        // why disabled
        let calculated = amountTxt.toggleAttribute("disabled");
        if (calculated) {
            newRow.classList.add("isCalculated");
            newRow.classList.remove("notCalculated");

            amountTxt.style.display = "block";
            // Math for the total number on the table footer
            var unitMeasure = document.getElementById(
                `unitMeasure-${this.id}`
            ).innerText;
            var quantity = document.getElementById(
                `quantity-${this.id}`
            ).innerText;
            var priceWithoutTax = document.getElementById(
                `priceWithoutTax-${this.id}`
            ).innerText;
            var taxRate = document.getElementById(
                `taxRate-${this.id}`
            ).innerText;
            var ddv = document.getElementById(`ddv-${this.id}`).innerText;

            let totalWithoutTaxes =
                parseFloat(quantity) * parseFloat(priceWithoutTax);
            let totalAmount =
                totalWithoutTaxes +
                (totalWithoutTaxes / 100) * parseFloat(taxRate) +
                (totalWithoutTaxes / 100) * parseFloat(ddv);
            amountTxt.innerText = totalAmount.toFixed(2);
            total.innerText = (
                totalAmount + parseFloat(total.innerText)
            ).toFixed(2);

            toggleBtn.classList.remove("checkBtn");
            toggleBtn.classList.add("editBtn");
        } else {
            newRow.classList.remove("isCalculated");
            newRow.classList.add("notCalculated");
            // Math for when click edit button on the table row
            total.innerText = (
                parseFloat(total.innerText) - parseFloat(amountTxt.innerText)
            ).toFixed(2);

            amountTxt.innerText = "";

            toggleBtn.classList.remove("editBtn");
            toggleBtn.classList.add("checkBtn");
        }
    });

    // Creating the delete button
    let deleteBtnRow = document.createElement("td");
    newRow.appendChild(deleteBtnRow);
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.setAttribute("id", `deleteBtnNum${dataRow}`);
    deleteBtnRow.appendChild(deleteBtn);

    // Function for delete button minusing the deleted row total from the main total
    deleteBtn.addEventListener("click", function (e) {
        // delIznos is inner text of the iznos in the deleted row
        let deletedAmount =
            e.target.parentElement.parentElement.childNodes[7].innerText;
        let newTotalAmount = (
            parseFloat(total.innerText) - parseFloat(deletedAmount)
        ).toFixed(2);
        if (!isNaN(newTotalAmount)) {
            total.innerText = parseFloat(newVkupno).toFixed(2);
        }
        e.target.parentElement.parentElement.remove();
    });
};

addProduct();

// Creating and giving function to reset and print button
let resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", function () {
    let allRows = document.querySelectorAll(".rowClass");
    for (let i of allRows) {
        i.remove();
    }
    dataRow = 0;
    total.innerText = 0;
    addProduct();
});

let printBtn = document.getElementById("print");
printBtn.addEventListener("click", function () {
    print();
});

// Add table row button
let newProductBtn = document.getElementById("newProduct");
newProductBtn.onclick = addProduct;

// Toggle button for the companies and billing info
let infoBtnDiv = document.querySelector(".infoBtnDiv");
let infoBtn = document.createElement("button");
infoBtnDiv.append(infoBtn);
infoBtn.classList.add("checkBtnOnInfo");
let pobaruvaInputs = document.querySelectorAll(".infoInputClass");
let pobaruvaText = document.querySelector("h3");

infoBtn.addEventListener("click", function () {
    let done = pobaruvaText.toggleAttribute("disabled");
    if (done) {
        for (let i of pobaruvaInputs) {
            i.disabled = true;
        }
        infoBtn.classList.remove("checkBtnOnInfo");
        infoBtn.classList.add("editBtnOnInfo");
    } else {
        for (let i of pobaruvaInputs) {
            i.disabled = false;
        }
        infoBtn.classList.remove("editBtnOnInfo");
        infoBtn.classList.add("checkBtnOnInfo");
    }
});
