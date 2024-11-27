const express = require('express') ;
const materialController = require('../controllers/materialController')
const router = express.Router() ;


// Route to get all materials
router.get('/Allmaterial', materialController.getAllMaterials);

// (Optional) Route to get material by ID
router.get('/material/:id', materialController.getMaterialById);

// (Optional) Route to create a new material
router.post('/Addmaterial', materialController.createMaterial);

module.exports = router;