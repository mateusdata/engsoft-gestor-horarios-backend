import { verify } from "jsonwebtoken";
const chaveSecreta = "mateus";

const middlewareUser = (req, res, next) => {
  const tokenHeader = req.header("Authorization");
  
  if (!tokenHeader) {
    return res.status(403).send("Acesso negado");
  }

  const token = tokenHeader.split(" ")[1];

  try {
    verify(token, chaveSecreta, (err, decode) => {
      if (err) {
        return res.status(401).json({ message: "Token inválido ou expirado" });
      }
      req.id_token = decode.id_token;
      next();
    });
  } catch {
    return res.status(500).json({ message: "Erro interno no servidor", token });
  }
};

export default middlewareUser;
