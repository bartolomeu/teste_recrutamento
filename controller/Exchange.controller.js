import { getCurrencyConversionRate } from "../services";

exports.makeConversion = async function (req, res) {
  const {
    clienID,
    currencyOrigin,
    amount,
    currencyTarget,
    exchangeTax,
  } = req.body;

  const rates = await getCurrencyConversionRate(currencyOrigin);
};
