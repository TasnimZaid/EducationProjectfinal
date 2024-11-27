const knex = require('../knex-config');



const getAllMaterials = async (req, res) => {
    try {
        const materials = await knex('materials').select('*');  
        res.status(200).json(materials);  
    } catch (error) {
        console.error('Error fetching materials:', error);
        res.status(500).json({ error: 'Failed to fetch materials' }); 
    }
};



const getMaterialById = async (req, res) => {
    const { id } = req.params;  
    try {
        const material = await knex('materials').where({ id }).first();
        if (material) {
            res.status(200).json(material);
        } else {
            res.status(404).json({ error: 'Material not found' });
        }
    } catch (error) {
        console.error('Error fetching material:', error);
        res.status(500).json({ error: 'Failed to fetch material' });
    }
};



const createMaterial = async (req, res) => {
    const { name } = req.body;
    try {
        const [material] = await knex('materials').insert({ name }).returning('id');
        
        // Extract the actual id value, if knex returns an object with 'id'
        const id = material.id ? material.id : material;
        
        res.status(201).json({ id, name });
    } catch (error) {
        console.error('Error creating material:', error);
        res.status(500).json({ error: 'Failed to create material' });
    }
};

module.exports = {
    getAllMaterials,
    getMaterialById,
    createMaterial
};