const {Dog, Temperament} = require("../db")
const axios = require("axios")
const { Op } = require("sequelize");

const createDog = async (name, image, weight, height, life_span, temperaments) => {
  
   const newDog = await Dog.create({name, image, weight, height, life_span, temperaments});
   for (let i = 0; i < temperaments.length; i++) {
     const temperament = await Temperament.findByPk(temperaments[i].id);
     await newDog.addTemperament(temperament);
   }
   const dog = await Dog.findByPk(newDog.id, { include: Temperament });
   return dog;
 };

  const getDogById = async (idRaza, source) => {
    let dogInfo = {};
    if (source === 'api') {
      const apiData = await axios.get(`https://api.thedogapi.com/v1/breeds/${idRaza}`, {
        headers: {
          "x-api-key": "live_rHXixUD8gfGHseKIMJpRyuPlndczseAqHU7RYcnqjdnp2YdF1aSeSZ2NMtY1xDuc"
        }
      });
      const imageId = apiData.data.reference_image_id;
      const imageData = await getDogImageById(imageId);
      dogInfo = {
        id: apiData.data.id,
        name: apiData.data.name,
        weight: apiData.data.weight.metric,
        height: apiData.data.height.metric,
        life_span: apiData.data.life_span,
        image: imageData.url,
        temperament: apiData.data.temperament,
      };
    } else {
      const dbData = await Dog.findByPk(idRaza, { include: Temperament });
      const temperamentArr = dbData.temperaments.map((t) => t.name);
      dogInfo = {
        id: dbData.id,
        name: dbData.name,
        weight: dbData.weight,
        height: dbData.height,
        life_span: dbData.life_span,
        image: dbData.image,
        temperament: temperamentArr,
      };
    }
    return dogInfo;
  };


  const getDogImageById = async (imageId) => {
    const breedsData = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    const breedInfo = breedsData.data.find((breed) => breed.reference_image_id === imageId);
    return breedInfo.image;
  };
  
 const cleanArray = (arr)=>{
  return arr.map((elem)=>{
    return {
      id: elem.id,
      name: elem.name,
      weight: elem.weight.metric,
      height: elem.height.metric,
      life_span: elem.life_span,
      temperament: elem.temperament,
      image: elem.image.url,
      created: false
    }
  });
}

const getAllDogs = async () => { 
  // buscar en la bbd
  const databaseDogs = await Dog.findAll({
    attributes: ['id', 'name', 'weight', 'height', 'life_span', 'image'],
    include: [{
      model: Temperament,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }]
  });

  // buscar en la api
  const apiDogsRaw = (await axios.get("https://api.thedogapi.com/v1/breeds", {
    headers: {
      "x-api-key": "live_rHXixUD8gfGHseKIMJpRyuPlndczseAqHU7RYcnqjdnp2YdF1aSeSZ2NMtY1xDuc"
    }
  })).data;
  const apiDogs = cleanArray(apiDogsRaw);

  const results = [...databaseDogs, ...apiDogs];
  return results;
}


const searchDogByName = async (name) => {
  const [databaseDogs, apiDogsRaw] = await Promise.all([
    Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    }),
    axios.get('https://api.thedogapi.com/v1/breeds', {
      headers: {
        'x-api-key': 'live_rHXixUD8gfGHseKIMJpRyuPlndczseAqHU7RYcnqjdnp2YdF1aSeSZ2NMtY1xDuc'
      }
    }),
  ]);

  const apiDogs = cleanArray(apiDogsRaw.data);
  const filterApi = apiDogs.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()));

  return [...filterApi, ...databaseDogs];
};

module.exports = { createDog, getDogById, getAllDogs, searchDogByName };
