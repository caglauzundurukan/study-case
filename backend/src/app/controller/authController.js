const Users = require("../model/user");
const {createToken} = require("../utils/token");

const loginHandler = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await Users.findOne({ where: { userName: userName, password: password } });
    if (user === null) {
        res.status(404).send("Not found!");
        return;
    }

    const token = createToken(user.id, user.role);
    res.send({ token });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = loginHandler;
