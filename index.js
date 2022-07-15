const amount = document.querySelector(".amount"); //input
const currency = document.querySelector("#currency"); //selector
const swapBtn = document.querySelector(".swap");
const appBody = document.querySelector(".app-body");
const rateInfo = document.querySelector(".rate-info");

const addLoader = () => {
  const loader = `<div id ='show' class="loader"></div>`;
  appBody.insertAdjacentHTML("beforeend", loader);
};

const removeLoader = () => {
  const removeLoad = document.getElementById("show");
  appBody.removeChild(removeLoad);
};

const calculateCur = (event) => {
  event.preventDefault();
  addLoader();
  setTimeout(() => {
    axios
      .get(`https://api.nbp.pl/api/exchangerates/rates/A/${currency.value}/`)
      .then((res) => {
        calculate(res.data.rates[0].mid);
      })
      .catch((errors) => {
        removeLoader();
        console.error(errors);
      });
  }, 200);
};

const enterKeyCheck = (event) => {
  if (event.key === "Enter") {
    calculateCur(event);
  }
};

const calculate = (responses) => {
  removeLoader();
  if (amount.value == "") {
    alert("Wpisz poprawną kwotę");
  } else if (amount.value < 1) {
    alert("Wpisz poprawną kwotę");
  } else {
    rateInfo.innerHTML = "";
    const result = amount.value * responses;
    const viewResult = `<h3 class="result">${amount.value} ${
      currency.value
    } = ${result.toFixed(2)} ZŁ</h3>`;
    rateInfo.insertAdjacentHTML("beforeend", viewResult);
    const span = `<span class="info">1 ${currency.value} to ${responses} zł</span>`;
    rateInfo.insertAdjacentHTML("beforeend", span);
  }
};

swapBtn.addEventListener("click", (event) => calculateCur(event));
amount.addEventListener("keyup", (event) => enterKeyCheck(event));
