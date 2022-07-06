const amount = document.querySelector(".amount"); //input
const currency = document.querySelector("#currency"); //selector
const swapBtn = document.querySelector(".swap");
const rateInfo = document.querySelector(".rate-info");

const calculateCur = () => {
  console.log(currency);
  // endresult.textContent = "Calculating....";
  axios
    .get(`http://api.nbp.pl/api/exchangerates/rates/A/${currency.value}/`)
    .then((res) => {
      calculate(res.data.rates[0].mid);
    })
    .catch((errors) => {
      console.error(errors);
    });
};

const calculate = (responses) => {
  if (amount.value == "") {
    alert("Wpisz kwotę");
  } else {
    const result = amount.value * responses;
    rateInfo.textContent = result;
  }
};

// amount.addEventListener("input", calculateCur);
// currency.addEventListener("change", calculateCur);
swapBtn.addEventListener("click", calculateCur);
