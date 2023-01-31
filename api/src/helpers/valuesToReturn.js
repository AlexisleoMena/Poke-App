const valuesToReturnFromDB = ({dataValues}) => {
  return {
    id: dataValues.id,
    name: dataValues.name,
    hp: dataValues.hp,
    attack: dataValues.attack,
    defense: dataValues.defense,
    speed: dataValues.speed,
    height: dataValues.height,
    weight: dataValues.weight,
    img: dataValues.img,
    starts: dataValues.starts,
    principal_type: dataValues.principal_type,
    types: dataValues.types.map( ({dataValues}) => dataValues.name )
  }
}

const valuesToReturnFromAPI = ( data ) => {
  let img = data.sprites.other.home.front_default;
  return {
    id: data.id,
    name: data.name.toLowerCase(),
    hp: data.stats[0].base_stat,
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    speed: data.stats[5].base_stat,
    height: data.height,
    weight: data.weight,
    img: img || "https://i.postimg.cc/tTchPKBZ/Pokebola.png",
    types: data.types.map( ({ type: { name }}) => name )
  }
} 

module.exports = {
  valuesToReturnFromDB,
  valuesToReturnFromAPI

}