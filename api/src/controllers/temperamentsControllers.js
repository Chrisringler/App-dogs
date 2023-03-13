const { Temperament } = require('../db');
const axios = require('axios');

const getAllTemperaments = async () => {
  try {
    const response = await axios.get('https://api.thedogapi.com/v1/breeds');
    const allTemperaments = response.data.map(breed => breed.temperament).join(',');
    const uniqueTemperaments = [...new Set(allTemperaments.split(',').map(item => item.trim()))];
    const formattedTemperaments = uniqueTemperaments.map((temperament, index) => {
      return {
        id: index + 1,
        name: temperament
      }
    });
    // cone sto guarde los temperaments en la base de datos
    const savedTemperaments = await Promise.all(formattedTemperaments.map(temperament => Temperament.findOrCreate({
      where: { name: temperament.name },
      defaults: { id: temperament.id }
    })));
    // devolvi los temperaments de la base de datos
    return savedTemperaments.map(temperament => temperament[0].get({ plain: true }));
  } catch (error) {
    console.log(error);
    throw new Error('Error getting all temperaments');
  }
};


module.exports = {
    getAllTemperaments
}