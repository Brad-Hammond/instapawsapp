import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.module.css';
import NavBar from "./components/NavBar";
import LogInForm from "./pages/auth/LogInForm";
import HomePage from "./components/HomePage";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import './api/axiosDefault';

// Placeholder Components for Routes
const SignUp = () => <div>Sign Up Page</div>;
const CreatePost = () => <div>Create Post Page</div>;
const Profile = () => <div>Profile Page</div>;

function App() {
  return (
    <div className="App">
      <Router>
        <CurrentUserProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LogInForm />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/posts/create" element={<CreatePost />} />
            <Route path="/profiles/:id" element={<Profile />} />
            <Route path="/dj-rest-auth/login" element={<LogInForm />} />
            <Route path="/dj-rest-auth/registration" element={<SignUp />} />
          </Routes>
        </CurrentUserProvider>
      </Router>
    </div>
  );
}

export default App;
