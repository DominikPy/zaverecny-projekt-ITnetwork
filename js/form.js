import { Client } from "./client.js";
// verze 4 OOP zkraceny /FUNGUJE vloz menu nahoru a paticku dolu
let clientArray = []

class InsuranceForm {
    constructor() {
      this.selectedRow = null;
    }
  
    onFormSubmit = (event) => {
      event.preventDefault();
      const formData = this.readFormData();
      this.selectedRow === null ? this.insertNewRecord(formData) : this.updateRecord(formData);
      this.resetForm();
    }
  
    readFormData = () => {
      const firstName = document.getElementById("firstName").value;
      const surname = document.getElementById("surname").value;
      const age = document.getElementById("age").value;
      const mobileNumber = document.getElementById("mobileNumber").value;
      let newClient = new Client(firstName, surname, age, mobileNumber)
      clientArray.push(newClient)
      console.log(clientArray)
    }
  
    insertNewRecord = (data) => {
      const table = document.getElementById("insuranceList").querySelector("tbody");
      const newRow = table.insertRow();
      
      newRow.innerHTML = `
        <td>${data.firstName}</td>
        <td>${data.surname}</td>
        <td>${data.age}</td>
        <td>${data.mobileNumber}</td>
        <td>
          <a href="#" onclick="insuranceForm.onEdit(this)">Upravit</a>
          <a href="#" onclick="insuranceForm.onDelete(this)">Zrušit</a>
        </td>
      `;
    }
  
    resetForm = () => {
      const form = document.getElementById("insuranceForm");
      form.reset();
      this.selectedRow = null;
    }
  
    onEdit = (element) => {
      const row = element.closest("tr");
      const cells = row.getElementsByTagName("td");
      document.getElementById("firstName").value = cells[0].textContent;
      document.getElementById("surname").value = cells[1].textContent;
      document.getElementById("age").value = cells[2].textContent;
      document.getElementById("mobileNumber").value = cells[3].textContent;
      this.selectedRow = row;
    }
  
    updateRecord = (formData) => {
      const cells = this.selectedRow.getElementsByTagName("td");
      cells[0].textContent = formData.firstName;
      cells[1].textContent = formData.surname;
      cells[2].textContent = formData.age;
      cells[3].textContent = formData.mobileNumber;
    }
  
    onDelete = (element) => {
      if (confirm("Opravdu chcete vymazat tento záznam?")) {
        const row = element.closest("tr");
        row.remove();
      }
    }

    init() {
        this.addInputEventListeners();
      }
    
      addInputEventListeners() {
        const ageInput = document.getElementById("age");
        const mobileNumberInput = document.getElementById("mobileNumber");
    
        ageInput.addEventListener("input", this.validateNumericInput);
        mobileNumberInput.addEventListener("input", this.validateNumericInput);
      }
    
      validateNumericInput(event) {
        const input = event.target;
        const value = input.value;
    
        input.value = value.replace(/\D/g, ""); // Odfiltruje všechny nečíselné znaky
      }
    }
    

  const insuranceForm = new InsuranceForm();
  document.getElementById("insuranceForm").addEventListener("submit", insuranceForm.onFormSubmit);

