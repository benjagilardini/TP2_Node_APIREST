const { Router } = require('express');
const router = Router();
const libros = require('./libro.route');
const autores = require('./autor.route');

router.use('/api', libros);
router.use('/api', autores);

module.exports = router;