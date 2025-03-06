import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
};

export default App;