const Datastore = require("nedb"),
  db = new Datastore({ filename: "db/exchange" });

// ID do usuário;
// Moeda origem;
// Valor origem;
// Moeda destino;
// Taxa de conversão utilizada;
// Data/Hora UTC;
