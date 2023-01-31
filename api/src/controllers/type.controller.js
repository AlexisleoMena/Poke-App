const { Type } = require("../db.js");
const axios = require("axios");

const getAllTypes = async (req, res) => {
  try {
    let { data: { results }} = await axios("https://pokeapi.co/api/v2/type");
    await Type.bulkCreate(results, { ignoreDuplicates: true });
    let types = await Type.findAll({ attributes: ["name"] });
    types = types.map( ({dataValues}) => dataValues.name );
    res.send(types);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  getAllTypes,
}