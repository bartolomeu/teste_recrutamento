import Datastore from "nedb";

const exchange = new Datastore({ filename: "db/exchange" });

// ID do usuário;
// Moeda origem;
// Valor origem;
// Moeda destino;
// Taxa de conversão utilizada;
// Data/Hora UTC;

export default exchange;
