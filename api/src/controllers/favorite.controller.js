const { Favorite, User, Type } = require("../db.js");
const { valuesToReturnFromDB } = require("../helpers/valuesToReturn.js");

const getAllFavorites = async (req, res) => {
  let { email } = req.params;
  try {
    const data = await Favorite.findAll({
      include: [
        { model: Type, as: "types", attributes: ["name"] },
        {
          model: User,
          as: "users",
          where: { email: email },
          attributes: ["email"],
        },
      ],
      order: [["updatedAt", "desc"]],
    });
    let favorites = data?.map(valuesToReturnFromDB);
    res.status(200).send(favorites);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addFavorite = async (req, res) => {
  try {
    let [favorite, created] = await Favorite.findOrCreate({
      where: { id: req.body.id },
      defaults: { ...req.body, principal_type: req.body.types[0] },
    });
    favorite.starts = favorite.starts + 1;
    await favorite.save();
    if (created) {
      let types = await Type.findAll({ where: { name: req.body.types } });
      favorite.addType(types);
    }
    let user = await User.findByPk(req.body.email);
    let isUserSFavorite = await favorite.hasUser(user);
    if (!isUserSFavorite) {
      await favorite.addUser(user);
    }
    res.status(200).send({ added: !isUserSFavorite });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteFavorite = async (req, res) => {
  id = Number(req.params.id);
  email = req.params.email?.toString();
  try {
    let favorite = await Favorite.findOne({ where: { id: id } });
    let user = await User.findByPk(email);
    let isUserSFavorite = await favorite.hasUser(user);
    if (isUserSFavorite) {
      await favorite.removeUser(user);
      favorite.starts = favorite.starts - 1;
      await favorite.save();
    }
    res.status(200).send({ deleted: isUserSFavorite });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getRanking = async (req, res) => {
  try {
    const favorites = await Favorite.findAll({
      order: [
        ["starts", "desc"],
        ["updatedAt", "desc"],
      ],
      limit: 10,
      include: { model: Type, as: "types" },
    });
    res.send(favorites.map(valuesToReturnFromDB));
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllFavorites,
  addFavorite,
  deleteFavorite,
  getRanking,
};
