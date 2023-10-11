const { getModels, initModels } = require("../model/models");

async function getUsers  (req, res)  {
    await initModels()
    models = getModels()
    const user = await models.User.findAll({
    })
    res.status(200).send(user)
};
module.exports = {getUsers};