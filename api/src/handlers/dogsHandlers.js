const { createDog, getDogById, getAllDogs, searchDogByName } = require("../controllers/dogsControllers");


const getAllDogsHandler = async (req, res)=>{
const {name} = req.query;
try {
  const results = name ? await searchDogByName(name) : await getAllDogs()

res.status(200).json(results)
} catch (error) {
  res.status(400).json({error: error.message})
}


}


const getIdRazaHandler =async(req,res)=>{
    //Esta rutta obtiene el detalle de una raza específica. con el id 
  const {idRaza} = req.params
  const source = isNaN(idRaza) ? "bdd" : 'api' 
 
   try {

    const dog = await getDogById(idRaza, source)
    res.status(200).json(dog)
   } catch (error) {
    res.status(400).json({error: error.message})
   }
}



const postDogHandler = async (req,res)=>{
//Esta ruta recibira todos los datos necesarios para crear un nuevo perro y relacionarlo con los temperamentos.
const { name, image, weight, height, life_span, temperaments} = req.body
try {
  const newDog = await createDog(name, image, weight, height, life_span, temperaments)
   res.status(200).json(newDog)

} catch (error) {
  res.status(400).json({ error: error.message})
}

}

module.exports= {
    getAllDogsHandler,
    getIdRazaHandler,
    postDogHandler
}