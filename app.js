let table = document.querySelector("table")
let tBody = document.querySelector("tbody")
let vkupno = document.querySelector("#vkupno")

vkupno.innerText = 0
let dataRow = 0


let addProduct = function (e) {
     dataRow++
     // Creating of table rows
     let newRow = document.createElement("tr")
     newRow.classList.add(`rowNum${dataRow}`, "rowClass")
     tBody.appendChild(newRow)

     // Creating table data, elemenets within td and append td to tr
     let redenBroj = document.createElement("td")
     newRow.appendChild(redenBroj)
     redenBroj.append(dataRow)
     redenBroj.classList.add("redenBroj")

     let opis = document.createElement("td")
     newRow.appendChild(opis)
     let opisInput = document.createElement("input")
     opisInput.classList.add("tableInput")
     opis.appendChild(opisInput)
     let opisTxt = document.createElement("span")
     opis.appendChild(opisTxt)

     let edinecnaMera = document.createElement("td")
     newRow.appendChild(edinecnaMera)
     let edinecnaMeraInput = document.createElement("input")
     edinecnaMeraInput.classList.add("tableInput")
     edinecnaMeraInput.setAttribute("type", "text")
     edinecnaMera.appendChild(edinecnaMeraInput)
     let edinecnaMeraTxt = document.createElement("span")
     edinecnaMera.appendChild(edinecnaMeraTxt)

     let kolicina = document.createElement("td")
     newRow.appendChild(kolicina)
     let kolicinaInput = document.createElement("input")
     kolicinaInput.classList.add("tableInput")
     kolicinaInput.setAttribute("type", "number")
     kolicina.appendChild(kolicinaInput)
     let kolicinaTxt = document.createElement("span")
     kolicina.appendChild(kolicinaTxt)

     let cenaBezDDV = document.createElement("td")
     newRow.appendChild(cenaBezDDV)
     let cenaBezDDVInput = document.createElement("input")
     cenaBezDDVInput.setAttribute("type", "number")
     cenaBezDDVInput.classList.add("tableInput")
     cenaBezDDV.append(cenaBezDDVInput)
     let cenaBezDDVTxt = document.createElement("span")
     cenaBezDDV.appendChild(cenaBezDDVTxt)

     let danocnaStapka = document.createElement("td")
     newRow.appendChild(danocnaStapka)
     let danocnaStapkaInput = document.createElement("input")
     danocnaStapkaInput.classList.add("tableInput")
     danocnaStapkaInput.setAttribute("type", "number")
     danocnaStapka.appendChild(danocnaStapkaInput)
     let danocnaStapkaTxt = document.createElement("span")
     danocnaStapka.appendChild(danocnaStapkaTxt)

     let DDV = document.createElement("td")
     newRow.appendChild(DDV)
     let DDVInput = document.createElement("input")
     DDVInput.setAttribute("type", "number")
     DDVInput.classList.add("tableInput")
     DDV.append(DDVInput)
     let DDVTxt = document.createElement("span")
     DDV.appendChild(DDVTxt)

     let iznos = document.createElement("td")
     newRow.appendChild(iznos)
     let iznosTxt = document.createElement("span")
     iznos.appendChild(iznosTxt)
     let toggleBtnRow = document.createElement("td")
     newRow.appendChild(toggleBtnRow)

     // Creating toggle check and edit button in the table rows
     let toggleBtn = document.createElement("div")
     toggleBtn.classList.add("checkBtn")
     toggleBtnRow.appendChild(toggleBtn)

     toggleBtn.addEventListener("click", function () {
          let calculated = iznosTxt.toggleAttribute("disabled")
          if (calculated) {
               // Hiding inputs and turning their value to span.InnerText
               opisTxt.innerText = opisInput.value
               opisInput.style.display = "none"
               opisTxt.style.display = "block"

               edinecnaMeraTxt.innerText = edinecnaMeraInput.value
               edinecnaMeraInput.style.display = "none"
               edinecnaMeraTxt.style.display = "block"

               kolicinaTxt.innerText = parseFloat(kolicinaInput.value)
               kolicinaInput.style.display = "none"
               kolicinaTxt.style.display = "block"
               if (isNaN(kolicinaTxt.innerText)) {
                    kolicinaTxt.innerText = 0
               }

               cenaBezDDVTxt.innerText = parseFloat(cenaBezDDVInput.value)
               cenaBezDDVInput.style.display = "none"
               cenaBezDDVTxt.style.display = "block"
               if (isNaN(cenaBezDDVTxt.innerText)) {
                    cenaBezDDVTxt.innerText = 0
               }

               danocnaStapkaTxt.innerText = parseFloat(danocnaStapkaInput.value)
               danocnaStapkaInput.style.display = "none"
               danocnaStapkaTxt.style.display = "block"
               if (isNaN(danocnaStapkaTxt.innerText)) {
                    danocnaStapkaTxt.innerText = 0
               }

               DDVTxt.innerText = parseFloat(DDVInput.value)
               DDVInput.style.display = "none"
               DDVTxt.style.display = "block"
               if (isNaN(DDVTxt.innerText)) {
                    DDVTxt.innerText = 0
               }

               iznosTxt.style.display = "block"

               // Math for the total number on the table footer
               let iznosBezDanok = (parseFloat(kolicinaTxt.innerText) * parseFloat(cenaBezDDVTxt.innerText))
               let iznosVkupno = iznosBezDanok + ((iznosBezDanok / 100) * parseFloat(danocnaStapkaTxt.innerText)) + ((iznosBezDanok / 100) * parseFloat(DDVTxt.innerText))
               iznosTxt.innerText = iznosVkupno.toFixed(2)
               vkupno.innerText = (iznosVkupno + parseFloat(vkupno.innerText)).toFixed(2)

               toggleBtn.classList.remove("checkBtn")
               toggleBtn.classList.add("editBtn")


          } else {
               // Math for when click edit button on the table row
               vkupno.innerText = ((parseFloat(vkupno.innerText) - parseFloat(iznosTxt.innerText))).toFixed(2)
               iznosTxt.style.display = "none"

               // Hiding the spans in the td to inputs when clicked edit btn 
               opisInput.style.display = "block"
               opisTxt.style.display = "none"

               edinecnaMeraInput.style.display = "block"
               edinecnaMeraTxt.style.display = "none"

               kolicinaInput.style.display = "block"
               kolicinaTxt.style.display = "none"

               cenaBezDDVInput.style.display = "block"
               cenaBezDDVTxt.style.display = "none"

               danocnaStapkaInput.style.display = "block"
               danocnaStapkaTxt.style.display = "none"

               iznosTxt.style.display = "none"
               iznosTxt.innerText = ""

               DDVInput.style.display = "block"
               DDVTxt.style.display = "none"

               toggleBtn.classList.remove("editBtn")
               toggleBtn.classList.add("checkBtn")
          }

     })

     // Creating the delete button
     let deleteBtnRow = document.createElement("td")
     newRow.appendChild(deleteBtnRow)
     let deleteBtn = document.createElement("div")
     deleteBtn.classList.add("deleteBtn")
     deleteBtn.setAttribute("id", `deleteBtnNum${dataRow}`)
     deleteBtnRow.appendChild(deleteBtn)

     // Function for delete button minusing the deleted row total from the main total
     deleteBtn.addEventListener("click", function (e) {
          // delIznos is inner text of the iznos in the deleted row
          let delIznos = e.target.parentElement.parentElement.childNodes[7].innerText
          let newVkupno = (parseFloat(vkupno.innerText) - parseFloat(delIznos)).toFixed(2)
          if (!isNaN(newVkupno)) {
               vkupno.innerText = parseFloat(newVkupno).toFixed(2)
          }
          e.target.parentElement.parentElement.remove()
     })

}

// Creating and giving function to reset and print button
let resetBtn = document.getElementById("reset")
resetBtn.addEventListener("click", function () {
     let allRows = document.querySelectorAll(".rowClass")
     for (let i of allRows) {
          i.remove()
     }
     dataRow = 0
     vkupno.innerText = 0
})

let printBtn = document.getElementById("print")
printBtn.addEventListener("click", function () {
     print()
})

// Add table row button
let newProductBtn = document.getElementById("newProduct")
newProductBtn.onclick = addProduct

// Toggle button for the companies and billing info
let infoBtnDiv = document.querySelector(".infoBtnDiv")
let infoBtn = document.createElement("button")
infoBtnDiv.append(infoBtn)
infoBtn.classList.add("checkBtnOnInfo")
let pobaruvaInputs = document.querySelectorAll(".infoInputClass")
let pobaruvaText = document.querySelector("h3")

infoBtn.addEventListener("click", function () {
     let done = pobaruvaText.toggleAttribute("disabled")
     if (done) {
          for (let i of pobaruvaInputs) {
               i.disabled = true
          }
          infoBtn.classList.remove("checkBtnOnInfo")
          infoBtn.classList.add("editBtnOnInfo")
     } else {
          for (let i of pobaruvaInputs) {
               i.disabled = false
          }
          infoBtn.classList.remove("editBtnOnInfo")
          infoBtn.classList.add("checkBtnOnInfo")
     }
})
