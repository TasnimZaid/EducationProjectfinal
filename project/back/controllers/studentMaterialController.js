const knex = require('../knex-config');


// Get all student materials
exports.getAllStudentMaterials = async (req, res) => {
    try {
      const materials = await knex('student_materials')
        .join('materials', 'student_materials.material_id', '=', 'materials.id')
        .select('student_materials.*', 'materials.name as material_name');
      res.json(materials);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve materials' });
    }
  };

  // Fetch materials for a specific student
exports.getMaterialsByStudentId = async (req, res) => {
    const { student_id } = req.params;
    try {
      const materials = await knex('student_materials')
        .where({ student_id })
        .join('materials', 'student_materials.material_id', 'materials.id')
        .select('student_materials.id', 'student_materials.student_id', 'student_materials.material_id', 'materials.name as material_name');
      
      res.json(materials);
    } catch (error) {
      console.error('Error fetching materials:', error);
      res.status(500).json({ error: 'Error fetching materials' });
    }
  };
  
  // Add a new student material
  exports.addStudentMaterial = async (req, res) => {
    const { student_id, material_id } = req.body;
    try {
      const newMaterial = await knex('student_materials').insert({
        student_id,
        material_id,
      }).returning('*');
      res.status(201).json(newMaterial);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add material' });
    }
  };
  
  // Edit a student material
  exports.editStudentMaterial = async (req, res) => {
    const { id } = req.params; // Get the ID from the URL
    const { student_id, material_id } = req.body;
  
    try {
      const updatedMaterial = await knex('student_materials').where({ id }).update({
        student_id,
        material_id,
      }).returning('*');
      
      if (updatedMaterial.length) {
        res.json(updatedMaterial[0]);
      } else {
        res.status(404).json({ error: 'Material not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update material' });
    }
  };
  
  // Delete a student material
  exports.deleteStudentMaterial = async (req, res) => {
    const { id } = req.params; // Get the ID from the URL
    try {
      const deletedMaterial = await knex('student_materials').where({ id }).del();
      
      if (deletedMaterial) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Material not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete material' });
    }
  };