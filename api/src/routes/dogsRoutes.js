const {Router} = require("express");
const dogsRoutes =  Router();
const { getAllDogsHandler,  getIdRazaHandler, postDogHandler} = require("../handlers/dogsHandlers")
  
const validate = (req, res, next)=>{
    const { name, image, weight, height, life_span, temperaments} = req.body
    if(!name) return res.status(400).json({error: "missing name"})
    if(!image) return res.status(400).json({error: "missing image"})
    if(!weight) return res.status(400).json({error: "missing weight"})
    if(!height) return  res.status(400).json({error: "missing height"})
    if(!life_span)return  res.status(400).json({error: "missing life_span"})
    if(!temperaments)return  res.status(400).json({error: "missing temperaments"})
    next()
}

dogsRoutes.get('/',getAllDogsHandler )

dogsRoutes.get("/:idRaza", getIdRazaHandler)


dogsRoutes.post("/", validate, postDogHandler)

module.exports = dogsRoutes