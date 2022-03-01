let table = document.querySelector("table");
let tBody = document.querySelector("tbody");
let total = document.querySelector("#total");

total.innerText = 0;
let dataRow = 0;

const createTableData = (rowRef, rowNumber, type, name) => {
    let tableData = document.createElement("td");
    rowRef.appendChild(tableData);
    let tableDataInput = document.createElement("input");
    tableDataInput.classList.add("tableDataInput", name);
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
    tableData.appendChild(tableDataTxt);

    tableDataInput.addEventListener("input", function () {
        tableDataTxt.innerText = this.value;
    });
};

const createTextField = (rowRef, rowNumber, name) => {
    let tableData = document.createElement("td");
    rowRef.appendChild(tableData);
    let tableDataTxt = document.createElement("span");

    tableDataTxt.classList.add("tableDataTxt");
    tableDataTxt.id = `${name}-row-${rowNumber}`;
    tableData.appendChild(tableDataTxt);
};

const createTaxListData = (rowRef, rowNumber) => {
    const id = `taxRate-row-${rowNumber}`;
    let tableData = document.createElement("td");
    rowRef.appendChild(tableData);

    var select = document.createElement("select");
    select.classList.add("tableDataInput", "taxRate");
    select.name = "taxRate";
    select.id = id;

    var option = document.createElement("option");
    option.value = "1.18";
    option.text = "18%";
    select.appendChild(option);

    var option = document.createElement("option");
    option.value = "1.05";
    option.text = "5%";
    select.appendChild(option);

    var option = document.createElement("option");
    option.value = "1";
    option.text = "0%";
    select.appendChild(option);

    tableData.appendChild(select);

    let tableDataTxt = document.createElement("span");
    tableDataTxt.classList.add("tableDataTxt");
    tableDataTxt.innerText = "18%";
    tableDataTxt.id = id;
    tableData.appendChild(tableDataTxt);

    select.addEventListener("change", function (event) {
        const { options, selectedIndex } = event.target;
        tableDataTxt.innerText = options[selectedIndex].text;
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
    var rows = tBody.getElementsByTagName("tr");
    rowNumber.append(rows.length);
    rowNumber.classList.add("rowNumber");

    createTableData(newRow, dataRow, "text", "desc");
    createTableData(newRow, dataRow, "number", "unitMeasure");
    createTableData(newRow, dataRow, "number", "quantity");
    createTextField(newRow, dataRow, "priceWithoutTax");
    createTaxListData(newRow, dataRow);
    createTextField(newRow, dataRow, "ddv");

    const amount = document.createElement("td");
    newRow.appendChild(amount);
    const amountTxt = document.createElement("span");
    amount.appendChild(amountTxt);
    const toggleBtnRow = document.createElement("td");
    toggleBtnRow.classList.add("hidden-print");
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

            // Element objects
            const unitMeasure = document.getElementById(
                `unitMeasure-${this.id}`
            );
            const quantity = document.getElementById(`quantity-${this.id}`);
            const priceWithoutTax = document.getElementById(
                `priceWithoutTax-${this.id}`
            );
            const taxRate = document.getElementById(`taxRate-${this.id}`);
            const ddv = document.getElementById(`ddv-${this.id}`);

            // Element value
            const unitMeasureValue = unitMeasure.innerText;
            const quantityValue = quantity.innerText;
            const priceWithoutTaxValue = priceWithoutTax.innerText;
            const taxRateValue = taxRate.value;
            const ddvValue = ddv.innerText;

            let totalWithoutTaxes =
                parseFloat(unitMeasureValue) * parseFloat(quantityValue);
            priceWithoutTax.innerText = totalWithoutTaxes.toFixed(2);

            // price with ddv (unitMeasureValue * quantityValue) * taxRate [1,05 or 1,18 or 1]
            const totalAmount = totalWithoutTaxes * taxRateValue;

            // ddv = price with ddv - price without ddv
            ddv.innerText = (totalAmount - totalWithoutTaxes).toFixed(2);

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
    deleteBtnRow.classList.add("hidden-print");
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
            total.innerText = parseFloat(newTotalAmount).toFixed(2);
        }

        e.target.parentElement.parentElement.remove();

        let rows = tBody.querySelectorAll("tr");

        rows.forEach((row) => {
            row.children[0].innerText = row.rowIndex;
        });
    });
};

addProduct();

let addNewProductBtn = document.getElementById("newProduct");
addNewProductBtn.addEventListener("click", function () {
    addProduct();
});

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

const printBtn = document.getElementById("btnPrint");
printBtn.addEventListener("click", function () {
    let allTableRows = document.querySelectorAll(".checkBtn");
    for (let tableRow of allTableRows) {
        tableRow.click();
    }

    print();
});
