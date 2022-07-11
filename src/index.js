const amount = document.querySelector(".amount"); //input
const currency = document.querySelector("#currency"); //selector
const swapBtn = document.querySelector(".swap");
const appBody = document.querySelector(".app-body");
// const loader = document.querySelector(".show-loader");
const rateInfo = document.querySelector(".rate-info");

const addLoader = () => {
  setTimeout(() => {
    const loader = `<div class="loader"></div>`;
    appBody.insertAdjacentHTML("beforeend", loader);
  }, 1000);
};

// const loaderTimeout = setTimeout(addLoader, 1000);

const calculateCur = (event) => {
  event.preventDefault();
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
    const viewResult = `<h3 class="result">${amount.value} ${
      currency.value
    } = ${result.toFixed(2)} ZŁ</h3>`;
    rateInfo.insertAdjacentHTML("beforeend", viewResult);
    const span = `<span class="info">1 ${currency.value} to ${responses} zł</span>`;
    rateInfo.insertAdjacentHTML("beforeend", span);
  }
};

// amount.addEventListener("input", calculateCur);
// currency.addEventListener("change", calculateCur);
swapBtn.addEventListener("click", addLoader);
clearTimeout(addLoader);
swapBtn.addEventListener("click", (event) => calculateCur(event));
