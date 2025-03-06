import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import styled from "styled-components";

const Container = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  background: white;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskList: React.FC = () => {
  const { tasks } = useContext(TaskContext)!;

  return (
    <Container>
      <List>
        {tasks.length === 0 ? (
          <p>No tasks scheduled.</p>
        ) : (
          tasks.map((task) => (
            <ListItem key={task.id}>
              <strong>{task.name}</strong> - {new Date(task.executionTime).toLocaleString()}
            </ListItem>
          ))
        )}
      </List>
    </Container>
  );
};

export default TaskList;
