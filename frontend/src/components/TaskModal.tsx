import React, { useState, useContext } from "react";
import axios from "axios";
import { TaskContext } from "../context/TaskContext";
import styled from "styled-components";

interface TaskModalProps {
  closeModal: () => void;
  task?: { id: number; name: string; executionTime: string; recurrence?: string } | null;
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 95%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
`;

const Button = styled.button<{ color?: string; hoverColor?: string }>`
  width: 100%;
  padding: 12px;
  background: ${({ color }) => color || "#007bff"};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 10px;

  &:hover {
    background: ${({ hoverColor }) => hoverColor || "#0056b3"};
  }
`;

const TaskModal: React.FC<TaskModalProps> = ({ closeModal, task }) => {
  const [name, setName] = useState(task ? task.name : "");
  const [executionTime, setExecutionTime] = useState(task ? task.executionTime : "");
  const [recurrence, setRecurrence] = useState(task ? task.recurrence : "");
  const { fetchTasks } = useContext(TaskContext)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (task) {
        await axios.put(`http://localhost:3001/api/tasks/${task.id}`, { executionTime });
      } else {
        await axios.post("http://localhost:3001/api/tasks", { name, executionTime, recurrence });
      }
      fetchTasks();
      closeModal();
    } catch (error) {
      console.error("Error managing task:", error);
    }
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <Title>{task ? "Edit Task" : "Create Task"}</Title>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          {!task && <Input type="text" placeholder="Task Name" value={name} onChange={(e) => setName(e.target.value)} required />}
          <Input type="datetime-local" value={executionTime} onChange={(e) => setExecutionTime(e.target.value)} required />
          {!task && (
            <Select value={recurrence} onChange={(e) => setRecurrence(e.target.value)}>
              <option value="">No Recurrence</option>
              <option value="daily">Every Day</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-Weekly</option>
            </Select>
          )}
          <Button type="submit">{task ? "Update" : "Create"}</Button>
          <Button color="#dc3545" hoverColor="#b22222" onClick={closeModal}>
            Cancel
          </Button>
        </form>
      </ModalContainer>
    </ModalBackground>
  );
};

export default TaskModal;
