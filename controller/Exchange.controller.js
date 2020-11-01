import Services from "../services.js";
import ExchangeModel from "../model/Exchange.model.js";

async function makeConversion(req, res) {
  const { clienID, currencyOrigin, amount, currencyTarget } = req.body;

  // This value is on the fee charged to carry out the transaction
  // e.g To set the fee to 5% set this value to 0.05  =  5% => 5 / 100 => 0.05
  // for development the fee is setted to 0
  const exchangeFee = 0;

  const ratesRequest = await Services.getCurrencyConversionRate(currencyOrigin);

  if (!ratesRequest.ok) {
    // confere body used e retorna erro do servidor
    return res.send(500, "Operation Unavailable");
  }

  const ratesResponse = await ratesRequest.json();

  if (!ratesResponse || !ratesResponse.rates)
    return res.send(500, "Operation Unavailable");

  if (!(currencyTarget.toUpperCase() in ratesResponse.rates))
    return res.send(400, "currencyTarget not valid");

  const rateTransaction = ratesResponse.rates[currencyTarget.toUpperCase()];

  const amountTarget = (
    parseFloat(amount) *
    rateTransaction *
    (1 - exchangeFee)
  ).toFixed(2);

  const exchangeData = {
    clienID,
    currencyOrigin,
    amountOrigin: amount,
    currencyTarget,
    amountTarget,
    rateTransaction,
    exchangeFee,
    timestamp: new Date(),
  };
  try {
    ExchangeModel.insert(exchangeData);
  } catch (error) {
    return res.send(500, "Database Unavailable");
  }

  res.send(exchangeData);
}

function findByUser(req, res) {
  console.log("entrou- ", req.params.id);
  try {
    ExchangeModel.find({ clienID: req.params.id }, function (
      err,
      transactions
    ) {
      console.log("voltou do db");

      if (err) return res.send(500, "DataBase Error");
      console.log("nao deu erro");

      return res.send(transactions);
    });
  } catch (error) {
    console.log(error);
    console.log("entrou erro");
  }
}

export default { makeConversion, findByUser };
