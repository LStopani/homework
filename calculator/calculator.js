window.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById("calc-form");

  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      update();
    });
  }
});
const input = { amount: 0, years: 0, rate: 0 };

function getCurrentUIValues() {
  input.amount = document.getElementById("loan-amount").value;
  input.years = document.getElementById("loan-years").value;
  input.rate = document.getElementById("loan-rate").value;
  // return input;
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  let defaultAmount = document.getElementById("loan-amount")
  defaultAmount.setAttribute("value", 0)
  let defaultYears = document.getElementById("loan-years")
  defaultYears.setAttribute("value", 0)
  let defaultRate = document.getElementById("loan-rate")
  defaultRate.setAttribute("value", 0)
  calculateMonthlyPayment(input)
  updateMonthly()
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  getCurrentUIValues()
  updateMonthly()
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
// ===> monthly pay = (P x i) / (1-(1+i)^-n)
function calculateMonthlyPayment(principal, years, rate) {
  let monthRate = (rate / 100) / 12;
  let time = Math.floor(years * 12);

  if (time > 0 && monthRate > 0) {
    let compoundMon = (monthRate * principal) / (1 - Math.pow(1 + monthRate, -time));
    return `$${compoundMon.toFixed(2)}`
  };
  if (input.rate == 0 && time > 0) {
    simplePayment = principal / time;
    return `$${simplePayment.toFixed(2)}`
  };
  return `$${principal}`
};


// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  let toDisplay = document.getElementById("monthly-payment");
  toDisplay.innerText = calculateMonthlyPayment(input.amount, input.years, input.rate);
};
