import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import NavBar from "./components/NavBar";
import './api/axiosDefault';

// Placeholder Components for Routes
const Home = () => <div>Home Page</div>;
const Login = () => <div>Login Page</div>;
const SignUp = () => <div>Sign Up Page</div>;
const CreatePost = () => <div>Create Post Page</div>;
const Profile = () => <div>Profile Page</div>;

function App() {
  return (
    <div className="App">
      <NavBar />
    </div>
  );
}

export default App;
