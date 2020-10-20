import { getCurrencyConversionRate } from "../services";

exports.makeConversion = async function (req, res) {
  const { clienID, currencyOrigin, amount, currencyTarget } = req.body;

  // This value is on the fee charged to carry out the transaction
  // e.g To set the fee to 5% set this value to 0.05  =  5% => 5 / 100 => 0.05
  // for development the fee is setted to 0
  const exchangeFee = 0;

  const ratesRequest = await getCurrencyConversionRate(currencyOrigin);

  if (!ratesRequest.ok) {
    // confere body used e retorna erro do servidor
    return res.send(500, "Operation Unavailable");
  }

  const ratesResponse = await ratesRequest.json();

  if (!ratesResponse || !ratesResponse.rates)
    return res.send(500, "Operation Unavailable");

  if (!(currencyTarget.toUpper() in ratesResponse.rates))
    return res.send(400, "currencyTarget not valid");

  const rateTransaction = ratesResponse[currencyTarget.toUpper()];
  const amountTarget = (
    parseFloat(amount) *
    rateTransaction *
    (1 - exchangeFee)
  ).toFixed(2);

  const transactionData = {
    clienID,
    currencyOrigin,
    amountOrigin: amount,
    currencyTarget,
    amountTarget,
    rateTransaction,
    exchangeFee,
    timestamp: new Date(),
  };
};
