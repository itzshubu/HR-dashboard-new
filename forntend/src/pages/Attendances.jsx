import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTable from "../components/UserTable";

const Attendence = () => {
  const [employes, setEmployes] = useState([]);

  // Fetch all employees
  const fetchEmployes = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/employees/all`);
      setEmployes(res.data);
    } catch (error) {
      console.error("Error fetching employes", error);
    }
  };

  // Update attendence in local state and backend
  const handlePositionChange = async (id, newPosition) => {
    const updated = employes.map((data) =>
      data._id === id ? { ...data, attendenceStatus: newPosition } : data
    );
    setEmployes(updated);

    const target = employes.find((e) => e._id === id);
    const updatedData = { ...target, attendenceStatus: newPosition };

    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/employees/position/${id}`, {
        formData: updatedData,
      });
    } catch (error) {
      console.error("Error updating attendence", error);
    }
  };

  // Delete employee
  const deleteEmployes = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/employees/${id}`);
      fetchEmployes();
    } catch (error) {
      console.error("Error deleting employe", error);
    }
  };

  useEffect(() => {
    fetchEmployes();
  }, []);

  return (
    <>
      <UserTable
        type="attendence"
        users={employes}
        onStatusChange={handlePositionChange}
        //  updateEmployeePosition={handlePositionChange}
        onDelete={deleteEmployes}
      />
    </>
  );
};

export default Attendence;
