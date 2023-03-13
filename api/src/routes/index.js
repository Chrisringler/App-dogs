const { Router } = require('express');
// Importar todos los routers;

const dogsRoutes =  require("./dogsRoutes");
const temperamentRouter = require('./temperamentsRoutes');
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use("/dogs", dogsRoutes)
router.use("/temperaments", temperamentRouter)


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
