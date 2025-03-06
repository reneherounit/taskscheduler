import React, { useState } from "react";
import TaskList from "../components/TaskList";
import TaskLog from "../components/TaskLog";
import TaskModal from "../components/TaskModal";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 80%;
  max-width: 1200px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TaskContainer = styled.div`
  flex: 1;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 10px;
  background: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  &:hover {
    background: #0056b3;
  }
`;

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <PageContainer>
      <Button onClick={() => setModalOpen(true)}>+ New Task</Button>
      {modalOpen && <TaskModal closeModal={() => setModalOpen(false)} task={undefined} />}
      <Layout>
        <TaskContainer>
          <h2>Scheduled Tasks</h2>
          <TaskList />
        </TaskContainer>
        <TaskContainer>
          <h2>Executed Tasks</h2>
          <TaskLog />
        </TaskContainer>
      </Layout>
    </PageContainer>
  );
};

export default Home;