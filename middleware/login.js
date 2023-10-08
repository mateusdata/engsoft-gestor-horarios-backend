const jwt = require("jsonwebtoken");
const chaveSecreta = "mateus";
const middleareUser = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(403).send("Acesso negado");
  }

  try {
    jwt.verify(token, chaveSecreta, (err, decode) => {
      if (err) {
        return res.send("deu errado");
      }
      req.id_token = decode.id_token;
    });
    // Mantenha a chamada next() aqui para continuar o fluxo
    next();
  } catch {
    return res
      .status(401)
      .json({ mensagem: "Token inválido ou expirado"});
  }
};
module.exports = middleareUser;
