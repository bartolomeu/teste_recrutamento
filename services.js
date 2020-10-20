import fetch from "node-fetch";

function getCurrencyConversionRate(currency) {
  return fetch(
    `https://api.exchangeratesapi.io/latest?base=${currency.toUpperCase()}`
  );
}

export default { getCurrencyConversionRate };
