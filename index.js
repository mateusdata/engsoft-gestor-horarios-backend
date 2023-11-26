const express = require("express");
const cors = require("cors");
const app = express();

/**
 * Middleware para analisar o corpo das solicitações como JSON.
 */
app.use(express.json());

app.listen(3001, () => {
   console.log("Servidor rodando na porta " + 3001);
});
