const axios = require('axios');
const { valuesToReturnFromAPI } = require("../helpers/valuesToReturn.js");

function get40Urls() {
  const urls = []
  while(urls.length < 40) {
    let num = Math.ceil(Math.random()*10249);
    (num <= 905 || num >= 10001) && !urls.includes(num) && urls.push(num);
  };
  return urls.map( (u) => `https://pokeapi.co/api/v2/pokemon/${u}`);
};

const APIsPokemons = async () => {
  try {
    const urls = get40Urls();
    const requests = urls.map( (url) => axios(url));
    let responses = await axios.all(requests);
    return responses.map( ({ data }) => (valuesToReturnFromAPI(data)) );
  } catch (error) {
    console.log(error);
  }
}

const getAllPokemons = async (req, res) => {
  let name = req.query.name;
  try {
    if(name !== undefined) {
      let nameTrimed = name.replace(/^\s+|\s+$/, "");
      let nameLowerCase = nameTrimed.toLowerCase();
      let middleHyphenName = nameLowerCase.replace(" ", "-")
      let { data } = await axios("https://pokeapi.co/api/v2/pokemon/" + middleHyphenName);
      return res.status(200).send([valuesToReturnFromAPI(data)]);
    }
    const apiPokemons = await APIsPokemons();
    res.status(200).send(apiPokemons);
  } catch (error) {
    res.status(500).send(error.message)    
  }
}

const getPokemonById = async (req, res) => {
  const { id } = req.params;
  try {
    let { data } = await axios("https://pokeapi.co/api/v2/pokemon/" + id);
    res.status(200).send(valuesToReturnFromAPI(data));
  } catch (error) {
    res.status(404).send(error.message);
  }
}

module.exports = { 
  getAllPokemons,
  getPokemonById, 
};