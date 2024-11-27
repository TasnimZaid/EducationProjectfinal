import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const StudentMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [studentMaterials, setStudentMaterials] = useState([]);
  const [studentId, setStudentId] = useState(1);
  const [selectedMaterialId, setSelectedMaterialId] = useState("");

  useEffect(() => {
    fetchAllMaterials();
    fetchStudentMaterials();
  }, []);

  const fetchAllMaterials = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/Allmaterial");
      setMaterials(res.data);
    } catch (error) {
      console.error("Failed to fetch materials:", error);
    }
  };

  const fetchStudentMaterials = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/getMaterialsByStudentId/${studentId}`);
      setStudentMaterials(res.data);
    } catch (error) {
      console.error("Failed to fetch student materials:", error);
    }
  };

  const handleMaterialSelect = (event) => {
    setSelectedMaterialId(event.target.value);
  };

  const handleAddMaterial = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/api/addStudentMaterial`, {
        student_id: studentId,
        material_id: selectedMaterialId,
      });
      setStudentMaterials([...studentMaterials, res.data]);
      setSelectedMaterialId("");
    } catch (error) {
      console.error("Failed to add material:", error);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(studentMaterials);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setStudentMaterials(items);
  };

  const getMaterialName = (materialId) => {
    const material = materials.find(m => m.id === materialId);
    return material ? material.name : "Unknown Material";
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Student Materials</h1>

      <div className="mb-4 flex items-center">
        <select
          onChange={handleMaterialSelect}
          value={selectedMaterialId}
          className="border border-gray-300 rounded-md px-3 py-2 mr-4"
        >
          <option value="">Select Material</option>
          {materials.map((material) => (
            <option key={material.id} value={material.id.toString()}>
              {material.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddMaterial}
          disabled={!selectedMaterialId}
          className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300"
        >
          Add Material
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Order</th>
              <th className="px-4 py-2 border-b">Material Name</th>
            </tr>
          </thead>
          <Droppable droppableId="materials">
            {(provided) => (
              <tbody {...provided.droppableProps} ref={provided.innerRef}>
                {studentMaterials.map((material, index) => (
                  <Draggable key={material.id} draggableId={material.id.toString()} index={index}>
                    {(provided) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="hover:bg-gray-100"
                      >
                        <td className="px-4 py-2 border-b">{index + 1}</td>
                        <td className="px-4 py-2 border-b">{getMaterialName(material.material_id)}</td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
      </DragDropContext>
    </div>
  );
};

export default StudentMaterials;