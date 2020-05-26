const { Router } = require('express');
const router = Router();
const _ = require('lodash');

const autores = require('../autores.json');
const libros = require('../libros.json');

router.get('/autores', (req, res) => {
    res.json(autores);
});

router.post('/autores', (req, res) => {
    const { id, first_name, last_name } = req.body;
    if (id && first_name && last_name) {
        let x = 0;
        _.each(autores, (autor) => { (req.body.id == autor.id) ?  x++ : x; });
        if (x == 0) {
            const newAutor = { ...req.body };
            autores.push(newAutor);
            res.json({ 'added': 'ok' });
        } else {
            res.status(400).json({ 'Error en la identificacion': 'No puede haber dos elementos con el mismo ID' });
        }
    } else {
        res.status(400).json({ 'Error': 'Campos incompletos' });
    }
});

router.put('/autores/:id', (req, res) => {
    const { id, first_name, last_name } = req.body;
    _.each(autores, (autor) => {
        if (autor.id == id) {
            autor.first_name = first_name;
            autor.last_name = last_name;
        }
    });
    res.json({ 'modified': 'ok' });
});

router.delete('/autores/:id', (req, res) => {
    const id = req.params.id;
    let x = 1;
    _.each(libros, (libro) => {(id == libro.authorId) ? x = 0: x; });
    if (x == 1) {
        _.remove(autores, (autor) => {
            return autor.id == id;
        });
        res.json(autores);
    } else {
        res.status(400).json({ 'Error': 'No se puede eliminar un autor que posee libros' });
    };
});

module.exports = router;