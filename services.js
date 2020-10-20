function getCurrencyConversionRate(currency) {
  return fetch(
    `https://api.exchangeratesapi.io/latest?base=${currency.toUpper()}`
  );
}

export default { getCurrencyConversionRate };
