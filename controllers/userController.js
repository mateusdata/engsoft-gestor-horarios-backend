class UserController {
  getUsers(req, res) {
    res.send("Voce pode acessar essa rota, e vc ta na rota de usuario");
  }
}
module.exports = new UserController();
