import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; 
import Home from "./views/Home";  
import AddRoom from "./views/AddRoom";  
import Room from "./views/Room";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addroom" element={<AddRoom />} />
          <Route path="/room/:roomName" element={<Room />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

