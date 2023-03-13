const {getAllTemperaments} = require("../controllers/temperamentsControllers")


const getTemperaments = async (req, res) => {
  try {
    const temperaments = await getAllTemperaments();
    res.status(200).json({ temperaments });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports= {
    getTemperaments
}