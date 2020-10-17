function getCurrencyConversionRate(currency) {
  return fetch(
    `https://api.exchangeratesapi.io/latest?base=${currency.toUpper()}`
  );
}

module.exports = {
  getCurrencyConversionRate,
};
