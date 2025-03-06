import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const LogContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

const LogItem = styled.li`
  background: white;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
`;

const TaskLog: React.FC = () => {
  interface Task {
    id: number;
    name: string;
    executionTime: string;
  }
  
  const [executedTasks, setExecutedTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchExecutedTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/tasks/log");
        setExecutedTasks(response.data);
      } catch (error) {
        console.error("Error fetching executed tasks:", error);
      }
    };
    fetchExecutedTasks();
  }, []);

  return (
    <Container>
      <LogContainer>
        {executedTasks.length === 0 ? <p>No tasks executed yet.</p> : executedTasks.map((task) => (
          <LogItem key={task.id}>
            <strong>{task.name}</strong> - Executed at {new Date(task.executionTime).toLocaleString()}
          </LogItem>
        ))}
      </LogContainer>
    </Container>
  );
};

export default TaskLog;
