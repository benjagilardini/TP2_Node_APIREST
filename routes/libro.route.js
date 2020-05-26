const { Router } = require('express');
const router = Router();
const _ = require('lodash');

const libros = require('../libros.json');
const autores = require('../autores.json');

router.get('/libros', (req, res) => {
    const libros_con_autor = [];
    _.each(libros, (libro) => {
        let libro_con_autor = { "id": "", "name": "", "autor": "" };
        const { id, name, authorId } = libro;
        _.each(autores, (autor) => {
            const { id, first_name, last_name } = autor;
            if (autor.id == libro.authorId) {
                libro_con_autor.id = libro.id;
                libro_con_autor.name = libro.name;
                libro_con_autor.autor = first_name + " " + last_name;
                libros_con_autor.push(libro_con_autor);
            }
        });
    });
    res.json(libros_con_autor);
});

router.post('/libros', (req, res) => {
    const { id, name, authorId } = req.body;
    if (id && name && authorId) {
        let x = 0;
        _.each(libros, (libro) => { (req.body.id == libro.id) ? x++ : x ; });
        libros.forEach((libro) => { if (req.body.id == libro.id) { x++; } });
        if (x == 0) {
            const newLibro = { ...req.body };
            libros.push(newLibro);
            res.json({ 'added': 'ok' });
        } else {
            res.status(400).json({ 'Error en la identificacion': 'No puede haber dos elementos con el mismo ID' });
        }
    } else {
        res.status(400).json({ 'Error': 'Bad Request' });
    }
});

router.put('/libros/:id', (req, res) => {
    const { id, name, authorId } = req.body;
    _.each(libros, (libro) => {
        if (libro.id == id) {
            libro.name = name;
            libro.authorId = authorId;
        }
    });
    res.json({ 'modified': 'ok' });
});

router.delete('/libros/:id', (req, res) => {
    const id = req.params.id;
    _.remove(libros, (libro) => {
        return libro.id == id
    });
    res.json(libros);
});

module.exports = router;
