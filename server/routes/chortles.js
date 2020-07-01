const express = require('express');
const chortleService = require('../utils/chortlestore');

const router = express.Router();

// GET /api/chortels/
router.get('/', (req, res) => {
    const data = chortleService.GetChortles();
    const chortles = Object.keys(data).map(key => {
        return {
            id: key, 
         ...data[key]
        }
    });
    chortles.pop();

    res.json(chortles);
});

//POST /api/chortles/new
router.post('/new', (req, res) => {
    const chortleDTO = req.body; 
    chortleService.CreateChortle(chortleDTO);
    res.status(201).json({msg: 'new chortle made' });
});

//PUT /api/chortles/edit/:id
router.put('/edit/:chortleid', (req, res) => {
    const editedChortle = req.body; 
    const chortleid = req.params.chortleid; 
    chortleService.UpdateChortle(chortleid, editedChortle);
    res.status(200).json({msg: 'chortle was edited' });
});

//DELETE /api/chortles/destroy/:id
router.delete('/destroy/:chortleid', (req, res) => {
    const chortleid = req.params.chortleid; 
    chortleService.DeleteChortle(chortleid);
    res.status(200).json({ msg: `chortle ${chortleid} deleted` });
});

module.exports = router; 