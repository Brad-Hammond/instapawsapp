import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import NavBar from "./components/NavBar";
import './api/axiosDefault';

function App() {
  return (
    <div className="App">
      <NavBar />
    </div>
  );
}

export default App;
