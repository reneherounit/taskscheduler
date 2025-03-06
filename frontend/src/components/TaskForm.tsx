import React, { useState, useContext } from "react";
import axios from "axios";
import { TaskContext } from "../context/TaskContext";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  background: white;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #28a745;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background-color: #218838;
  }
`;

const TaskForm: React.FC = () => {
  const [name, setName] = useState("");
  const [executionTime, setExecutionTime] = useState("");
  const [recurrence, setRecurrence] = useState("");
  const { fetchTasks } = useContext(TaskContext)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/tasks", { name, executionTime, recurrence });
      fetchTasks();
      setName("");
      setExecutionTime("");
      setRecurrence("");
    } catch (error) {
      console.error("Error scheduling task:", error);
    }
  };

  return (
    <FormContainer>
      <h2>Schedule a Task</h2>
      <Form onSubmit={handleSubmit}>
        <Input type="text" placeholder="Task Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input type="datetime-local" value={executionTime} onChange={(e) => setExecutionTime(e.target.value)} required />
        <Select value={recurrence} onChange={(e) => setRecurrence(e.target.value)}>
          <option value="">No Recurrence</option>
          <option value="daily">Every Day</option>
          <option value="weekly">Weekly</option>
          <option value="biweekly">Bi-Weekly</option>
        </Select>
        <Button type="submit">Schedule Task</Button>
      </Form>
    </FormContainer>
  );
};

export default TaskForm;